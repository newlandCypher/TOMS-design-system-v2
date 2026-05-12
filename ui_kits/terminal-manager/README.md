# Terminal Manager

Hi-fi recreation of the **TOMS Terminal Manager** product — the back-office surface for managing a single POS terminal. This is the canonical product UI kit.

## Run

- `index.html` — default density (13px base, tighter padding).
- `index-spacious.html` — the executive variant (more breathing room).

Open either directly. Both are bundled standalone HTML files: React + Babel from `unpkg`, all JSX siblings loaded via `<script type="text/babel" src>`.

## Files

```
terminal-manager/
├── index.html            ← default density entry
├── index-spacious.html   ← spacious-density entry
├── tokens.css            ← tm-* / theme-* product-skin tokens
├── app.jsx               ← top-level app shell + state
├── shell.jsx             ← Sidebar · TopBar · Header · Tabs · <Ico/> icon set
├── cmdk.jsx              ← Cmd+K command palette (AI suggestions, jump-to, actions)
├── charts.jsx            ← Sparkline · AreaChart · BarPair · HBar · Heatmap · Donut · StackedBar
├── tab-overview.jsx      ← Overview tab (KPIs, map, AI insight)
├── tabs-rest.jsx         ← Basic Info · App & Firmware · Settings · Remote Assistance · Files
├── tab-overview-spacious.jsx
├── tabs-rest-spacious.jsx
├── design-canvas.jsx     ← (optional) the design-canvas wrapper, for side-by-side variants
├── tweaks-panel.jsx      ← (optional) tweaks toggle for live density swapping
└── assets/toms-logo.png
```

## Components recreated (extract these)

**Shell**
- `Sidebar` — fixed 220px, brand lockup + collapsible product nav + footer pills.
- `TopBar` — global search · ⌘K hint · sync timer · environment pill · admin avatar.
- `Header` — breadcrumb row → title row (terminal alias + serial + status pill + Push update / Refresh CTAs) → tab row (sticky underline).
- `Ico` — every icon in the product. Hand-written 24×24 stroke SVG paths in the `I` map.

**Overview tab**
- KPI tiles (Battery health donut, Transactions today + Sparkline, Data usage + StackedBar, Uptime BarPair).
- AI insight banner (the one place in the system where `--accent-gradient-soft` appears).
- Mini location map (SVG with pulsing pin).
- Recent activity timeline.

**Basic info tab**
- Identity grid (vendor / serial / IMEI / PCI version, all in mono, copy-able).
- Compliance audit pills.
- Cellular + WiFi cards with inline signal SVGs.
- Battery profile area chart.

**App & Firmware tab**
- Current vs available firmware hero (with size delta + downtime estimate).
- Application table (name · version · status pill · last update).

**Settings tab**
- Slider rows (brightness / volume).
- Connectivity toggle stack (Cellular · WiFi · GPS · VPN).
- Payment-module hardware shielding card.

**Remote assistance tab**
- Action grid (5 small action cards: lock · reboot · wipe · diagnostic · tunnel).
- Custom-command terminal (mono input + scrollback).

**Files tab**
- Task center (extract status table) + new-task modal.

**Cmd+K palette**
- AI-suggestion section (✦ sparkle + question prompts).
- Jump-to (terminals · stores · merchants).
- Actions on this terminal.
- Create section.

## Visual notes

- **Skin tokens**: this kit uses its own `tm-*` variables (in `tokens.css`) that mirror the canonical TDS but live alongside. Don't try to mix `tds-*` and `tm-*` styles.
- **Map**: the only animated element. The pin uses `<animate>` with `r 14;30;14` over `2.4s`.
- **Spacious variant**: same components, doubled padding + larger hero numbers. Toggle via `index-spacious.html`.
- **Density**: 13px base inside `.tm-root`. Avoid raising base font-size; instead, swap to the spacious variant.

## Data

All data is mocked inline. The shell models a single device:
`NL750 · Newland N910 Pro · MTL Store #4 · Acme Coffee` — alias `NL750-K9F2H7B3`.

## Caveats

- Lists outside the active tab (eg. the sidebar's "All terminals" route) are not implemented — the kit focuses on the single-terminal detail view.
- The Cmd+K palette has UI for sending commands but no real backend wiring.
