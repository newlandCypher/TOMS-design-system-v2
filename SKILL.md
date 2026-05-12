---
name: toms-design
description: Use this skill to generate well-branded interfaces and assets for TOMS — a B2B SaaS / 中后台 admin product for managing fleets of POS payment terminals — either for production or throwaway prototypes / mocks. Contains the canonical token system, Geist + Geist Mono type, brand assets, the `tds-*` component library + CSS, and a hi-fi recreation of the Terminal Manager product (six tabs + ⌘K palette).
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

The system has two layered surfaces:

1. **Canonical TDS** — `tokens/tokens.css` + `styles/components.css` + `components/*.tsx`. Use the `tds-*` class API and `--color-*` / `--space-*` / `--shadow-*` tokens. Reference at `ui_kits/component-showcase/`.
2. **Terminal Manager product skin** — `tm-*` variables in `ui_kits/terminal-manager/tokens.css` and bespoke React in `shell.jsx` / `cmdk.jsx` / `charts.jsx` / `tab-*.jsx`. Use this when recreating the actual TOMS product, not a generic surface.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. The fastest path is:

- Single-import surface: link `colors_and_type.css` from the project root. It pulls tokens + provides a flat semantic API (`--fg1`/`--bg1`/`.h1`/`.body`/`.mono`).
- For full components: also link `styles/components.css`. All `tds-*` classes will work.
- For brand: copy `assets/toms-logo.png` and `assets/toms-wordmark.png` next to your HTML.
- For icons: hand-write 24×24 stroke SVGs (1.5 stroke, round caps, currentColor) — match the `<Ico>` set in `ui_kits/terminal-manager/shell.jsx`. Do not use emoji or icon fonts.
- For data: render numbers, IDs, IMEI, hashes, timestamps in `var(--font-mono)` with `font-variant-numeric: tabular-nums`. Mono is the data voice.
- For tone: sentence case for body / card titles, Title Case for buttons + tab labels, ALL-CAPS small for overlines. Verb-first action labels. No emoji. Use `·` (middle dot) as the tight metadata separator and `→` only as a "view more" link suffix.

If working on production code, copy the `tokens/`, `styles/`, and `components/` folders into the host repo. Re-export from `components/index.ts`. Keep the `--color-*` / `--space-*` / `--shadow-*` token names intact — every component CSS rule references them.

The visual ground rules (do **not** violate without asking):

- One CTA per surface. Primary buttons use `--color-primary-700` (midnight indigo) with the signature `--shadow-cta` (inset white + 0.5px black edge + drop). Hover → 600, active → 800.
- The vivid accent (`--color-accent-*`) is reserved for chart strokes and the `✦` AI sparkle. **Never** use it for buttons.
- Cards: `bg-2` background · 1px subtle border · radius 10–16 · `--shadow-2`. Body padding 16/20/24/28.
- Pills are fully rounded with `tone-bg` background and `tone` foreground. Optional 5px tone dot.
- Tables: header row uppercase 11.5px tertiary, `letter-spacing: 0.06em`. Cells `padding: 16px 8px` (28px on first/last column). Numbers right-aligned, mono.
- Charts are hand-rolled SVG (see `ui_kits/terminal-manager/charts.jsx`) — Sparkline · AreaChart · BarPair · HBar · Heatmap · Donut · StackedBar. Stroke 1.4–1.5px, dashed grid lines, mono axis labels at 9.5px. **Never** import a chart library.
- Animation is conservative. Durations 80/120/200/320 ms. The only continuously-animating element in the product is the map-pin pulse.
- Backgrounds are flat. The only gradient is `--accent-gradient-soft`, used **once** behind the AI insight banner.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some clarifying questions about audience, density, and which surface (canonical TDS vs Terminal Manager product), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
