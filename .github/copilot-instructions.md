# Project Guidelines

## Code Style
- Stack: TypeScript + React function components with hooks (`src/App.tsx`, `src/main.tsx`).
- Match existing formatting: single quotes and no semicolons in TS/TSX files.
- Follow TypeScript + React best practices: avoid `any`, keep props/state strongly typed, use immutable state updates, and keep hook dependencies accurate.
- Naming patterns used in this repo:
  - `PascalCase` for components/types (`App`, `Player`, `Cell`)
  - `camelCase` for variables/functions (`checkWinner`, `handleTileClick`)
  - `UPPER_SNAKE_CASE` for constants (`WIN_LINES`)
- Prefer small pure helpers for game logic and early-return guard clauses (`src/App.tsx`).
- Keep TypeScript strictness in mind (`tsconfig.app.json`: `strict`, `noUnusedLocals`, `noUnusedParameters`).

## Architecture
- Single-page app mounted in `src/main.tsx` with `StrictMode`; no routing or backend.
- `src/App.tsx` owns all UI + game state:
  - Name entry screen (`gameStarted` false)
  - Tic-tac-toe board screen (`gameStarted` true)
- Data flow is local/unidirectional:
  - User action updates state (`setBoard`, `setIsXTurn`)
  - Derived state via `useMemo` (`winner`, `isDraw`)
  - Computer move runs from `useEffect` when `isComputerTurn` is true
- AI opponent uses minimax helpers in the same file (`minimax`, `getBestComputerMove`).

## Build and Test
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Preview production build: `npm run preview`
- No automated test script is currently configured in `package.json`.
- Runtime baseline from `README.md`: use Node.js `20.19+` or `22.12+` for Vite 7.

## Project Conventions
- Styling is primarily Tailwind utility classes directly in JSX (`src/App.tsx`).
- Tailwind v4 is enabled via:
  - Vite plugin in `vite.config.ts` (`tailwindcss()`)
  - Global import in `src/index.css` (`@import "tailwindcss";`)
- `src/App.css` exists but is not imported in `src/App.tsx`; follow current utility-first approach unless refactor is requested.
- Keep game behavior deterministic and synchronous except the intentional AI delay (`setTimeout` in `useEffect`).

## Integration Points
- Runtime dependencies: `react`, `react-dom`.
- Tooling: Vite, TypeScript, ESLint flat config, Tailwind.
- Lint setup lives in `eslint.config.js` (React hooks + React refresh + TS recommended presets).
- No external API/service integrations are present.

## Security
- No auth/session layer exists in current code.
- No network requests are implemented in app logic.
- Do not introduce secrets in source; if future config is needed, use env files and Vite env conventions.