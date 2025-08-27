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

export const metadata: Metadata = {
  title: "Junior • Portfólio",
  description: "Desenvolvedor Full-Stack focado em criar soluções inovadoras e experiências excepcionais",
  generator: "Junior PJ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${poppins.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
