"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  Menu,
  X,
  MapPin,
  Calendar,
  User,
  Brain,
  Users,
  Target,
  Lightbulb,
  MessageCircle,
  Clock,
  CheckCircle,
  Zap,
  Heart,
  Code,
} from "lucide-react"
import { SiJavascript, SiPython, SiCss3, SiHtml5, SiRuby, SiNodedotjs, SiMysql, SiTypescript } from "react-icons/si"
import { TbFileTypeSql } from "react-icons/tb";
import { FaPhp } from "react-icons/fa";
import Image from "next/image"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [typingText, setTypingText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)

  const typingTexts = [
    "Desenvolvedor Web",
    "Melhores soluções para seus projetos",
    "Focado em Clean Code",
  ]

  // Typing animation effect
  useEffect(() => {
    const currentText = typingTexts[typingIndex]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setTypingText(currentText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setTypingIndex((prev) => (prev + 1) % typingTexts.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [typingIndex])

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "soft-skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fade in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".fade-in")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const hardSkills = [
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "CSS", icon: SiCss3, color: "#1572B6" },
    { name: "HTML", icon: SiHtml5, color: "#E34F26" },
    { name: "PHP", icon: FaPhp, color: "#F29111" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    {name: "Git", icon: SiRuby, color: "#F05032" }, // usarndo o ícone do Ruby para Git
    { name: "GitHub", icon: Github, color: "#181717" },
    { name: "React", icon: SiJavascript, color: "#61DAFB" }, // usarndo o ícone do JavaScript para React
    { name: "Next.js", icon: SiJavascript, color: "#000000" }, // usarndo o ícone do JavaScript para Next.js
    { name: "Tailwind CSS", icon: SiCss3, color: "#38B2AC" }, // usarndo o ícone do CSS para Tailwind CSS
    { name: "SQL", icon: TbFileTypeSql, color: "#CC2927" },

    
  ]

  const softSkills = [
    { name: "Comunicação", icon: MessageCircle },
    { name: "Trabalho em equipe", icon: Users },
    { name: "Resolução de problemas", icon: Target },
    { name: "Criatividade", icon: Lightbulb },
    { name: "Adaptabilidade", icon: Zap },
    { name: "Gestão de tempo", icon: Clock },
    { name: "Liderança", icon: User },
    { name: "Pensamento crítico", icon: Brain },
    { name: "Atenção aos detalhes", icon: CheckCircle },
    { name: "Empatia", icon: Heart },
  ]

  const projects = [
    {
      title: "Platforma E-commerce",
      description: "Plataforma completa de e-commerce com painel administrativo",
      tags: ["React", "Node.js", "MySQL", "Stripe"],
      image: "/modern-ecommerce-dashboard.png",
    },
    {
      title: "Task Management App",
      description: "Aplicativo de gerenciamento de tarefas com autenticação e notificações em tempo real",
      tags: ["TypeScript", "Socket.io", "MongoDB"],
      image: "/task-management-app.png",
    },
    {
      title: "Green Check",
      description: "Aplicativo desenvolvido para uma competição de talentos direcionada a john deere. Nesse projeto nossa equipe criou um check para saber se esta ou não um adesivo de segurança",
      tags: ["Python", "CVML", "API Integration", "OpenCV"],
      image: "/greencheck.jpeg",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#0f0b16] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src="/logo_main.png"
                alt="Logo Junior"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <span className="font-semibold text-lg">Junior • Portfólio</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {["home", "about", "skills", "projects", "soft-skills"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === section ? "text-[#ff4ecd]" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {section === "home" && "Home"}
                    {section === "about" && "Sobre mim"}
                    {section === "skills" && "Habilidades"}
                    {section === "projects" && "Projetos"}
                    {section === "soft-skills" && "Soft Skills"}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-[#ff4ecd] to-[#6a11cb] hover:opacity-90 transition-opacity"
                >
                  Contato
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["home", "about", "skills", "projects", "soft-skills", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white w-full text-left"
                >
                  {section === "home" && "Home"}
                  {section === "about" && "Sobre mim"}
                  {section === "skills" && "Habilidades"}
                  {section === "projects" && "Projetos"}
                  {section === "soft-skills" && "Soft Skills"}
                  {section === "contact" && "Contato"}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Olá, meu nome é <span className="gradient-text">Junior</span>
              </h1>

              <div className="text-xl md:text-2xl mb-4 h-8">
                <span className="typing-animation">{typingText}</span>
              </div>

              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Desenvolvendo hoje as soluções que transformam o amanhã.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-gradient-to-r from-[#ff4ecd] to-[#6a11cb] hover:opacity-90 transition-all hover-glow"
                >
                  Ver Projetos
                </Button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="outline"
                  className="border-[#6a11cb] text-[#6a11cb] hover:bg-[#6a11cb] hover:text-white transition-all"
                >
                  Entrar em contato
                </Button>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/junior-schmid-165a10309", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/JuniorSchmid", label: "GitHub" },
                  { icon: Mail, href: "mailto:juniorschmid22@gmail.com.com", label: "Email" },
                  { icon: Instagram, href: "https://www.instagram.com/juniorschmid_09", label: "Instagram" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass flex items-center justify-center hover-glow transition-all hover-scale"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="fade-in flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[#ff4ecd] to-[#6a11cb] p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src="/professional-developer-portrait.png" alt="Junior" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass p-8 fade-in hover-glow transition-all">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8 gradient-text">Sobre Mim</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center space-x-2">
                  <User className="text-[#ff4ecd]" size={20} />
                  <span className="font-semibold">Junior</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="text-[#ff4ecd]" size={20} />
                  <span>19 anos</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="text-[#ff4ecd]" size={20} />
                  <span>Horizontina — RS</span>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                Sou um profissional apaixonado por tecnologia e desenvolvimento de software,
                atualmente cursando Engenharia de Software na FIAP. Tenho conhecimento em diversas linguagens de programação,
                como JavaScript, Python, HTML, CSS, Node.js, MySQL, TypeScript e C#, e estou sempre em busca de aprimorar minhas
                habilidades e aprender novas ferramentas. Prezo por criar soluções eficientes, bem estruturadas e voltadas para a 
                experiência do usuário, unindo lógica e criatividade para resolver problemas de forma prática. Minha meta é contribuir 
                com projetos que gerem impacto real, aplicando não apenas conhecimento técnico, mas também proatividade, 
                responsabilidade e constante evolução profissional.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Hard Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text fade-in">Habilidades Técnicas</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {hardSkills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <Card
                  key={skill.name}
                  className="glass p-6 text-center hover-glow hover-scale transition-all fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon size={32} style={{ color: skill.color }} className="mx-auto mb-3" />
                  <h3 className="font-semibold">{skill.name}</h3>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text fade-in">Projetos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="glass overflow-hidden hover-glow hover-scale transition-all fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gradient-to-r from-[#ff4ecd] to-[#6a11cb] text-white"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Skills Section */}
      <section id="soft-skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text fade-in">Soft Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {softSkills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <Card
                  key={skill.name}
                  className="glass p-6 text-center hover-glow hover-scale transition-all fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="mx-auto mb-3 text-[#ff4ecd]" size={32} />
                  <h3 className="font-semibold text-sm">{skill.name}</h3>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text fade-in">Contato</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glass p-8 fade-in">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#ff4ecd] focus:outline-none transition-colors"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#ff4ecd] focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#ff4ecd] focus:outline-none transition-colors resize-none"
                    placeholder="Sua mensagem..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ff4ecd] to-[#6a11cb] hover:opacity-90 transition-all hover-glow"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="fade-in">
              <h3 className="text-xl font-semibold mb-6">Outras formas de contato</h3>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "juniorschmid22@gmail.com" },
                  { icon: Linkedin, label: "LinkedIn", value: "junior-schmid-165a10309" },
                  { icon: Github, label: "GitHub", value: "/JuniorSchmid" },
                  { icon: Instagram, label: "Instagram", value: "@juniorschmid_09" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg glass flex items-center justify-center">
                      <Icon className="text-[#ff4ecd]" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{label}</p>
                      <p className="text-gray-300">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0b16] py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Junior — Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
