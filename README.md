# TOMS Design System

> Engineering-grade design system for **TOMS — Terminal Order Management System**, a B2B SaaS / 中后台 admin product for managing fleets of POS payment terminals (Newland, Verifone, etc.) deployed at merchants like Acme Coffee.
>
> Built around CSS-variable design tokens (light + dark, OKLCH), React + TypeScript components prefixed `tds-*`, and a `tm-*`-prefixed product skin used by the Terminal Manager app.

---

## What's in this folder

| Path                              | What it is                                                                  |
|-----------------------------------|-----------------------------------------------------------------------------|
| `README.md`                       | This file. Brand context · content + visual foundations · iconography · index. |
| `SKILL.md`                        | Cross-compatible skill manifest for using this system in Claude Code.       |
| `colors_and_type.css`             | Flat semantic API (`--fg1`, `--bg1`, `.h1`, `.body`, `.mono`, …). One-import surface. |
| `tokens/tokens.css`               | **Source of truth.** All primitive + semantic tokens; light + dark themes.  |
| `tokens/tokens.json`              | Machine-readable mirror (Style Dictionary / Figma).                         |
| `tokens/tailwind.preset.js`       | Tailwind v3 preset that resolves every token.                               |
| `styles/components.css`           | All `tds-*` component CSS. No hardcoded values; references tokens.          |
| `components/*.tsx`                | React + TS sources: Button, Input, Select, Toggles, Field, Card, DataDisplay, Feedback, Layout, plus `_internal/utils.ts`. |
| `docs/components.md`              | Per-component prop reference + usage.                                       |
| `docs/tokens.md`                  | Token reference (color · type · space · radius · shadow · z · motion).      |
| `assets/`                         | Logos (`toms-logo.png`, `toms-wordmark.png`).                               |
| `ui_kits/component-showcase/`     | Live tokens + components showcase (the canonical sandbox).                  |
| `ui_kits/terminal-manager/`       | Hi-fi recreation of the Terminal Detail product (six tabs + ⌘K palette).    |
| `preview/`                        | Card files registered for the Design System review tab.                     |

---

## Sources

This system was assembled from a single uploaded zip (`uploads/ui-1 (1).zip`) containing:

1. A canonical design system at `design-system/*` — tokens, components, docs, examples. Imported wholesale.
2. A live product implementation at `uploads/ui/*` (the **TOMS Terminal Manager** Cmd+K + Terminal Detail design canvas) — split across `app.jsx` / `shell.jsx` / `tab-overview*.jsx` / `tabs-rest*.jsx` / `cmdk.jsx` / `charts.jsx`. Imported as `ui_kits/terminal-manager/`.
3. Brand assets (`toms-logo.png`, `toms-wordmark.png`) and one operator avatar photo.

No Figma URL was provided; no live codebase was attached. All recreations are sourced from the actual JSX/TSX in the zip — not from screenshots.

---

## Product context

**TOMS** is a back-office tool used by ops admins (the persona in the shell is `Elena Costa · Admin`) to remotely manage a fleet of POS terminals. The flagship surface in this kit is **Terminal Detail** — a single device's home base — with six tabs:

| Tab                  | What it shows                                                                |
|----------------------|------------------------------------------------------------------------------|
| **Overview**         | Real-time KPIs: battery health donut, transactions today (sparkline), data usage, location map, uptime bar pair, recent activity. Includes an AI-insight banner. |
| **Basic Info**       | Identity / vendor / serial / PCI version, compliance audit pills, cellular + WiFi cards, battery profile chart. |
| **App & Firmware**   | Current vs. available firmware hero, OTA push, applications table with status pills. |
| **Settings**         | Brightness/volume sliders, connectivity toggles (Cellular · WiFi · GPS · VPN), payment-module hardware shielding. |
| **Remote Assistance**| Action grids for diagnostics + high-privilege ops, plus a custom-command terminal. |
| **Files**            | Task center for log/snapshot/diag extracts. |

Plus a global **⌘K command palette** with AI suggestions, Jump-to, Actions on this terminal, and Create.

The product is bilingual-aware (LTE, MTL, IMEI, etc. are western; the layout descends from a 中后台 lineage), data-dense but **calm-density** in this iteration ("Spacious" variants live alongside the originals).

---

## CONTENT FUNDAMENTALS — voice & copy

**Tone.** Quiet, technical, precise. Reads like a competent ops console, not a consumer product. Sentences are short and factual. Emotion is rare; numbers do the talking.

**Person.** Implicit second-person at most ("View plan →", "Push update"). Mostly third-person about the device ("This will disconnect 3 active sessions"). Never first-person plural ("we"); the system never refers to itself.

