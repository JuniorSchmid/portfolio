import { stackGroups } from "@/data/profile"
import { Reveal } from "@/components/reveal"

export function Stack() {
  return (
    <section id="habilidades" className="scroll-mt-16 border-t border-line/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="label text-pink">Habilidades</p>
          <h2 className="mt-5 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1]">
            Agrupadas pelo que <span className="gradient-text">resolvem.</span>
          </h2>
          <p className="measure mt-5 text-muted">
            Não em ordem alfabética nem por nível — o que importa é para qual
            tipo de problema cada uma entra.
          </p>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {stackGroups.map((group) => (
            <div key={group.title} className="glass rounded-2xl p-6">
              <h3 className="label gradient-text">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
