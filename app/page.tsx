import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Process } from "@/components/sections/process"
import { Projects } from "@/components/sections/projects"
import { About } from "@/components/sections/about"
import { Stack } from "@/components/sections/stack"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Process />
        <Projects />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
