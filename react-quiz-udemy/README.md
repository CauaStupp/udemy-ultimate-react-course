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

---

Se quiser, eu posso:

- Adicionar badges (build / license / coverage).
- Gerar READMEs individuais para cada subprojeto automaticamente.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
