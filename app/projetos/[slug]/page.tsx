import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, Github } from "lucide-react"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { ProjectMedia } from "@/components/project-media"
import { getProject, projectsWithCaseStudy } from "@/data/projects"

export function generateStaticParams() {
  return projectsWithCaseStudy.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      title: `${project.title} · Junior Schmid`,
      description: project.summary,
      type: "article",
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project?.caseStudy) notFound()

  const { caseStudy } = project

  return (
    <>
      <Navbar />
      <main>
        <article>
          <header className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-[120px] gradient-bg"
            />

            <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-16">
              <Link
                href="/projetos"
                className="text-sm text-muted transition-colors hover:text-white"
              >
                ← Todos os projetos
              </Link>

              <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="label gradient-text">{project.kind}</span>
                {project.confidential && (
                  <span className="label rounded-full border border-white/15 px-2.5 py-0.5 text-faint">
                    Confidencial
                  </span>
                )}
              </div>

              <h1 className="mt-4 max-w-[14ch] text-[clamp(2rem,6vw,3.75rem)] leading-[1.05]">
                {project.title}
              </h1>
              <p className="measure mt-6 text-lg text-muted">
                {project.summary}
              </p>

              {(project.live || project.repo) && (
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full gradient-bg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Abrir o site
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      Ver o código
                    </a>
                  )}
                </div>
              )}

              <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {project.year && (
                  <div className="glass rounded-2xl p-5">
                    <dt className="label text-faint">Período</dt>
                    <dd className="mt-2 text-sm font-medium">{project.year}</dd>
                  </div>
                )}
                {project.role && (
                  <div className="glass rounded-2xl p-5">
                    <dt className="label text-faint">Papel</dt>
                    <dd className="mt-2 text-sm font-medium">{project.role}</dd>
                  </div>
                )}
                {project.client && (
                  <div className="glass col-span-2 rounded-2xl p-5">
                    <dt className="label text-faint">Contexto</dt>
                    <dd className="mt-2 text-sm font-medium">
                      {project.client}
                    </dd>
                  </div>
                )}
                <div className="glass col-span-2 rounded-2xl p-5">
                  <dt className="label text-faint">Stack</dt>
                  <dd className="mt-2 text-sm font-medium">
                    {project.stack.join(" · ")}
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          <div className="border-y border-line/60 py-14">
            <div className="mx-auto max-w-4xl px-6">
              <ProjectMedia project={project} />
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
              <h2 className="label pt-1 text-pink">O problema</h2>
              <p className="measure text-lg leading-relaxed text-muted">
                {caseStudy.problem}
              </p>
            </div>

            <div className="mt-16 grid gap-8 border-t border-line/60 pt-16 lg:grid-cols-[14rem_1fr] lg:gap-16">
              <h2 className="label pt-1 text-pink">A abordagem</h2>
              <p className="measure text-lg leading-relaxed text-muted">
                {caseStudy.approach}
              </p>
            </div>

            <div className="mt-16 grid gap-8 border-t border-line/60 pt-16 lg:grid-cols-[14rem_1fr] lg:gap-16">
              <h2 className="label pt-1 text-pink">Decisões técnicas</h2>
              <ol className="grid gap-4">
                {caseStudy.decisions.map((decision, i) => (
                  <li
                    key={decision.title}
                    className="glass grid grid-cols-[2.75rem_1fr] gap-x-4 rounded-2xl p-6"
                  >
                    <span className="gradient-text text-sm font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {decision.title}
                      </h3>
                      <p className="measure mt-2 leading-relaxed text-muted">
                        {decision.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="border-t border-line/60">
            <div className="mx-auto max-w-7xl px-6 py-14">
              <Link
                href="/projetos"
                className="text-sm font-medium text-pink transition-opacity hover:opacity-75"
              >
                ← Todos os projetos
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
