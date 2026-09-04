"use client"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Entrada discreta na primeira vez que o bloco aparece.
 *
 * Usa `gsap.from` de propósito: o conteúdo já nasce visível no HTML e a
 * animação só tira dele. Se o JavaScript falhar ou não carregar, a página
 * continua inteira — nada fica preso em opacity: 0 esperando um observer.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          opacity: 0,
          y: 14,
          duration: 0.55,
          delay,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
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
