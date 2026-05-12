# Component Showcase

Live sandbox of every TDS component, rendered against the canonical token set. Lives at `ui_kits/component-showcase/index.html`.

The showcase is the canonical reference: when in doubt, copy from here. Every component is rendered in default + variant states, alongside the `tokens.css` values it uses.

Files
- `index.html` — full-page demo (sidebar nav + sections per component category).
- `components.jsx` — the demo's React app. Uses tokens via classnames; no inline tokens.
- `assets/toms-logo.png` — brand mark used in the demo header.

Sections (anchors in the sidebar)
1. **Foundations** — color, typography, spacing/radius/shadow tokens.
2. **Buttons** — Primary · Secondary · Ghost · Danger · Link · sizes · loading · with icon.
3. **Inputs** — text · select · textarea · with prefix/suffix · error · disabled.
4. **Toggles** — checkbox · radio · switch.
5. **Card** — header / body / footer combinations.
6. **Badges** — neutral / success / warning / error / info.
7. **Tabs** — with counts, with icons.
8. **Feedback** — toast · modal · tooltip · popover.
9. **Data Display** — table · pagination · empty state.

Loading
The showcase loads `../../tokens/tokens.css` and `../../styles/components.css` directly — no build step. React + Babel are CDN'd from `unpkg`.