**Casing.**
- **Sentence case** for everything that isn't a button or a Page Title: card titles ("Battery health"), table column headers (uppercase letterspaced — see Visual Foundations), pill labels.
- **Title Case** for buttons + tab labels: `Push Command`, `App & Firmware`, `Remote Assistance`, `Push update`, `New extract task`. (The Terminal Manager mixes — `Push update` is sentence — but tab labels are Title Case across the product.)
- **ALL-CAPS small** for overlines + KPI eyebrows: `BATTERY HEALTH`, `CYCLES`, `CURRENT`, `AVAILABLE`. Always paired with `letter-spacing: 0.06em`.

**Numbers + units.**
- All numerals are **tabular** (`font-variant-numeric: tabular-nums`) and rendered in **mono** when they are data: `86%`, `1,043`, `4.21 GB`, `−67 dBm`, `±4m`. Mono is the data voice.
- Units are tertiary-color (`--fg3`), one size smaller than the number, baseline-aligned.
- Trends use up/down arrows + green/red: `↑ 8.4%`, `↓ 2.1%`. Never `+` / `−`.
- Coordinates / IDs / MAC / IMEI are mono and copy-able. Hashes shown as elided form: `SHA256 · 4f2a…cb19`.

**Status copy.**
- Single-word adjectives: `Online`, `Healthy`, `Connected`, `Running`, `Stopped`, `Ready`, `Locked`, `Disabled`. Never "is online" or "currently running".
- Reasons in 2–4 words: `LTE · Bell`, `5 GHz`, `office-5g`, `Acme Coffee · MTL Store #4`. Use `·` (middle dot) as the tight separator.

**Microcopy quirks.**
- Buttons + actions are **verb first**: `Push command`, `Refresh`, `Push update`, `Save as macro`, `Mark as lost`. Destructive actions stay literal — `Delete terminal`, `Shutdown`, `Send to repair`.
- AI/sparkle suggestions read like questions or imperatives: *"Why is NL750-K9F2H7B3 using more cellular data?"* / *"Push v4.3.0 to MTL Store #4 tonight at 02:00"*. They're full sentences, mid-length.
- Empty states + hints are clinical: *"42 MB differential · ~2 min downtime"*, *"Forecast ~218 MB tomorrow"*.
- The arrow `→` is used for "view more" links: `View plan →`, `View all →`. Single right-arrow only.

**Emoji + ornament.** Effectively none. The single ornament that recurs is `✦` (sparkle) on AI features — it appears in code as `Ico name="sparkle"` (an SVG, not a unicode glyph). Do not introduce new emoji.

---

## VISUAL FOUNDATIONS

**Color vibe.** Warm-neutral grays (yellow-tinted, not bluish) with a single deep midnight-indigo accent reserved for primary CTAs and one hot vibrant indigo→purple used only on AI sparkles + chart strokes. Surfaces are **near-white in light, oklch(15% 0.005 270) in dark** — neither is pure white/black. The mono brand color (`--color-brand-mono` ≈ oklch(22%) ) is darker than CTA — used on the logo lockup + initial avatars. Imagery is **cool/blueprint** when present (the location map uses pale `oklch(96% .01 240)` → `oklch(94% .015 220)` gradients with darker grid-lines). No grain, no warm filters.

**Backgrounds.** Flat. Cards are `--bg2` on a `--bg1` canvas; sidebars are `--bg3` (sunken, slightly darker than canvas). The only gradient in the system is `--accent-gradient-soft` — a 95° pale-indigo wash used **once**, behind the AI insight banner, at very low chroma. There are **no full-bleed images, no hand-drawn illustrations, no repeating patterns, no texture**. The map is a tiny SVG rendered inline.

**Type.** Geist (sans) + Geist Mono. 14px base body, 13px dense rows, 11–12px overlines. Mono carries every number, ID, code path, IMEI, hash, timestamp, and chart label. Headings are tight (`-0.01em`/`-0.02em`); body is mildly tight (`-0.005em`); mono is at zero. Weights are 400 / 500 / 600 — never 700 in product UI.

**Spacing.** Strict 4px grid via `--space-*`. Cards inside Terminal Detail breathe at `padding: 24px`; rows in tables at `16px 28px`; tab + breadcrumb rows at `9px 16px`. The "spacious" variants double card padding to 24/28; the originals run tighter at 16. **Gap between grid cards is 24px.** Never 8 or 32.

