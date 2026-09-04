import Image from "next/image"
import type { Project } from "@/data/projects"

/**
 * A mídia de cada projeto. Nem todo projeto tem screenshot — e um deles nunca
 * vai ter, por confidencialidade. Em vez de esconder isso, cada caso ganha um
 * tratamento próprio e honesto.
 */
export function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-elevated">
        <Image
          src={project.image}
          alt={project.imageAlt ?? `Interface do projeto ${project.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    )
  }

  if (project.confidential) return <FlowDiagram />

  return <PendingFrame />
}

/** Para o projeto sob confidencialidade: o fluxo comunica mais que uma tela borrada. */
function FlowDiagram() {
  const steps = ["Entrada", "Extração", "Validação", "Sistema"]

  return (
    <figure className="glass rounded-2xl p-6">
      <svg
        viewBox="0 0 400 210"
        className="w-full"
        role="img"
        aria-label="Fluxo da automação: entrada, extração, validação e escrita no sistema"
      >
        <defs>
          <linearGradient id="flow-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff4ecd" />
            <stop offset="100%" stopColor="#6a11cb" />
          </linearGradient>
          <marker
            id="flow-arrow"
            viewBox="0 0 8 8"
            refX="6"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0 1 L6 4 L0 7 z" fill="#ff4ecd" />
          </marker>
        </defs>

        {steps.map((label, i) => {
          const x = 8 + i * 98
          return (
            <g key={label}>
              <rect
                x={x}
                y="82"
                width="82"
                height="46"
                rx="8"
                fill="none"
                stroke="url(#flow-stroke)"
                strokeWidth="1.2"
              />
              <text
                x={x + 41}
                y="110"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="12"
              >
                {label}
              </text>
              {i < steps.length - 1 && (
                <path
                  d={`M${x + 84} 105 L${x + 96} 105`}
                  stroke="#ff4ecd"
                  strokeOpacity="0.6"
                  markerEnd="url(#flow-arrow)"
                />
              )}
            </g>
          )
        })}

        <path
          d="M204 128 L204 152"
          stroke="#a79fb8"
          strokeOpacity="0.4"
          strokeDasharray="3 4"
        />
        <text x="200" y="168" textAnchor="middle" fill="#a79fb8" fontSize="11">
          Exceção sinalizada, nunca gravação silenciosa
        </text>
      </svg>

      <figcaption className="label mt-4 text-faint">
        Fluxo do processo — telas omitidas por confidencialidade
      </figcaption>
    </figure>
  )
}

function PendingFrame() {
  return (
    <div className="grid aspect-[16/10] place-items-center rounded-2xl border border-dashed border-white/15 bg-elevated">
      <span className="label text-faint">Screenshot em preparação</span>
    </div>
  )
}
