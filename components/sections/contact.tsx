import { Github, Instagram, Linkedin, Mail } from "lucide-react"
import { profile } from "@/data/profile"
import { Reveal } from "@/components/reveal"

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
}

export function Contact() {
  return (
    <section
      id="contato"
      className="relative scroll-mt-16 overflow-hidden border-t border-line/60"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full opacity-15 blur-[130px] gradient-bg"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="label text-pink">Contato</p>
          <h2 className="mt-5 max-w-[20ch] text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1]">
            Tem um processo que consome{" "}
            <span className="gradient-text">mais tempo do que deveria?</span>
          </h2>
          <p className="measure mt-5 text-muted">
            Me conte como ele funciona hoje. Costuma ser a conversa mais curta
            possível — em geral dá para dizer na hora se vale automatizar.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-10 inline-flex items-center gap-3 rounded-full gradient-bg px-7 py-4 font-medium text-white transition-opacity hover:opacity-90"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {profile.email}
          </a>

          <ul className="mt-10 flex flex-wrap items-center gap-3">
            {profile.socials.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons]
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm text-muted transition-colors hover:border-pink/50 hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {social.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