**Animation.** Conservative. Tokens: `--duration-instant 80ms`, `--duration-fast 120ms`, `--duration-normal 200ms`, `--duration-slow 320ms`. Easings `cubic-bezier(0.2, 0, 0, 1)` (standard) and `cubic-bezier(0.3, 0, 0, 1)` (emphasized — modal/switch entries). Nothing bounces. The only continuously-animating element is the **map pulse** (`<animate attributeName="r" values="14;30;14" dur="2.4s">`) and the loading-button spinner. All durations collapse to 0 under `prefers-reduced-motion`.

**Hover states.** Buttons darken one step (`--bg-hover`); links/ghosts get a `--bg-hover` background. Table rows go to `--bg-hover`. Action grid cards swap from `--bg-surface` to `--bg-hover` over `0.12s`. Never opacity-fade; always background-shift.

**Press / active states.** Buttons go to `--bg-active` (one step darker than hover). The CTA primary uses `--color-primary-800` on press. Inputs don't shrink; nothing scales.

**Focus.** Always a 3px focus ring: `--shadow-focus = 0 0 0 3px oklch(40% 0.14 262 / 0.25)`. In dark mode the ring brightens. Outline-only on text links.

**Borders.** Hairline, almost always `--border-subtle` (`oklch(93% 0.005 90)`). The default border (`--border-default`) is one step darker, used on inputs + popover edges. Cards in the Terminal Manager skin use `--border-subtle`; cards in the canonical TDS skin use `--border-default`. Border radius is small: `4 / 6 / 8 / 12 / 16`. Buttons + inputs round at `6px`. Cards round at `10–16px`. **Pills are fully rounded** (`9999`).

**Shadows.** 5 elevations + a special CTA inset.
- `--shadow-1`: hairline (1px / 4% black). Inputs at rest.
- `--shadow-2`: cards at rest (2px blur / 5%).
- `--shadow-3`: lifted card · popover (12px blur / 6%).
- `--shadow-4`: floating menu · toast (24px blur / 8%).
- `--shadow-5`: modal (48px blur / 12%).
- **`--shadow-cta`**: the signature midnight-indigo button shadow — `inset 0 1px 0 white/12%, 0 1px 2px black/25%, 0 0 0 0.5px black/40%`. The 0.5px black edge is what makes the dark CTA pop on a light surface without looking heavy.
- `--shadow-focus`: the 3px halo above. **Never use a 1–2px outline elsewhere.**

**Transparency + blur.** The Cmd+K overlay uses `oklch(15% 0.005 270 / 0.32)` + `backdropFilter: blur(2px)` — the only blur in the system. Modal scrims use `--color-bg-overlay` (45% black) without blur. Pills don't use opacity; status dots use `box-shadow: 0 0 0 3px <tone>/.25` for a pulse-glow effect.

**Layout rules.** Sidebar is **fixed 220px** (Terminal Manager) or **240px** (canonical TDS Layout). Header is a stacked unit: breadcrumb row (28px tall) → title row (~56px) → tab row (sticky bottom border). All product views render inside a single flex column. **Page content is a 12-column CSS grid** with `gap: 24px`. Common spans: `12 / 6+6 / 4+4+4 / 7+5 / 8+4`. Scroll is per-content-area, never page.

**Cards** = `bg-2` background · `1px subtle border` · `radius 10–16` · `shadow-2` (or no shadow on the lighter Terminal Manager cards). Header is a 11px–14px optional row with title (12.5–14px semibold) on the left, `hint` (11px tertiary) inline, and `action` slot right-aligned. Body padding is the prop-driven knob (16 / 20 / 24 / 28).

**Pills / badges.** Always rounded-full, 10.5–11px medium, `background: --tone-bg`, `color: --tone`. Optional 5px dot at left tinted to the tone. Never a colored border alone.

**Tables.** Header row is uppercase 11.5px tertiary with `letter-spacing: 0.06em`. Body rows separated by `--border-subtle`. Cells `padding: 16px 8px` (28px on first/last col). Numbers right-aligned in mono, status pills center-aligned. Hover row → `--bg-hover`.

**Charts.** Hand-rolled SVG (`charts.jsx`) — Sparkline / AreaChart / BarPair / HBar / Heatmap / Donut / StackedBar. Stroke `1.4–1.5px`, single accent color, dashed grid lines (`stroke-dasharray: 2 3`), mono axis labels at 9.5px. The donut shows the percentage in its center. **Never use a chart library; copy these.**

**Density.** Product runs at 13px base inside `.tm-root`; canonical system at 14px. The "Spacious" variants exist for executive views — they trade rows for breathing room.

---

## ICONOGRAPHY

The system ships with a **single hand-written SVG icon set** of ~50 glyphs, defined inline in `ui_kits/terminal-manager/shell.jsx` as the `I` map and rendered through `<Ico name="…" />`. Geometry rules:

