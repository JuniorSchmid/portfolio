import Link from "next/link"
import { profile } from "@/data/profile"

export function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-4 px-6 py-10">
        <Link href="/" className="mr-auto flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-bg text-xs font-bold text-white">
            JS
          </span>
          <span className="text-sm font-medium">{profile.name}</span>
        </Link>

        <Link
          href="/projetos"
          className="text-sm text-muted transition-colors hover:text-white"
        >
          Projetos
        </Link>

        {profile.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-white"
          >
            {social.label}
          </a>
        ))}

        <p className="w-full text-sm text-faint sm:w-auto">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
