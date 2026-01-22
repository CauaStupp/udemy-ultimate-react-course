# Ultimate React Course — Projetos

Repositório com os projetos do curso **Ultimate React Course** (Udemy). Cada pasta corresponde a um projeto ou parte do projeto principal — navegue pelos links abaixo para explorar o código.

## Estrutura do repositório

- **Projeto principal:** react-quiz-udemy
- **Pastas principais:**
  - [public](public/)
  - [src](src/)
  - [src/components](src/components/)
  - [src/Questions](src/Questions)
  - [src/Question](src/Question)
  - [src/StartQuiz](src/StartQuiz)
  - [src/Header](src/Header)
  - [src/Footer](src/Footer)
  - [src/Progress](src/Progress)
  - [src/reducers](src/reducers/)
  - [src/utils](src/utils/)
  - [src/@types](src/@types/)

Se você adicionar outros projetos no repositório, insira-os aqui como novas entradas com links diretos para as pastas.

## Como executar (local)

Pré-requisitos: Node.js (v16+ recomendado) e um gerenciador de pacotes (recomendo `pnpm`, há um `pnpm-lock.yaml` no projeto).

Instale dependências e rode em modo desenvolvimento:

```bash
pnpm install
pnpm dev
```

Outros scripts disponíveis (conforme `package.json`):

```bash
pnpm build    # cria build de produção
pnpm preview  # pré-visualiza o build gerado
pnpm lint     # roda o eslint
```

## Notas

- O projeto mostrado aqui é uma aplicação React + Vite em TypeScript.
- Para adicionar um novo projeto: crie uma pasta no root, adicione um README local explicando como executar e inclua um link nesta lista principal.

## Contribuições

- Pull requests e issues são bem-vindos. Para alterações maiores, abra uma issue primeiro para discutirmos.

# react-quiz-udemy

Aplicação de quiz desenvolvida durante o curso **Ultimate React Course** (Udemy). É uma SPA em React + TypeScript, construída com Vite.

Principais características

- Questões carregadas de `questions.json`
- Navegação entre perguntas, seleção de respostas e contagem de acertos
- Componentes organizados por responsabilidade (`Header`, `Question`, `Progress`, etc.)

Tecnologias

- React 19
- TypeScript
- Vite
- ESLint

Como rodar (dentro da pasta do projeto)

```bash
pnpm install
pnpm dev
```

Scripts úteis (definidos em `package.json`)

```bash
pnpm dev     # inicia o servidor de desenvolvimento (Vite)
pnpm build   # build de produção
pnpm preview # pré-visualiza o build
pnpm lint    # executa ESLint
```

Estrutura relevante

- `src/` — código-fonte
- `public/` — ativos públicos
- `src/components/` — componentes React
- `src/reducers/` — reducers usados na aplicação
- `src/questions.json` — arquivo com as perguntas usadas no quiz

Notas

- Se quiser, eu posso melhorar este `README.md` com descrições das principais rotas, arquitetura dos componentes e screenshots.
