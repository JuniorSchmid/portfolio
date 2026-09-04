/**
 * Fonte única dos projetos. A home lê os destacados, /projetos lê todos
 * e /projetos/[slug] lê um pelo slug. Adicionar projeto = adicionar objeto.
 *
 * NOTA: nenhum número, resultado ou métrica foi inventado. O case do
 * PaintCheck vem do README do próprio projeto; onde falta informação,
 * o campo simplesmente não existe.
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
  /** Destaques ganham bloco grande na home. */
  featured: boolean
  /** Trabalho sob confidencialidade — sem screenshot, sem link. */
  confidential?: boolean
  image?: string
  imageAlt?: string
  /** Proporção real do arquivo, para a imagem não ser recortada. */
  imageWidth?: number
  imageHeight?: number
  repo?: string
  live?: string
  year?: string
  role?: string
  client?: string
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
      "Verificação automática de adesivo de segurança por visão computacional, desenvolvida para a John Deere.",
    description:
      "Desenvolvido em equipe para uma competição de talentos ligada à John Deere. O sistema analisa a imagem de uma peça e responde se o adesivo de segurança obrigatório está presente e posicionado — uma checagem que, feita por pessoas, é lenta e falha justamente por ser repetitiva.",
    stack: ["Python", "OpenCV", "CV/ML", "API"],
    featured: true,
    image: "/greencheck.jpeg",
    imageAlt: "Peça verde com o adesivo de segurança sendo verificado",
    imageWidth: 572,
    imageHeight: 382,
    year: "2025",
    role: "Desenvolvimento em equipe",
    client: "Competição ligada à John Deere",
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
      "Controle visual de embalagem pós-pintura, integrado ao ERP por automação.",
    description:
      "Na linha de pintura da Artefacto, o operador lê o código de barras da Ordem de Produção e o sistema consulta o ERP Technicon sozinho, exibindo num monitor em tela cheia a imagem da peça, o tipo de embalagem e a quantidade por KLT. O operador não precisa parar, procurar nem clicar em nada.",
    stack: ["Python", "PySide6", "Selenium", "SQLite", "Chrome CDP"],
    featured: true,
    image: "/paintcheck.jpg",
    imageAlt: "Monitor do PaintCheck exibindo a peça e as instruções de embalagem",
    imageWidth: 1365,
    imageHeight: 768,
    year: "2025",
    role: "Desenvolvimento individual",
    client: "Artefacto Indústria Metalúrgica",
    caseStudy: {
      problem:
        "Depois da pintura, cada peça precisa ser embalada de um jeito específico: um tipo de embalagem e uma quantidade por KLT. Essa informação existe no ERP Technicon, atrás de uma sequência de cliques, e consultá-la significa o operador sair da linha. É uma busca repetitiva no meio de um fluxo que não deveria parar — e embalar errado custa retrabalho.",
      approach:
        "Eliminar a consulta em vez de acelerá-la. O código de barras que já está na Ordem de Produção carrega a OP e o código do processo. O sistema lê esse código pelo scanner que já existe na linha, consulta o ERP sozinho e coloca a resposta num monitor em tela cheia, legível a distância. O operador não interage com o sistema: ele só bipa e olha.",
      decisions: [
        {
          title: "Separar scanner de teclado pela velocidade de digitação",
          body: "Um hook global de teclado captura tudo que é digitado na máquina. Um leitor de código de barras emite teclas com menos de 80ms entre elas; uma pessoa nunca digita assim. Esse filtro, somado à exigência do prefixo fixo 00, deixa a máquina ser usada normalmente sem disparar leituras falsas.",
        },
        {
          title: "Tampermonkey para alcançar um closure de JavaScript",
          body: 'O botão "Último Registro" do Technicon vive dentro de um closure JS que o Selenium não consegue chamar. Em vez de simular cliques frágeis, um userscript intercepta o addEventListener antes do ERP carregar e expõe window.clicarUltimoRegistro(). O Selenium passa a chamar a própria função da aplicação, o que é muito mais estável que perseguir elementos na tela.',
        },
        {
          title: "Desktop com SQLite local, não aplicação web",
          body: "A linha não pode depender de rede. SQLite em modo WAL dá conta da concorrência entre a thread do ERP e a interface, e a fila com EMB e QUANT sobrevive a uma queda de energia — ao voltar, o monitor recompõe o estado sozinho.",
        },
        {
          title: "ERP em thread separada",
          body: "A consulta ao Technicon leva segundos. Rodando fora da thread de interface e conversando com ela por signals do Qt, o monitor nunca congela enquanto uma busca está em andamento — o que importa numa tela que fica exposta o tempo todo.",
        },
        {
          title: "Cor única por código de peça pela razão áurea",
          body: "Distribuir os matizes pela razão áurea gera mais de 50 cores visualmente distintas sem ninguém escolher cor nenhuma à mão. O operador passa a reconhecer a peça pela cor antes mesmo de ler o texto.",
        },
      ],
    },
  },
  {
    slug: "artefacto",
    order: 3,
    title: "Artefacto",
    kind: "Produto web",
    summary:
      "Plataforma institucional de uma metalúrgica com CMS próprio, cinco perfis de acesso e canal de ouvidoria anônimo.",
    description:
      "Site público e painel administrativo no mesmo projeto, para uma indústria com 40 anos de operação e clientes como John Deere, AGCO e Stara. A parte pública faz a visita visual à fábrica — vídeo institucional e uma página para cada etapa do processo produtivo — e o painel deixa marketing, RH, compliance e comercial cuidarem do próprio conteúdo, cada um vendo só o que lhe cabe.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "JWT",
      "Vercel Blob",
    ],
    featured: true,
    image: "/artefacto.jpg",
    imageAlt: "Página inicial do site da Artefacto",
    imageWidth: 1600,
    imageHeight: 740,
    year: "2025",
    role: "Desenvolvimento individual",
    client: "Artefacto — metalúrgica e madeireira, Horizontina/RS",
    live: "https://artefacto.ind.br",
    repo: "https://github.com/JuniorSchmid/Site-industrial-Artefacto",
    caseStudy: {
      problem:
        "Uma indústria de 40 anos que fornece para John Deere, AGCO e Stara precisa provar capacidade produtiva para compradores que nunca vão pisar na fábrica. E precisa fazer isso sem depender de um desenvolvedor toda vez que abre uma vaga, publica um post ou troca o logo de um cliente. Havia ainda uma exigência que um site institucional comum não cobre: um canal de ouvidoria que proteja de verdade quem faz a denúncia.",
      approach:
        "Uma aplicação só, com duas caras. A pública resolve a comunicação: vídeo institucional, linha do tempo desde 1985 e uma página por etapa produtiva, que juntas funcionam como uma visita à fábrica. A privada resolve a autonomia: um CMS próprio onde cada setor administra a sua parte — blog, vagas, currículos, contatos, orçamentos e denúncias — sem enxergar o resto.",
      decisions: [
        {
          title: "CMS próprio em vez de WordPress",
          body: "O painel atende cinco setores com necessidades diferentes. Um CMS genérico ou daria acesso total a todo mundo ou exigiria uma pilha de plugins para chegar perto disso. Escrever o painel permitiu modelar cinco perfis (SUPER_ADMIN, MARKETING, RH, COMPLIANCE e COMERCIAL) com permissão por módulo, que é o que o negócio realmente pedia.",
        },
        {
          title: "Autorização no middleware, não em cada página",
          body: "O middleware valida sessão e permissão por módulo antes de qualquer rota de /api/admin e das escritas do blog. A consequência é o que importa: uma rota nova nasce protegida por padrão, em vez de depender de alguém lembrar de checar permissão dentro dela.",
        },
        {
          title: "A ouvidoria protege o denunciante por desenho",
          body: "A denúncia é anônima e gera um protocolo aleatório. A consulta pública devolve apenas o status, nunca o conteúdo — quem tem o protocolo não consegue ler a denúncia de volta. Os anexos vão para um Blob store separado do usado pelo blog, para que o material sensível não divida espaço com o conteúdo público.",
        },
        {
          title: "HTML do editor sanitizado antes de renderizar",
          body: "O blog usa editor rich-text, o que significa que o banco guarda HTML. Sem sanitização, o painel viraria um vetor de XSS armazenado para qualquer pessoa com acesso a ele. Todo conteúdo passa por DOMPurify antes de chegar na página.",
        },
        {
          title: "Anti-spam sem CAPTCHA",
          body: "Honeypot, tempo mínimo de preenchimento e validação de tamanho no servidor seguram bot sem colocar um obstáculo na frente do usuário. Isso vale para todos os formulários, mas decidiu-se pela ouvidoria: atrito ali desencoraja denúncia legítima.",
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
      "Produto web completo, do modelo de dados à interface: cadastro e autenticação de usuários, publicação de anúncios, busca com filtros e uma área administrativa para moderação. É o projeto que mostra o outro lado do trabalho — produto para pessoas, não para chão de fábrica.",
    stack: ["Next.js", "TypeScript", "React", "Banco de dados"],
    featured: true,
    image: "/briquefacil.jpg",
    imageAlt: "Tela do marketplace BriqueFácil",
    imageWidth: 1600,
    imageHeight: 758,
    year: "2025",
    role: "Desenvolvimento individual",
  },
  {
    slug: "automacao-processos-corporativos",
    order: 5,
    title: "Automação de Processos Corporativos",
    kind: "Automação",
    summary:
      "Redução de tarefas repetitivas e consulta automatizada em sistemas internos.",
    description:
      "Rotinas que liam, extraíam e validavam informação entre sistemas que não conversavam entre si — substituindo trabalho manual de copiar, conferir e transcrever. Por acordo de confidencialidade, o case é apresentado pelo fluxo, não por telas.",
    stack: ["Python", "Selenium", "OCR"],
    featured: false,
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
