"use client"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Sobe e aparece na primeira vez que o bloco entra na tela.
 *
 * Usa `gsap.from` de propósito: o conteúdo já nasce visível no HTML e a
 * animação só tira dele. Se o JavaScript falhar ou não carregar, a página
 * continua inteira — nada fica preso em opacity: 0 esperando um observer.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  /** Anima os filhos diretos em sequência, em vez do bloco inteiro de uma vez. */
  stagger = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger
          ? Array.from(ref.current?.children ?? [])
          : ref.current

        gsap.from(targets, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          delay,
          stagger: stagger ? 0.09 : 0,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 86%", once: true },
        })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