- **24×24 viewBox**, single-color (`currentColor`), **stroke-based** (no filled icons except where geometry demands — battery cap, signal bars).
- **stroke-width: 1.5** at default, **1.7** when the icon is in an active sidebar row.
- **strokeLinecap: round, strokeLinejoin: round**.
- Sized 11–17px in product (12 for inline meta, 14 for menu rows, 15 for sidebar/header, 17 for app-table avatars).

The set covers nav (`home`, `device`, `store`, `card`, `ticket`, `settings`), I/O (`upload`, `download`, `refresh`, `power`, `lock`, `flash`), connectivity (`wifi`, `signal`, `battery`, `cpu`, `hdd`, `mod`, `globe`, `pin`, `thermometer`), feedback (`check`, `x`, `alert`, `info`), editing (`edit`, `copy`, `trash`, `history`, `more`, `plus`), search (`search`, `filter`, `chevd`, `chevr`, `chevl`, `arrowR`, `external`), platform (`shield`, `remote`, `command`, `app`, `doc`, `log`, `diag`), and the AI affordance (`sparkle`).

**Emoji.** Effectively never. The only place a unicode glyph is used as ornament is the `✦` in the AI suggestions section title — and even that is rendered as text inside a label, not as the icon itself.

**Unicode chars used as functional UI.**
- `↵` — Enter key affordance in Cmd+K.
- `↑↓` — keyboard navigation hints.
- `⌘`, `⇧` — modifier keys.
- `→` — "view more" link suffix.
- `·` — middle dot, the tight metadata separator.

**No icon font.** No Lucide / Heroicons / Material. **Always use the hand-written set in `shell.jsx`.** Adding new icons means adding a path entry to `I` and re-using `<Ico name="…" />` — same stroke-width and viewBox as the others.

For ad-hoc artifacts that don't load `shell.jsx`, the closest CDN match is **Lucide** (1.5px stroke, round caps, geometric). Substitute if necessary and **flag** the substitution.

**Logos.** `assets/toms-logo.png` (square mark, ~22×22 in product) and `assets/toms-wordmark.png` (mark + "TOMS" wordmark for marketing surfaces).

---

## INDEX (root manifest)

```
TOMS Design System/
├── README.md                       ← you are here
├── SKILL.md                        ← Agent-Skills front-matter
├── colors_and_type.css             ← single-import semantic surface
├── tokens/                         ← primitives (source of truth)
│   ├── tokens.css
│   ├── tokens.json
│   └── tailwind.preset.js
├── styles/components.css           ← tds-* component CSS
├── components/                     ← React + TS sources
│   ├── Button.tsx · Input.tsx · Select.tsx · Toggles.tsx
│   ├── Field.tsx · Card.tsx · DataDisplay.tsx · Feedback.tsx
│   ├── Layout.tsx · _internal/utils.ts · index.ts
├── docs/                           ← Markdown reference
│   ├── components.md
│   └── tokens.md
├── assets/                         ← brand
│   ├── toms-logo.png
│   └── toms-wordmark.png
├── ui_kits/
│   ├── component-showcase/         ← canonical TDS sandbox (tokens + components live)
│   │   ├── index.html
│   │   └── components.jsx
│   └── terminal-manager/           ← hi-fi product recreation (six tabs + ⌘K)
│       ├── index.html · index-spacious.html
│       ├── app.jsx · shell.jsx · cmdk.jsx · charts.jsx
│       ├── tab-overview.jsx · tabs-rest.jsx
│       ├── tab-overview-spacious.jsx · tabs-rest-spacious.jsx
│       ├── design-canvas.jsx · tweaks-panel.jsx
│       ├── tokens.css              ← product-skin variables (tm-* / theme-*)
│       └── assets/toms-logo.png
└── preview/                        ← Design System review cards (per-token / per-component)
```

---

## Caveats (read me)

- **Geist + Geist Mono** are pulled from Google Fonts via `@import` in `colors_and_type.css`. The original system referenced them as system-installed; I did not receive the .ttf files. If you have the variable-font files, drop them in `fonts/` and replace the `@import` with `@font-face`.
- **No Figma file** was attached; all components are sourced from real JSX/TSX. If a Figma definition exists, link it and I'll cross-check.
- **No marketing or docs site** existed in the upload — only the admin console product. I did not invent one.
- The **Terminal Manager** skin uses its own token set (`tm-*` vars, in `ui_kits/terminal-manager/tokens.css`) that mirrors but doesn't directly import the canonical `tds-*` system. Both reflect the same visual language; pick the surface that matches your context.
