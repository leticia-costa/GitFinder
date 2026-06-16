# GitFinder

Aplicação web para explorar perfis e repositórios do GitHub, desenvolvida com React, TypeScript e Sass.

---

## Stack

### Core
- **React 18** — biblioteca de UI
- **TypeScript** — tipagem estática
- **Vite** — bundler e servidor de desenvolvimento

### Roteamento
- **React Router DOM** — navegação entre páginas

### Consumo de API e Server State
- **React Query** — cache, paginação e estados assíncronos
- **Axios** — cliente HTTP com interceptors

### Estilização
- **Sass** — estilos componentizados e variáveis CSS globais

### Testes Unitários
- **Vitest** — test runner
- **React Testing Library** — renderização de componentes
- **jest-dom** — matchers de DOM
- **user-event** — simulação de interações do usuário

### Testes E2E
- **Cypress** — testes de fluxo completo com mocks via fixtures

### Qualidade de Código
- **ESLint** — linting
- **Prettier** — formatação
- **Husky** + **lint-staged** — git hooks para garantir qualidade antes do commit

---

## Funcionalidades

- Busca de usuários do GitHub por nome com paginação infinita
- Visualização de perfil completo com seguidores, seguindo e total de estrelas
- Listagem de repositórios com filtro por nome e ordenação (A-Z, Z-A, mais/menos estrelas)
- Detalhes do repositório com linguagem, branch padrão, tópicos, datas e clone URL
- Navegação fluida entre as três páginas com botão de voltar
- Estados de loading (skeleton), erro e lista vazia tratados em todas as telas

---

## Pré-requisitos

- Node.js 18+
- npm 9+

---

## Instalação

````bash
# Clone o repositório
git clone https://github.com/leticia-costa/GitFinder.git
cd GitFinder

# Instale as dependências
npm install
````

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

````env
VITE_GITHUB_TOKEN=ghp_seu_token_aqui
````

