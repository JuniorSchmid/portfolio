import { processLayers } from "@/data/profile"

/**
 * Equivalente parado do modelo 3D. Serve a dois casos: quem pediu menos
 * movimento no sistema, e quem abre o site sem WebGL disponível.
 */
export function ProcessDiagram() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="h-full w-full"
      role="presentation"
      focusable="false"
    >
      <defs>
        <linearGradient id="proc-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff4ecd" />
          <stop offset="100%" stopColor="#6a11cb" />
        </linearGradient>
      </defs>

      {processLayers.map((layer, i) => {
        const cy = 92 + i * 48
        return (
          <g key={layer.id}>
            <path
              d={`M160 ${cy - 32} L268 ${cy} L160 ${cy + 32} L52 ${cy} Z`}
              fill="#1e1730"
              stroke="url(#proc-stroke)"
              strokeWidth="1.2"
            />
            <text x="282" y={cy + 4} fill="#ff4ecd" fontSize="11">
              {layer.id}
            </text>
          </g>
        )
      })}

      <line
        x1="160"
        y1="44"
        x2="160"
        y2="276"
        stroke="#ff4ecd"
        strokeOpacity="0.35"
        strokeDasharray="3 5"
      />
    </svg>
  )
}
