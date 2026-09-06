# ARCHITECTURAL_PLAN.md — Calculator App (calculator-app-9lteq5N29)

## 1. Tech Stack
- Vite + React 18 + Tailwind CSS + Lucide Icons (per orchestrator spec). No TypeScript (JSX) to keep FEM starter simple; `npm run build` must exit 0.
- Fonts: `League Spartan:700` via Google Fonts link in `index.html`.
- No hardcoded colors in components — all via Tailwind theme tokens from DESIGN_SPECS.md.

## 2. Tailwind Theme Design
- `tailwind.config.js` extends `colors` with semantic tokens per theme using CSS variables:
  - Approach: `:root[data-theme='1'|'2'|'3']` defines `--bg-main`, `--bg-keypad`, `--bg-screen`, `--key-digit-bg`, `--key-digit-shadow`, `--key-accent-bg`, etc. Tailwind maps `bg-main` → `var(--bg-main)` etc. This gives instant 3-theme switching with zero class churn and satisfies "zero hardcoded colors".
  - Alternative (explicit `theme1-*` classes) rejected: verbose + error-prone across 3 themes.
- `boxShadow.key: 0 4px 0 var(--key-shadow)` variants; `borderRadius: xl 10px`; `fontFamily.spartan`.
- `darkMode: ['class', '[data-theme="1"]']` not needed — data-attribute driven.

## 3. Component Hierarchy (`src/`)
```
src/
  main.jsx          — entry, imports index.css
  App.jsx           — theme state, layout <main>, Header + Screen + Keypad + Footer
  index.css         — @tailwind + CSS vars for 3 themes + base body styles
  lib/calculator.js — pure reducer: input digit/dot/operator/equals/del/reset, formatting
  components/
    Header.jsx      — logo `calc` + ThemeSwitcher (radiogroup, 1/2/3)
    ThemeSwitcher.jsx — pill toggle, knob, aria-checked, arrow-key support
    Screen.jsx      — <section aria-live=polite> display, formatted value + expression preview
    Keypad.jsx      — 4-col grid, maps key defs to <Key>
    Key.jsx         — <button> variants: digit | secondary (DEL/RESET) | accent (=)
    Footer.jsx      — attribution
```

## 4. State Management
- `useReducer` in `App.jsx` for calculator: `{ current, previous, operator, overwrite }`.
- Actions: `ADD_DIGIT`, `ADD_DECIMAL`, `CHOOSE_OP`, `EQUALS`, `DELETE`, `RESET`.
- Float-safe eval: parse → operate → round to 10dp to avoid `0.1+0.2` drift; divide-by-zero → `Error`.
- Theme: `useState(1|2|3)` + `useEffect` syncing `document.documentElement.dataset.theme` + `localStorage`. Init: storage → `prefers-color-scheme` → default 1.
- No external store; keyboard listener in `App.jsx` via `useEffect`.

## 5. Accessibility
- Semantic: `<main>`, `<header>`, `<section aria-label="Calculator display">`, keypad `<div role="group" aria-label="Keypad">`.
- All keys real `<button>` with `aria-label` (e.g. `aria-label="Delete"`, `"Multiply"` for x).
- Screen: `aria-live="polite" role="status"`.
- Theme switcher: `role="radiogroup"` + 3 `role="radio" aria-checked`; arrow keys move; visible `:focus-visible` rings.
- Keyboard: digits, `+-*/`, `Enter/=`, `Backspace`, `Escape`; focus never trapped; contrast meets token pairs (yellow-on-purple, white-on-navy verified in audit).

## 6. Responsive (EXACT Figma metrics — §4 of DESIGN_SPECS.md)
- Container: `w-[327px] md:w-[540px]`, stack gap 24px both.
- Screen: `h-[88px] md:h-[128px] p-6 md:p-8 rounded-[10px]`,
  value `text-[40px] tracking-[-0.7px] md:text-[56px] md:tracking-[-1px]`.
- Keypad: `p-4 md:p-8 rounded-[10px]`, gaps `gap-4 md:gap-6`, `h-[420px] md:h-[480px]`.
- Digit keys: `h-16 w-[60px] md:w-[101px] rounded-[5px] md:rounded-[10px]`,
  `text-[32px] tracking-[-0.5px] md:text-[40px] md:tracking-[-0.7px]`.
- DEL/RESET/`=`: `text-[20px] tracking-[-0.3px] md:text-[28px] md:tracking-[-0.5px]`;
  RESET/`=` span 2 cols (`w-[136px] md:w-[226px]`).
- 3D edge: `shadow-[inset_0px_-4px_0px_0px_var(--key-shadow)]`; active:translate-y + shadow shrink.
- Hover/Active bg per DESIGN_SPECS.md §8b (digit→white / purple-700; DEL→navy-400/blue-400/purple-650; `=`→red-400/orange-400/cyan-200). Implement via `data-theme` CSS vars (`--key-digit-hover`, etc.), NOT per-key classes.
- Toggle: 68px column, track h 26px radius 13px, knob 16px — identical both breakpoints.

## 7. Build / QA Gates
- `npm run build` must pass with 0 errors. Self-audit vs DESIGN_SPECS.md tokens.
- Manual checks: all 3 themes pixel-compare to `/design/*.jpg`; keyboard-only run; `localStorage` persistence; `prefers-color-scheme` initial.

## 8. Delegation Plan
- Implementer (`agy-delegate`): scaffold Vite React in place (preserve `/design`, `/images`, `style-guide.md`), install `tailwindcss postcss autoprefixer lucide-react`, write files above. Must NOT commit.
- Reviewers (`opencode --read-only --model opencode/muse-spark-1.3-contributor-free`): logic review (calculator reducer edge cases) + UI review (tokens, a11y).
- DevOps (`agy-delegate`): GitHub + Vercel + README + FEM submit.
