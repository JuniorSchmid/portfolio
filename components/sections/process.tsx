"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { processLayers } from "@/data/profile"
import { ProcessDiagram } from "@/components/process-diagram"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ProcessAssembly = dynamic(
  () => import("@/components/three/process-assembly"),
  { ssr: false, loading: () => null },
)

/**
 * "sequenced" — desktop: seção fixada, camadas reveladas uma a uma pelo scroll.
 * "flat"      — mobile: sem pin (pin em tela pequena briga com a barra do browser).
 * "static"    — prefers-reduced-motion: sem WebGL, diagrama parado.
 */
type Mode = "sequenced" | "flat" | "static"

export function Process() {
  const wrap = useRef<HTMLElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const [step, setStep] = useState(0)
  const [active, setActive] = useState(false)
  const [mode, setMode] = useState<Mode>("flat")

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setMode("static")
        setStep(processLayers.length - 1)
      })

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Trigger na seção externa, não no painel: o painel é o elemento
        // fixado, e um elemento pinado tem posição fixa — medir "bottom top"
        // nele devolve um isActive errado e o canvas congela no último quadro.
        const visibility = ScrollTrigger.create({
          trigger: wrap.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => setActive(self.isActive),
        })

        // onToggle só dispara na mudança de estado. Quem recarrega a página já
        // dentro da seção nunca receberia o primeiro toggle, e o canvas ficaria
        // preto para sempre.
        setActive(visibility.isActive)
      })

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          setMode("sequenced")

          const pinned = ScrollTrigger.create({
            trigger: panel.current,
            start: "top top",
            end: "+=2400",
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              progress.current = self.progress
              const next = Math.min(
                processLayers.length - 1,
                Math.floor(self.progress * processLayers.length),
              )
              setStep((prev) => (prev === next ? prev : next))
            },
          })

          progress.current = pinned.progress
        },
      )

      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          setMode("flat")
          setStep(processLayers.length - 1)

          ScrollTrigger.create({
            trigger: panel.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            onUpdate: (self) => {
              progress.current = self.progress
            },
          })
        },
      )

      return () => mm.revert()
    },
    { scope: panel },
  )

  return (
    <section ref={wrap} id="processo" className="relative scroll-mt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[520px] rounded-full opacity-15 blur-[130px] gradient-bg"
      />

      <div
        ref={panel}
        className="relative flex min-h-svh items-center overflow-hidden"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label text-pink">Como eu trabalho</p>
            <h2 className="mt-5 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1]">
              Toda automação é a mesma{" "}
              <span className="gradient-text">pilha de quatro camadas.</span>
            </h2>
            <p className="measure mt-5 text-muted">
              Muda o setor, muda a linguagem, muda o tamanho do problema — a
              estrutura não muda. É por isso que o mesmo raciocínio serve para
              uma verificação em linha de produção e para uma planilha que
              alguém preenche à mão toda semana.
            </p>

            <ol className="mt-10 space-y-3">
              {processLayers.map((layer, i) => {
                const dimmed = mode === "sequenced" && i > step
                return (
                  <li
                    key={layer.id}
                    className={`grid grid-cols-[2.75rem_1fr] gap-x-4 rounded-2xl border p-4 transition-all duration-500 ${
                      dimmed
                        ? "border-white/5 bg-white/[0.02] opacity-40"
                        : "border-white/10 bg-white/[0.04] opacity-100"
                    }`}
                  >
                    <span
                      className={`label pt-1 transition-colors duration-500 ${
                        dimmed ? "text-faint" : "gradient-text"
                      }`}
                    >
                      {layer.id}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{layer.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {layer.body}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* O 3D é ilustração: todo o conteúdo já existe como texto ao lado. */}
          <div
            className="relative mx-auto aspect-square w-full max-w-[540px]"
            aria-hidden="true"
          >
            {mode === "static" ? (
              <ProcessDiagram />
            ) : (
              <ProcessAssembly progressRef={progress} active={active} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
