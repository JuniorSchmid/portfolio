import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const SITE_URL = "https://www.juniorportfolio.blog"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Junior • Portfólio",
    template: "%s · Junior Schmid",
  },
  description:
    "Desenvolvedor de software e automação. Automatizo o que não deveria ser feito à mão — de linha de produção a rotina de escritório.",
  keywords: [
    "desenvolvedor de software",
    "automação de processos",
    "visão computacional",
    "Python",
    "Next.js",
    "Horizontina",
    "Rio Grande do Sul",
  ],
  authors: [{ name: "Junior Schmid" }],
  creator: "Junior Schmid",
  // A logo otimizada (5 kB, com transparência) no lugar do logo_main2.png,
  // que tinha 1,3 MB e fundo chapado.
  icons: { icon: "/logo.png" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Junior • Portfólio",
    title: "Junior • Portfólio",
    description:
      "Automatizo o que não deveria ser feito à mão — de linha de produção a rotina de escritório.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Junior • Portfólio",
    description:
      "Automatizo o que não deveria ser feito à mão — de linha de produção a rotina de escritório.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
