import Image from "next/image"
import Link from "next/link"

const links = [
  { href: "/#sobre", label: "Sobre mim" },
  { href: "/#habilidades", label: "Habilidades" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#processo", label: "Processo" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-night/85 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3"
      >
        <Link href="/" className="mr-auto flex items-center gap-3">
          {/* JS — JavaScript e Junior Schmid ao mesmo tempo. */}
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-10 w-10"
          />
          <span className="font-semibold">Junior • Portfólio</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#contato"
          className="rounded-full gradient-bg px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Contato
        </Link>
      </nav>
    </header>
  )
}
