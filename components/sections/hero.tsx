import Image from "next/image"
import Link from "next/link"
import { Github, Instagram, Linkedin, Mail } from "lucide-react"
import { profile } from "@/data/profile"

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Brilho de fundo: o mesmo par de cores da marca, bem diluído. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-[120px] gradient-bg"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.15fr_1fr] lg:py-28">
        <div>
          <p className="label text-pink">
            Software · Automação · Visão computacional
          </p>

          <h1 className="mt-6 text-[clamp(2.25rem,6vw,4rem)] leading-[1.05]">
            Eu automatizo o que{" "}
            <span className="gradient-text">não deveria ser feito à mão.</span>
          </h1>

          <p className="measure mt-6 text-lg text-muted">{profile.subhead}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/projetos"
              className="rounded-full gradient-bg px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Ver Projetos
            </Link>
            <Link
              href="#contato"
              className="rounded-full border border-white/25 px-6 py-3 text-sm transition-colors hover:border-white/60"
            >
              Entrar em contato
            </Link>
          </div>

          <ul className="mt-10 flex items-center gap-3">
            {profile.socials.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons]
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-muted transition-colors hover:border-pink/60 hover:text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                </li>
              )
            })}
            <li>
              <a
                href={`mailto:${profile.email}`}
                aria-label="E-mail"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-muted transition-colors hover:border-pink/60 hover:text-white"
              >
                <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        {/* Retrato circular com anel em gradiente — assinatura do site. */}
        <div className="justify-self-center lg:justify-self-end">
          <div className="rounded-full gradient-bg p-1.5">
            <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full bg-elevated sm:h-[340px] sm:w-[340px]">
              <Image
                src="/junior-retrato.jpg"
                alt={`Retrato de ${profile.name}`}
                fill
                priority
                sizes="340px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
