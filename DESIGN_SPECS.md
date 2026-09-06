# DESIGN_SPECS.md — Calculator App (calculator-app-9lteq5N29)

Source: Figma Desktop local MCP (`http://127.0.0.1:3845/mcp`) — extracted live via
`get_metadata` + `get_design_context` + `get_variable_defs`. VERIFIED, not inferred.
Challenge: https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29
Figma pages: `0:1 Overview`, `2:2 Design System`, `1:3 Designs`.
Screens (Designs page): Mobile T1 `68139:144` / T2 `68139:73` / T3 `68139:2` (375×667),
Tablet T1 `40139:133`, Desktop T1 `68139:653` / T2 `68139:581` / T3 `68139:509` (1440 wide),
Active variants `68139:411` / `68139:313` / `68139:215`.

## 1. Breakpoints / Screens
- Mobile: 375px (`mobile-design-theme-*.jpg`)
- Desktop: 1440px (`desktop-design-theme-*.jpg`)
- Active states: `active-states-theme-*.jpg`
- Calc max-width: ~540px centered. Responsive 320px → large screens (WCAG).
- Keypad: 4-col grid; screen on top; header row (logo left, theme switcher right).

## 2. Typography
- Family: `League Spartan`, weights: 700 only. Google Fonts.
- Numbers (screen + keys): 32px, weight 700. Spec allows 40px screen on desktop if Figma shows larger — confirm in Figma.
- Header logo: ~28-32px bold lowercase `calc`. Theme label: 12px uppercase letter-spacing.
- Keys: 32px (numbers), 20px DEL/RESET/= (uppercase).

## 3. Design Tokens (exact HSL — use verbatim in Tailwind theme)

### Theme 1 (default, dark navy)
Backgrounds:
- `navy-850` main: `hsl(222, 26%, 31%)`
- `navy-900` toggle/keypad bg: `hsl(223, 31%, 20%)`
- `navy-950` screen bg: `hsl(224, 36%, 15%)`
Keys:
- `navy-700` key bg: `hsl(225, 21%, 49%)` / shadow `navy-800`: `hsl(224, 28%, 35%)`
- `red-600` equals/toggle knob: `hsl(6, 63%, 50%)` / shadow `red-800`: `hsl(6, 70%, 34%)`
- `gray-200` digit key bg: `hsl(0, 0%, 90%)` / shadow `gray-orange-400`: `hsl(28, 16%, 65%)`
Text:
- `navy-750` on light keys: `hsl(221, 14%, 31%)`
- white: `hsl(0, 100%, 100%)`

### Theme 2 (light gray)
Backgrounds:
- main: `hsl(0, 0%, 90%)`
- toggle/keypad: `hsl(0, 5%, 81%)`
- screen: `hsl(0, 0%, 93%)`
Keys:
- `blue-500`: `hsl(185, 42%, 37%)` / shadow `blue-600`: `hsl(185, 58%, 25%)` (DEL/RESET)
- `orange-700`: `hsl(25, 98%, 40%)` / shadow `orange-800`: `hsl(25, 99%, 27%)` (equals/toggle)
- digit bg `hsl(0, 0%, 90%)` (same as gray-200) / shadow `hsl(35, 11%, 61%)`
Text:
- `gray-900`: `hsl(60, 10%, 19%)`
- white: `hsl(0, 100%, 100%)`

### Theme 3 (purple neon)
Backgrounds:
- main `purple-950`: `hsl(268, 75%, 9%)`
- toggle/keypad/screen `purple-900`: `hsl(268, 71%, 12%)`
Keys:
- `purple-800`: `hsl(281, 89%, 26%)` / shadow `purple-400`: `hsl(285, 91%, 52%)` (DEL/RESET)
- `cyan-500`: `hsl(176, 100%, 44%)` / shadow `cyan-400`: `hsl(177, 92%, 70%)` (equals/toggle)
- digit `purple-850`: `hsl(268, 47%, 21%)` / shadow `purple-750`: `hsl(290, 70%, 36%)`
Text:
- `yellow-300`: `hsl(52, 100%, 62%)`
- `blue-950`: `hsl(198, 20%, 13%)` (on cyan equals key)
- white: `hsl(0, 100%, 100%)`

