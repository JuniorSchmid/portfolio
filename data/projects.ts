/**
 * Fonte única dos projetos. A home lê os destacados, /projetos lê todos
 * e /projetos/[slug] lê um pelo slug. Adicionar projeto = adicionar objeto.
 *
 * NOTA: os campos `problem`, `approach` e `decisions` são rascunhos escritos
 * a partir do que o Junior descreveu. Nenhum número, resultado ou métrica foi
 * inventado — onde falta informação, o campo está vazio de propósito.
 */

export type ProjectKind =
  | "Visão computacional"
  | "Automação"
  | "Produto web"
  | "Presença digital"
  | "Exploração"

export type Project = {
  slug: string
  /** Ordem de leitura. Também é a numeração exibida. */
  order: number
  title: string
  kind: ProjectKind
  /** Uma linha. Aparece no índice e no bloco da home. */
  summary: string
  /** Parágrafo de apoio no bloco de destaque. */
  description: string
  stack: string[]
  /** Destaques ganham bloco escuro de largura total na home. */
  featured: boolean
  /** Trabalho sob confidencialidade — sem screenshot, sem link. */
  confidential?: boolean
  image?: string
  imageAlt?: string
  repo?: string
  live?: string
  year?: string
  role?: string
  /** Conteúdo do case study. Ausente = projeto sem página própria. */
  caseStudy?: {
    problem: string
    approach: string
    decisions: { title: string; body: string }[]
  }
}

