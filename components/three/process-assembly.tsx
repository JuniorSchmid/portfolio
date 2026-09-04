"use client"

import { useEffect, useRef, useState, type MutableRefObject } from "react"
import {
  AmbientLight,
  BoxGeometry,
  type BufferGeometry,
  Clock,
  CylinderGeometry,
  DirectionalLight,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from "three"
import { ProcessDiagram } from "@/components/process-diagram"

const ACCENT = 0xff4ecd // rosa da marca — arestas e varredura
const RIM = 0x6a11cb // roxo da marca — luz de contorno
const PLATE_FILL = 0x1e1730
const PLATE_COUNT = 4

type Props = {
  /** Progresso do scroll (0–1). Chega por ref para não re-renderizar o React a cada frame. */
  progressRef: MutableRefObject<number>
  /** Falso quando a seção está fora da tela — congela o loop e libera a GPU. */
  active: boolean
}

/**
 * Vista explodida das quatro camadas do processo, em Three.js puro.
 *
 * Sem react-three-fiber de propósito: o loop de animação aqui é totalmente
 * imperativo, então o reconciler não traria benefício nenhum e custaria
 * react-reconciler, zustand e its-fine no bundle — além de acoplar a página
 * a uma faixa estreita de versões do React.
 */
export default function ProcessAssembly({ progressRef, active }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const activeRef = useRef(active)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const el = host.current
    if (!el) return

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      })
    } catch {
      // Sem WebGL (driver antigo, aceleração desligada) o diagrama estático assume.
      setFailed(true)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.display = "block"
    el.appendChild(renderer.domElement)

    const scene = new Scene()
    const camera = new PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(3.5, 2.7, 5.0)
    camera.lookAt(0, 0, 0)

    scene.add(new AmbientLight(0xffffff, 0.55))
    const key = new DirectionalLight(0xffffff, 1.15)
    key.position.set(4, 6, 3)
    scene.add(key)
    const rim = new DirectionalLight(RIM, 0.65)
    rim.position.set(-4, -2, -3)
    scene.add(rim)

    // --- geometria ---------------------------------------------------------
    const plateGeo = new BoxGeometry(2.2, 0.055, 2.2)
    const plateEdges = new EdgesGeometry(plateGeo)

    // Um detalhe por camada, para as quatro placas não serem quatro caixas iguais.
    const detailSources: BufferGeometry[] = [
      new BoxGeometry(1.1, 0.38, 1.1), // 01 entrada — dado bruto
      new TorusGeometry(0.5, 0.05, 8, 28), // 02 extração
      new OctahedronGeometry(0.58), // 03 validação
      new CylinderGeometry(0.46, 0.46, 0.28, 6), // 04 saída
    ]
    const detailEdges = detailSources.map((g) => new EdgesGeometry(g))
    const axisGeo = new CylinderGeometry(0.009, 0.009, 1, 6)
    // Só o contorno: um plano preenchido vira uma laje verde e rouba a cena.
    const scanSource = new PlaneGeometry(2.55, 2.55)
    const scanGeo = new EdgesGeometry(scanSource)

    const plateMat = new MeshStandardMaterial({
      color: PLATE_FILL,
      roughness: 0.62,
      metalness: 0.18,
      transparent: true,
      opacity: 0.94,
    })
    const edgeMat = new LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.72,
    })
    const detailMat = new LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.4,
    })
    const axisMat = new MeshBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0,
    })
    const scanMat = new LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })

    const root = new Group()
    scene.add(root)

    // Eixo central: a linha-guia de desenho técnico, visível só no estado explodido.
    const axis = new Mesh(axisGeo, axisMat)
    root.add(axis)

    // Varredura — a metáfora da verificação, que é o que o software dele faz.
    const scan = new LineSegments(scanGeo, scanMat)
    scan.rotation.x = -Math.PI / 2
    root.add(scan)

    const plates: Group[] = []
    for (let i = 0; i < PLATE_COUNT; i++) {
      const g = new Group()
      g.add(new Mesh(plateGeo, plateMat))
      g.add(new LineSegments(plateEdges, edgeMat))
      const detail = new LineSegments(detailEdges[i], detailMat)
      detail.position.y = 0.22
      g.add(detail)
      root.add(g)
      plates.push(g)
    }

    // --- layout ------------------------------------------------------------
    // Escala base pela largura do container (não da janela): a mesma seção pode
    // aparecer em colunas de tamanhos diferentes.
    let fit = 1
    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      fit = w < 380 ? 0.62 : w < 520 ? 0.8 : 1
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    // --- loop --------------------------------------------------------------
    const clock = new Clock()
    let eased = 0
    let raf = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)

      // Consome o delta mesmo parado, senão o primeiro frame ao voltar à tela
      // recebe o tempo inteiro em que a seção ficou fora dela.
      const delta = Math.min(clock.getDelta(), 0.05)
      if (!activeRef.current) return

      const t = clock.elapsedTime

      // Amortecimento independente de framerate: mesmo "peso" a 60 ou 144 Hz.
      eased += (progressRef.current - eased) * (1 - Math.pow(0.0015, delta))

      root.rotation.y = t * 0.16 + eased * 0.7
      root.rotation.x = 0.44 - eased * 0.16
      // Compensação leve de propósito: recuar demais cancela a própria expansão
      // e a explosão deixa de ser perceptível. A câmera é quem dá a folga.
      root.scale.setScalar(fit * (1 - eased * 0.12))

      // A separação vertical é o coração da interação: montado → explodido.
      const spread = 0.14 + eased * 1.05
      for (let i = 0; i < plates.length; i++) {
        plates[i].position.y = (i - (PLATE_COUNT - 1) / 2) * spread
        plates[i].rotation.y = eased * (i - 1.5) * 0.2
      }

      axis.scale.y = Math.max(0.001, spread * 3.4)
      axisMat.opacity = eased * 0.5

      const span = spread * 3.2
      const cycle = (t * 0.26) % 1
      scan.position.y = -span / 2 + cycle * span
      scanMat.opacity = 0.6 * Math.sin(cycle * Math.PI)

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      plateGeo.dispose()
      plateEdges.dispose()
      detailSources.forEach((g) => g.dispose())
      detailEdges.forEach((g) => g.dispose())
      axisGeo.dispose()
      scanSource.dispose()
      scanGeo.dispose()
      plateMat.dispose()
      edgeMat.dispose()
      detailMat.dispose()
      axisMat.dispose()
      scanMat.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [progressRef])

  if (failed) return <ProcessDiagram />

  return <div ref={host} className="h-full w-full" />
}