## 4. Geometry — EXACT FIGMA VALUES (do not use style-guide guesses)

### Desktop (1440px, container 540px, stack gap 24px)
- Header: `calc` 32px/Bold/tracking -0.5px, white. THEME label 12px/tracking +1px.
  Toggle track: bg navy-900, h 26px, full-width 68px column, radius 13px, padding 8px; knob 16px oval.
- Screen: bg `#181f33`, h 128px, padding 32px, radius 10px, right-aligned;
  value 56px/Bold/tracking -1px (Preset 1), e.g. `399,981`.
- Keypad: bg `#242d44`, h 480px, padding 32px, radius 10px; rows gap 24px, keys gap 24px.
- Digit keys: 101×64px, radius 10px, bg `#e6e6e6`, text 40px/tracking -0.7px `#434a59`,
  3D edge `shadow: inset 0 -4px 0 #b3a497`.
- DEL: 101×64px, text 28px/tracking -0.5px white, bg `#647198`, shadow `#414e73`.
- RESET: 226×64px, text 28px white, bg `#647198`, shadow `#414e73`.
- `=`: 226×64px, text 28px white, bg `#d03f2f`, shadow `#93261a`.

### Mobile (375px, container 327px, stack gap 24px)
- Header identical to desktop (32px logo, same toggle 68px column).
- Screen: h 88px, padding 24px, radius 10px; value 40px/tracking -0.7px.
- Keypad: h 420px, padding 16px, radius 10px; all gaps 16px.
- Digit keys: 60×64px, radius 5px (!), text 32px/tracking -0.5px; same bg/shadow.
- DEL: 60×64px, radius 5px, text 20px/tracking -0.3px (verify: same navy-700 scheme).
- RESET / `=`: 136×64px, radius 5px, text 20px/tracking -0.3px.

### Shared
- Spacing scale: 0 / 8 / 16 / 24 / 32 (`spacing/0…400`).
- Key 3D edge is ALWAYS `inset 0 -4px 0 <shadow>`; radius 10px desktop / 5px mobile.
- Type scale (all League Spartan 700, line-height 100%):
  P1 56px/-1px display-desktop · P2 40px/-0.7px keys-desktop/display-mobile ·
  P3 32px/-0.5px logo/keys-mobile · P4 28px/-0.5px DEL/RESET/`=`-desktop ·
  20px/-0.3px DEL/RESET/`=`-mobile · 12px/+1px THEME labels.
- NOTE: style-guide.md says "numbers 32px" — Figma overrides: 56/40/32 by context.

## 5. Key Layout (4x5 grid)
Row1: 7 8 9 DEL | Row2: 4 5 6 + | Row3: 1 2 3 - | Row4: . 0 / x | Row5: RESET (span2) = (span2)
DEL/RESET styled secondary; `=` styled accent (red/orange/cyan per theme).

## 6. Behavior
- Chained operations (+ − × ÷), decimal guard (single dot per operand), DEL backspace, RESET clear.
- Division by zero → display `Error`, recoverable on next input.
- Live formatting: thousand separators on display; max display length guard (~12 chars).
- Keyboard: `0-9 . + - * / Enter(=) Backspace(DEL) Escape(RESET)`; visible focus rings.
- Theme: 3-way switch, persisted `localStorage['calc-theme']`, initial from storage else `prefers-color-scheme` (dark→T1, light→T2) — bonus requirement.

## 8. Canonical HEX TOKENS (from `get_variable_defs` + design context)

Theme 1: `navy-850 #3a4663` · `navy-900 #242d44` · `navy-950 #181f33` ·
`navy-700 #647198` · `navy-750 #434a59` · `red-600 #d03f2f` ·
`gray-200 #e6e6e6` · white `#ffffff` ·
shadows: digit `#b3a497` · DEL/RESET `#414e73` · `=` `#93261a`.
Theme 2: `gray-900 #36362c` (digit text) · `gray-300 #d2cdcd` (keypad bg) ·
`gray-100 #eeeeee` (screen bg) · `gray-200 #e6e6e6` · `blue-500 #378187` (DEL/RESET) ·
`orange-700 #c85402` (`=` bg) · white `#ffffff` ·
shadows: digit `#a79e91` · DEL/RESET `#1b6066` · `=` `#873901`.
Theme 3: `purple-950 #17062a` (main) · `purple-900 #1e0936` (screen/keypad) ·
`purple-850 #331c4d` (digit bg) · `yellow-300 #ffe53d` (digit/screen text) ·
`purple-800 #56077c` (DEL/RESET) · `cyan-500 #00ded0` (`=` bg) ·
`blue-950 #1a2327` (`=` text) · white `#ffffff` ·
shadows: digit `#881c9e` · DEL/RESET `#be15f4` · `=` `#6cf9f1`.

