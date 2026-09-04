import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { allProjects, type ProjectKind } from "@/data/projects"

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Automação industrial, visão computacional e produtos web — o índice completo do que construí.",
  alternates: { canonical: "/projetos" },
}

// Ordem das seções na página. Trabalho aplicado primeiro, estudo por último.
const ORDER: ProjectKind[] = [
  "Visão computacional",
  "Automação",
  "Produto web",
  "Presença digital",
  "Exploração",
]

export default function ProjetosPage() {
  const groups = ORDER.map((kind) => ({
    kind,
    items: allProjects.filter((p) => p.kind === kind),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-[120px] gradient-bg"
          />
          <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20">
            <p className="label text-pink">Índice</p>
            <h1 className="mt-6 text-[clamp(2rem,6vw,3.75rem)] leading-[1.05]">
              Todos os <span className="gradient-text">projetos.</span>
            </h1>
            <p className="measure mt-6 text-lg text-muted">
              Agrupados pela natureza do trabalho, não por data. Os que têm
              página própria são aqueles em que a decisão técnica vale ser
              contada.
            </p>
          </div>
        </section>

        {groups.map((group) => (
          <section key={group.kind} className="border-t border-line/60">
            <div className="mx-auto max-w-7xl px-6 py-14">
              <h2 className="label text-faint">{group.kind}</h2>

              <ul className="mt-6 grid gap-4">
                {group.items.map((project) => {
                  const inner = (
                    <div className="glass grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 rounded-2xl p-6 transition-colors sm:grid-cols-[2.75rem_1fr_auto] sm:gap-x-8">
                      <span className="gradient-text text-sm font-semibold">
                        {String(project.order).padStart(2, "0")}
                      </span>

                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="text-xl font-semibold">
                            {project.title}
                          </h3>
                          {project.confidential && (
                            <span className="label text-faint">
                              Confidencial
                            </span>
                          )}
                        </div>
                        <p className="measure mt-2 text-muted">
                          {project.summary}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-muted"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <span className="col-start-2 mt-4 inline-flex items-center gap-2 text-sm text-pink sm:col-start-3 sm:mt-0">
                        {project.caseStudy ? (
                          <>
                            Ver o case
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </>
                        ) : (
                          <span className="text-faint">
                            {project.year ?? ""}
                          </span>
                        )}
                      </span>
                    </div>
                  )

                  return (
                    <li key={project.slug}>
                      {project.caseStudy ? (
                        <Link
                          href={`/projetos/${project.slug}`}
                          className="block [&>div]:hover:border-pink/40"
                        >
                          {inner}
                        </Link>
                      ) : (
                        inner
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        ))}

        <section className="border-t border-line/60">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <Link
              href="/"
              className="text-sm text-muted transition-colors hover:text-white"
            >
              ← Voltar para a home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
