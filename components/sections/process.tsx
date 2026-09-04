"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { processLayers } from "@/data/profile"

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * As quatro camadas do processo sobem e aparecem conforme o scroll.
 *
 * Sem pin: a seção não sequestra a rolagem, o conteúdo só entra em cena.
 * A coluna da esquerda fica presa (sticky) enquanto os cards passam, e a
 * linha vertical se desenha acompanhando o progresso.
 */
export function Process() {
  const root = useRef<HTMLElement>(null)
  const list = useRef<HTMLOListElement>(null)
  const line = useRef<HTMLSpanElement>(null)
  const [step, setStep] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Cabeçalho entra subindo.
        gsap.from(".proc-intro > *", {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        })

        const cards = gsap.utils.toArray<HTMLElement>(".proc-card")

        cards.forEach((card, i) => {
          // `from` de propósito: o card já nasce visível no HTML, a animação
          // só tira dele. Se o JS falhar, a seção continua legível.
          gsap.from(card, {
            y: 56,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          })

          ScrollTrigger.create({
            trigger: card,
            start: "top 65%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) setStep(i)
            },
          })
        })

        // A linha desenha de cima para baixo acompanhando a rolagem.
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: list.current,
              start: "top 72%",
              end: "bottom 65%",
              scrub: 0.5,
            },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  const pct = Math.round(((step + 1) / processLayers.length) * 100)

  return (
    <section
      ref={root}
      id="processo"
      className="relative scroll-mt-16 border-t border-line/60"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-[420px] w-[520px] rounded-full opacity-[0.12] blur-[130px] gradient-bg"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* Coluna presa: o enunciado fica à vista enquanto as camadas passam. */}
        <div className="proc-intro lg:sticky lg:top-28 lg:self-start">
          <p className="label text-pink">Como eu trabalho</p>
          <h2 className="mt-5 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1]">
            Toda automação é a mesma{" "}
            <span className="gradient-text">pilha de quatro camadas.</span>
          </h2>
          <p className="measure mt-5 text-muted">
            Muda o setor, muda a linguagem, muda o tamanho do problema — a
            estrutura não muda. É por isso que o mesmo raciocínio serve para uma
            verificação em linha de produção e para uma planilha que alguém
            preenche à mão toda semana.
          </p>

          <div className="mt-10 max-w-xs">
            <div className="flex items-baseline justify-between">
              <span className="label text-faint">Camada</span>
              <span className="text-sm font-medium tabular-nums">
                <span className="gradient-text">
                  {processLayers[step].id}
                </span>
                <span className="text-faint"> / 04</span>
              </span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full gradient-bg transition-[width] duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Coluna que rola: cada camada sobe e aparece. */}
        <ol ref={list} className="relative">
          {/* Trilho + linha que se desenha com o scroll. */}
          <span
            aria-hidden="true"
            className="absolute left-[1.375rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-white/10 sm:block"
          />
          <span
            ref={line}
            aria-hidden="true"
            className="absolute left-[1.375rem] top-2 hidden h-[calc(100%-1rem)] w-px origin-top gradient-bg sm:block"
          />

          {processLayers.map((layer, i) => {
            const isActive = i === step
            return (
              <li
                key={layer.id}
                className="proc-card relative pb-6 sm:pl-16 last:pb-0"
              >
                {/* Marcador na trilha */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-6 hidden h-11 w-11 place-items-center rounded-full border text-xs font-semibold transition-colors duration-500 sm:grid ${
                    isActive
                      ? "border-transparent gradient-bg text-white"
                      : "border-white/15 bg-elevated text-faint"
                  }`}
                >
                  {layer.id}
                </span>

                <div
                  className={`rounded-2xl border p-6 transition-colors duration-500 ${
                    isActive
                      ? "border-pink/40 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="gradient-text text-sm font-semibold sm:hidden">
                      {layer.id}
                    </span>
                    <h3 className="text-xl font-semibold">{layer.title}</h3>
                  </div>

                  <p className="mt-3 text-base font-medium leading-snug text-white">
                    {layer.note}
                  </p>

                  <p className="mt-3 leading-relaxed text-muted">{layer.body}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {layer.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-muted"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