> O token é opcional, mas recomendado. Sem ele o GitHub limita as requisições a **60/hora**. Com um token pessoal o limite sobe para **5.000/hora**. Para gerar um token acesse [github.com/settings/tokens](https://github.com/settings/tokens) — não é necessária nenhuma permissão especial para a API pública.

---

## Scripts

````bash
# Servidor de desenvolvimento
npm run dev

# Testes unitários
npm run test

# Abre o Cypress em modo interativo
npx cypress open

# Rodar um teste específico
npx cypress run --spec "cypress/e2e/full-flow.cy.ts"

---

## Arquitetura

O projeto adota **Feature-Based Architecture**, onde cada funcionalidade é isolada em sua própria pasta com seus próprios componentes, hooks e serviços. Código verdadeiramente compartilhado entre features fica em `common`.

````
src/
├── features/
│   ├── search/                  # Busca de usuários
│   │   ├── components/          # SearchBar, UserCard, EmptyState, LoadingGrid
│   │   ├── hooks/               # useSearchUsers
│   │   └── pages/
│   │       └── SearchPage/
│   │
│   ├── user/                    # Perfil do usuário
│   │   ├── components/          # Siderbar, RepoTable
│   │   ├── hooks/               # useGetUser, useUserRepos
│   │   └── pages/
│   │       └── UserPage/
│   │
│   └── repository/              # Repositórios
│       ├── components/          # InfoGrid, RepositoryGrid
│       ├── hooks/               # useGetRepository
│       └── pages/
│           └── RepositoryPage/
│
├── common/
│   ├── api/                     # Consumo das apis
│   ├── components/              # Componentes reutilizáveis
│   ├── hooks/                   # Hooks genéricos reutilizáveis
│   ├── services/                # Instância do Axios e interceptors
│   ├── types/                   # Interfaces TypeScript
│   └── utils/                   # Funções utilitárias 
│
└── routes/
    └── Router.tsx               # Definição das rotas da aplicação
````

---

## Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | SearchPage | Busca de usuários por nome |
| `/user/:login` | UserPage | Perfil e repositórios do usuário |
| `/user/:login/repo/:repo` | RepositoryPage | Detalhes de um repositório |

---

## API do GitHub

Endpoints utilizados:

| Hook | Método | Endpoint |
|---|---|---|
| `useSearchUsers` | GET | `/search/users?q={query}&page={page}&per_page=30` |
| `useGetUser` | GET | `/users/{login}` |
| `useUserRepos` | GET | `/users/{login}/repos?per_page=100` |
| `useGetRepository` | GET | `/repos/{login}/{repo}` |

Documentação completa: [docs.github.com/en/rest](https://docs.github.com/en/rest)

---

## Variáveis CSS

Todas as variáveis de design ficam em `src/styles/variables.scss` e estão disponíveis globalmente:

````scss
:root {
  // Background
  --color-bg-primary: #0d1117;
  --color-bg-secondary: #161b22;
  --color-bg-card: #1c2128;
  --color-bg-hover: #21262d;
  --color-bg-input: #0d1117;

  // GitFinder Purple
  --color-purple-primary: #9333ea;
  --color-purple-secondary: #7e22ce;
  --color-purple-dark: #26174B;

  --color-purple-glow-strong: rgba(147, 51, 234, 0.25);
  --color-purple-glow-medium: rgba(147, 51, 234, 0.1);
  --color-purple-glow-subtle: rgba(147, 51, 234, 0.05);

  // Border
  --color-border-default: #30363d;
  --color-border-muted: #21262d;
  --color-border-focus: #7e22ce;

  // Text
  --color-text-primary: #e6edf3;
  --color-text-secondary: #aeb6bf;
  --color-text-muted: #818b99;
  --color-text-link: #58a6ff;

  // Accent
  --color-accent-primary: #b472ed;
  --color-accent-hover: #7e22ce;
  --color-accent-subtle: rgba(56, 139, 253, 0.1);

  // Status
  --color-success: #3fb950;
  --color-warning: #d29922;
  --color-danger: #f85149;

  // Tag
  --color-tag-bg: #21262d;
  --color-tag-text: #8b949e;

  // Shadow
  --shadow-card:
    0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--color-border-default);
  --shadow-input-focus: 0 0 0 3px rgba(56, 139, 253, 0.25);

  // Spacing
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;

  // Border radius
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  // Typography
  --font-sans:
    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-4xl: 2.5rem;

  // Transition
  --transition-fast: 120ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 350ms ease;
}

````

---

## Cache e Paginação

### Estratégia de cache (React Query)

| Query | staleTime | gcTime |
|---|---|---|
| Busca de usuários | 2 min | 5 min |
| Perfil do usuário | 5 min | 10 min |
| Repositórios | 5 min | 10 min |
| Repositório específico | 5 min | 10 min |

### Paginação

- **Busca de usuários** — `useInfiniteQuery` com `hasNextPage` calculado via `total_count` retornado pela API
- **Repositórios** — carrega até 100 itens em uma requisição; filtro e ordenação são feitos no front via `useMemo`

---

## Testes

### Unitários

Cobertura com Vitest + React Testing Library:

- Componentes de UI (renderização, interações, estados)
- Hooks customizados
- Funções utilitárias (sort, formatação)

### E2E

Os testes E2E usam fixtures locais para mockar todas as chamadas à API via `cy.mockGitHubApi()`, eliminando dependência de rede e rate limit.

Cobertura:

- **SearchPage** — estado inicial, resultados, lista vazia, erro de API, limpar busca, contador
- **UserPage** — dados do perfil, tabela de repositórios, filtro por nome, ordenação, navegação
- **RepositoryPage** — breadcrumb, stats, info cards, tópicos, clone URL, copiar, link externo, erro 404
- **Fluxo completo** — busca → perfil → repositório → perfil → busca

---
