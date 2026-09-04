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
 * As quatro camadas do processo, reveladas uma a uma conforme o scroll.
 * `note` é a frase curta que aparece destacada no card.
 */
export const processLayers = [
  {
    id: "01",
    title: "Entrada",
    note: "Se a entrada não é confiável, o resto não salva.",
    body: "Onde o dado nasce: um sensor, uma imagem, uma planilha, um sistema legado que não expõe nada. É aqui que quase todo projeto de automação é decidido.",
    tools: ["Sensores", "Imagem", "Planilhas", "Sistemas legados"],
  },
  {
    id: "02",
    title: "Extração",
    note: "Ler o que não foi feito para ser lido por máquina.",
    body: "Tirar informação estruturada de uma fonte que não coopera. Integração direta quando existe API, automação de interface quando não existe, visão computacional quando o dado só existe como imagem.",
    tools: ["OpenCV", "OCR", "Selenium", "APIs"],
  },
  {
    id: "03",
    title: "Validação",
    note: "É o que separa automação de aceleração de erro.",
    body: "Toda informação extraída passa por regra antes de virar decisão. O que não passa vira exceção sinalizada — nunca uma gravação silenciosa que ninguém percebe.",
    tools: ["Regras de negócio", "Exceções", "Logs"],
  },
  {
    id: "04",
    title: "Saída",
    note: "Só termina quando alguém consegue agir sem retrabalho.",
    body: "A informação chegando onde é útil: gravada no sistema, num relatório, num alerta. Entregar o dado no lugar errado é o mesmo que não ter automatizado.",
    tools: ["Banco de dados", "Relatório", "Alerta"],
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