export const projects: Project[] = [
  {
    slug: "green-check",
    order: 1,
    title: "Green Check",
    kind: "Visão computacional",
    summary:
      "Verificação automática da presença de um adesivo de segurança, por visão computacional.",
    description:
      "Desenvolvido em equipe para uma competição de talentos ligada à John Deere. O sistema analisa a imagem de uma peça e responde se o adesivo de segurança obrigatório está presente e posicionado — uma checagem que, feita por pessoas, é lenta e falha justamente por ser repetitiva.",
    stack: ["Python", "OpenCV", "CV/ML", "API"],
    featured: true,
    image: "/greencheck.jpeg",
    imageAlt: "Interface do Green Check analisando a imagem de uma peça",
    year: "2025",
    role: "Desenvolvimento em equipe",
    caseStudy: {
      problem:
        "A conferência da presença de um adesivo de segurança é uma verificação obrigatória, binária e repetida centenas de vezes. É exatamente o tipo de tarefa em que a atenção humana se degrada: quem confere sabe que o adesivo quase sempre está lá, e é justamente por isso que a exceção passa.",
      approach:
        "Em vez de tratar como um problema de classificação genérica, o sistema resolve uma pergunta fechada: este adesivo está nesta região da peça? Isso permite trabalhar com processamento de imagem clássico apoiado por visão computacional, em vez de depender de um modelo grande e de um conjunto de treino que não existia.",
      decisions: [
        {
          title: "Pergunta fechada em vez de detecção aberta",
          body: "Restringir o escopo a uma verificação binária numa região conhecida reduziu drasticamente a necessidade de dados de treino e tornou o resultado auditável — dá para explicar por que o sistema disse não.",
        },
        {
          title: "OpenCV antes de deep learning",
          body: "O problema tem características visuais estáveis: cor, forma e posição do adesivo. Começar por processamento clássico manteve o sistema leve, rápido e depurável, com deep learning reservado para o que o clássico não resolvesse.",
        },
        {
          title: "Saída por API",
          body: "Expor a verificação como serviço, e não como aplicação fechada, deixa o resultado disponível para qualquer sistema que precise dele depois — o consumo não fica preso à interface.",
        },
      ],
    },
  },
  {
    slug: "paintcheck",
    order: 2,
    title: "PaintCheck",
    kind: "Automação",
    summary:
      "Aplicação desktop que automatiza o fluxo de consulta e conferência do operador.",
    description:
      "Leitura de códigos, consulta de informações e automação do fluxo de trabalho de quem opera o processo. Aplicação desktop com banco local — roda onde a internet não é garantida, que é a realidade de boa parte do chão de fábrica.",
    stack: ["Python", "PySide6", "SQLite"],
    featured: true,
    year: "2025",
    role: "Desenvolvimento individual",
    caseStudy: {
      problem:
        "O operador precisava consultar informação em mais de um lugar para conferir um item, alternando entre sistema, papel e conhecimento próprio. Cada troca de contexto é tempo perdido e uma chance de erro.",
      approach:
        "Concentrar a consulta num único ponto: o operador lê o código e a aplicação devolve, na mesma tela, tudo que ele precisa para decidir. Desktop com banco local para não depender de conexão.",
      decisions: [
        {
          title: "Desktop, não web",
          body: "Uma aplicação web exigiria rede estável no ponto de uso, o que não é garantido. Desktop com SQLite local remove essa dependência inteira.",
        },
        {
          title: "PySide6 pela densidade de informação",
          body: "A tela precisa mostrar muita informação de uma vez, para leitura rápida e a alguma distância. Qt entrega controle fino de layout e tipografia que um wrapper de HTML não dá com o mesmo esforço.",
        },
      ],
    },
  },
  {
    slug: "automacao-processos-corporativos",
    order: 3,
    title: "Automação de Processos Corporativos",
    kind: "Automação",
    summary:
      "Redução de tarefas repetitivas e consulta automatizada em sistemas internos.",
    description:
      "Rotinas que liam, extraíam e validavam informação entre sistemas que não conversavam entre si — substituindo trabalho manual de copiar, conferir e transcrever. Por acordo de confidencialidade, o case é apresentado pelo fluxo, não por telas.",
    stack: ["Python", "Selenium", "OCR"],
    featured: true,
    confidential: true,
    year: "2024 — 2025",
    role: "Desenvolvimento individual",
    caseStudy: {
      problem:
        "Informação existia em mais de um sistema, sem integração entre eles. A ponte era uma pessoa, copiando de um lado e colando no outro — trabalho que consome horas e cuja taxa de erro cresce com o volume.",
      approach:
        "Automatizar a ponte inteira: entrada, extração, validação e escrita no sistema de destino. A validação é a parte que importa — automatizar sem verificar só acelera a produção de erro.",
      decisions: [
        {
          title: "Validar antes de escrever",
          body: "Toda rotina confere o que extraiu antes de gravar. Um dado que não passa na regra vira exceção sinalizada, nunca uma escrita silenciosa e errada.",
        },
        {
          title: "OCR só onde não havia alternativa",
          body: "Onde o sistema expunha dado estruturado, o caminho é ler o dado. OCR entra apenas quando a informação só existe como imagem — é o elo mais frágil da cadeia e não deve ser o primeiro.",
        },
      ],
    },
  },
  {
    slug: "briquefacil",
    order: 4,
    title: "BriqueFácil",
    kind: "Produto web",
    summary: "Marketplace com autenticação, busca, filtros e painel administrativo.",
    description:
      "Produto web completo, do modelo de dados à interface: cadastro e autenticação de usuários, publicação de anúncios, busca com filtros e uma área administrativa para moderação.",
    stack: ["Next.js", "TypeScript", "React", "Banco de dados"],
    featured: false,
    year: "2025",
    role: "Desenvolvimento individual",
  },
  {
    slug: "artefacto-digital",
    order: 5,
    title: "Artefacto Digital",
    kind: "Presença digital",
    summary:
      "Plataforma institucional para apresentar processos, capacidade produtiva e produtos.",
    description:
      "Site institucional focado em comunicar o que a operação faz e do que é capaz — mais próximo de comunicação do que de sistema, e por isso um contraponto útil aos outros projetos.",
    stack: ["Web", "Institucional"],
    featured: false,
    year: "2025",
    role: "Desenvolvimento individual",
  },
  {
    slug: "plataforma-ecommerce",
    order: 6,
    title: "Plataforma E-commerce",
    kind: "Exploração",
    summary: "Loja com catálogo, carrinho e integração de pagamento.",
    description:
      "Projeto de estudo construído para entender o fluxo completo de uma operação de venda online, do catálogo ao pagamento.",
    stack: ["React", "Node.js", "MySQL", "Stripe"],
    featured: false,
  },
  {
    slug: "task-management",
    order: 7,
    title: "Task Management App",
    kind: "Exploração",
    summary: "Gestor de tarefas colaborativo com atualização em tempo real.",
    description:
      "Projeto de estudo focado em comunicação em tempo real e estado compartilhado entre usuários.",
    stack: ["TypeScript", "Socket.io", "MongoDB"],
    featured: false,
  },
]

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order)

export const allProjects = [...projects].sort((a, b) => a.order - b.order)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export const projectsWithCaseStudy = projects.filter((p) => p.caseStudy)
