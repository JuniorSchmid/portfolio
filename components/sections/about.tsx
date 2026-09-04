import { profile } from "@/data/profile"
import { Reveal } from "@/components/reveal"

export function About() {
  return (
    <section id="sobre" className="scroll-mt-16 border-t border-line/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="label text-pink">Sobre mim</p>
          <h2 className="mt-5 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1]">
            Entre o processo e o <span className="gradient-text">código.</span>
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-lg leading-relaxed text-muted">
                {profile.intro}
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Não trabalho só com indústria e não trabalho só com web. O que
                se repete nos dois lados é a pergunta: onde está o esforço que
                não precisa existir?
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-4 self-start">
              <div className="glass rounded-2xl p-5">
                <dt className="label text-faint">Local</dt>
                <dd className="mt-2 font-medium">{profile.location}</dd>
              </div>
              <div className="glass rounded-2xl p-5">
                <dt className="label text-faint">Formação</dt>
                <dd className="mt-2 font-medium">Engenharia de Software</dd>
              </div>
              <div className="glass rounded-2xl p-5">
                <dt className="label text-faint">Atuação</dt>
                <dd className="mt-2 font-medium">Indústria e pessoas</dd>
              </div>
              <div className="glass rounded-2xl p-5">
                <dt className="label text-faint">Foco</dt>
                <dd className="mt-2 font-medium">
                  Automação, desenvolvimento web e IA
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
