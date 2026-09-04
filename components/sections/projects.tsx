import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { allProjects, featuredProjects } from "@/data/projects"
import { ProjectMedia } from "@/components/project-media"
import { Reveal } from "@/components/reveal"

export function Projects() {
  const secondary = allProjects.filter(
    (p) => !p.featured && p.kind !== "Exploração",
  )

  return (
    <section id="projetos" className="scroll-mt-16 border-t border-line/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="label text-pink">Trabalho</p>
          <h2 className="mt-5 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1]">
            Cinco casos, com{" "}
            <span className="gradient-text">pesos diferentes.</span>
          </h2>
          <p className="measure mt-5 text-muted">
            A numeração é ordem de leitura, e a força cai de propósito. Os três
            primeiros são o que melhor explica como eu trabalho.
          </p>
        </Reveal>

        <div className="mt-14 space-y-8">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug}>
              <article className="glass grid items-center gap-8 rounded-3xl p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <ProjectMedia project={project} />
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="gradient-text text-sm font-semibold">
                      {String(project.order).padStart(2, "0")}
                    </span>
                    <span className="label text-faint">{project.kind}</span>
                    {project.confidential && (
                      <span className="label rounded-full border border-white/15 px-2.5 py-0.5 text-faint">
                        Confidencial
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] leading-[1.15]">
                    {project.title}
                  </h3>

                  <p className="measure mt-4 leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {project.caseStudy && (
                    <Link
                      href={`/projetos/${project.slug}`}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-pink transition-opacity hover:opacity-75"
                    >
                      Ver o case
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <h3 className="label text-faint">Também construí</h3>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {secondary.map((project) => (
              <li
                key={project.slug}
                className="glass rounded-2xl p-5 transition-colors hover:border-pink/40"
              >
                <div className="flex items-baseline gap-3">
                  <span className="gradient-text text-sm font-semibold">
                    {String(project.order).padStart(2, "0")}
                  </span>
                  <h4 className="font-semibold">{project.title}</h4>
                </div>
                <p className="mt-2 text-sm text-muted">{project.summary}</p>
                <p className="label mt-3 text-faint">{project.kind}</p>
              </li>
            ))}
          </ul>

          <Link
            href="/projetos"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-pink transition-opacity hover:opacity-75"
          >
            Ver todos os projetos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
