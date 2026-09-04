export const profile = {
  name: "Junior Schmid",
  role: "Desenvolvedor de software e automação",
  location: "Horizontina, RS",
  email: "juniorschmid22@gmail.com",
  headline: "Eu automatizo o que não deveria ser feito à mão.",
  subhead:
    "Software, automação e visão computacional aplicados a problemas reais — de linha de produção a rotina de escritório.",
  intro:
    "Estudo Engenharia de Software e trabalho com o que fica entre o processo e o código: entender como uma coisa é feita hoje, encontrar onde o esforço é desperdiçado e devolver software que resolve aquilo de forma confiável. Atendo tanto operação industrial quanto quem só precisa parar de repetir a mesma tarefa toda semana.",
  socials: [
    { label: "GitHub", href: "https://github.com/JuniorSchmid" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/juniorschmid" },
  ],
} as const

/**
 * As quatro camadas do processo. Este array é a fonte da seção 3D:
 * cada item vira uma placa no modelo e um item de texto no DOM.
 * Mudar aqui muda os dois — o 3D nunca fica dessincronizado do conteúdo.
 */
export const processLayers = [
  {
    id: "01",
    title: "Entrada",
    body: "Onde o dado nasce: um sensor, uma imagem, uma planilha, um sistema legado que não expõe nada. É aqui que quase todo projeto de automação é decidido — se a entrada não é confiável, o resto não salva.",
  },
  {
    id: "02",
    title: "Extração",
    body: "Tirar informação estruturada de algo que não foi feito para ser lido por máquina. Visão computacional, OCR, integração direta quando existe API, automação de interface quando não existe.",
  },
  {
    id: "03",
    title: "Validação",
    body: "A camada que separa automação de aceleração de erro. Toda informação extraída passa por regra antes de virar decisão, e o que não passa vira exceção sinalizada — nunca uma gravação silenciosa.",
  },
  {
    id: "04",
    title: "Saída",
    body: "A informação chegando onde é útil: gravada no sistema, num relatório, num alerta. O trabalho só termina quando alguém consegue agir sobre o resultado sem retrabalho.",
  },
] as const

export const stackGroups = [
  {
    title: "Linguagens",
    items: ["Python", "TypeScript", "JavaScript", "PHP", "SQL"],
  },
  {
    title: "Automação & visão",
    items: ["OpenCV", "Selenium", "OCR", "PySide6"],
  },
  {
    title: "Web",
    items: ["React", "Next.js", "Node.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Dados & ferramentas",
    items: ["MySQL", "SQLite", "Git", "GitHub"],
  },
] as const