### 8b. BUTTON COMPONENT — authoritative variant matrix (DS node `68145:171`, 18 variants)
Type 1 = digit keys (101×64 desktop, 60×64 mobile) · Type 2 = DEL/RESET ·
Type 3 = `=` (226×64 desktop, 136×64 mobile). 3D edge always `inset 0 -4px 0 <shadow>`.
| Variant | Default bg | Hover/Active bg | Text (desktop 40/28px) | Shadow |
|---|---|---|---|---|
| T1-T1 digit | `gray-200 #e6e6e6` | white `#ffffff` | `navy-750 #434a59` | `#b3a497` |
| T1-T2 DEL/RESET | `navy-700 #647198` | `navy-400 #a2b2e1` | white | `#414e73` |
| T1-T3 `=` | `red-600 #d03f2f` | `red-400 #f96b5b` | white | `#93261a` |
| T2-T1 digit | `gray-200 #e6e6e6` | white `#ffffff` | `gray-900 #36362c` | `#a79e91` |
| T2-T2 DEL/RESET | `blue-500 #378187` | `blue-400 #62b5bc` | white | `#1b6066` |
| T2-T3 `=` | `orange-700 #c85402` | `orange-400 #ff8a38` | white | `#873901` |
| T3-T1 digit | `purple-850 #331c4d` | `purple-700 #6c34ac` | `yellow-300 #ffe53d` | `#881c9e` |
| T3-T2 DEL/RESET | `purple-800 #56077c` | `purple-650 #8631af` | white | `#be15f4` |
| T3-T3 `=` | `cyan-500 #00ded0` | `cyan-200 #93fff8` | `blue-950 #1a2327` | `#6cf9f1` |
Verified on Active screens `68139:411` (T1: DEL→`#a2b2e1`, `=`→`#f96b5b`),
`68139:313` (T2: →`#62b5bc` / →`#ff8a38`), `68139:215` (T3: digits→`#8631af`/`#6c34ac`, `=`→`#93fff8`).
QUIRK: Mobile-T3 `=` text uses `navy-950 #181f33`, Desktop-T3 `=` text uses
`blue-950 #1a2327` — visually identical; implement with `#1a2327` (Button component canonical).

## 9. Figma Coverage Log — 100% (all pages, all screens, DS, components)
Extracted 2026-09-06 via local MCP session, `excludeScreenshot` where noted.
- Page `0:1 Overview` → single `Overview` frame: cover art (laptop mockup + 3 cards). No app tokens. ✅
- Page `2:2 Design System` → `Spacing` (scale 0/8/16/24/32 confirmed) ✅ ·
  `Typography` (6 presets, see §4 Shared) ✅ ·
  `Colors` (`22:124`, 30 hexes; doc chrome `#133041/#6b94a8` excluded, rest mapped incl. `/400` + `cyan/200` hover scale) ✅ ·
  `Button` (`68145:171`, full 18-variant matrix in §8b) ✅.
- Page `2:3 Prototype` → EMPTY canvas, nothing to review. ✅
- Page `1:3 Designs`, all 10 screens:
  Mobile T1 `68139:144` full ctx ✅ · Mobile T2 `68139:73` full ctx ✅ ·
  Mobile T3 `68139:2` hex-verified (same set as desktop) ✅ ·
  Tablet T1 `40139:133` (= desktop 540px metrics) ✅ ·
  Desktop T1 `68139:653` / T2 `68139:581` / T3 `68139:509` full ctx ✅ ·
  Active T1 `68139:411` / T2 `68139:313` / T3 `68139:215` hover mapping ✅.
Remaining: Tablet T1 follows desktop metrics at 768px container; Active variants reuse same tokens.
