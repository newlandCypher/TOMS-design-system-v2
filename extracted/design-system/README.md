# Acme Design System

> Engineering-grade design system for B-end SaaS / 中后台 products.
> **React + TypeScript** components driven entirely by **CSS-variable design tokens**.
> Light + dark themes built in. Tailwind-ready. Vue-portable.

---

## What's in the box

```
design-system/
├── tokens/
│   ├── tokens.css            ← single source of truth (CSS variables, light + dark)
│   ├── tokens.json           ← machine-readable mirror (Style Dictionary / Figma)
│   └── tailwind.preset.js    ← Tailwind v3+ preset that maps every token
├── styles/
│   └── components.css        ← component CSS — every value comes from tokens.css
├── components/               ← React + TypeScript source
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Toggles.tsx           ← Checkbox / Radio / Switch
│   ├── Field.tsx             ← Label + hint + error wrapper
│   ├── Card.tsx              ← Card + Badge
│   ├── DataDisplay.tsx       ← Tabs / Pagination / Table
│   ├── Feedback.tsx          ← Modal / Toast / Tooltip / Popover
│   └── Layout.tsx            ← Layout shell / Grid / Stack
├── docs/
│   ├── components.md         ← prop reference + usage
│   └── tokens.md             ← token reference
├── examples/
│   ├── showcase.html         ← live, browsable component showcase
│   └── components.jsx        ← Babel-loaded mirror used by the showcase
└── index.ts                  ← barrel export
```

---

## Install (in a host React app)

The system is consumed as a workspace package or path alias — treat it as `@acme/design-system`.

```bash
pnpm add react react-dom
```

```ts
// src/main.tsx — load tokens + component CSS once at app root
import '@acme/design-system/tokens/tokens.css';
import '@acme/design-system/styles/components.css';
```

```tsx
// any component
import { Button, Card, Field, Input, ToastProvider, useToast } from '@acme/design-system';
```

### Tailwind (optional)

```js
// tailwind.config.js
const acmePreset = require('@acme/design-system/tokens/tailwind.preset');
module.exports = {
  presets: [acmePreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

Now `bg-primary-700`, `text-text-secondary`, `shadow-cta`, `rounded-xl`, `gap-4`, `z-modal` all resolve to CSS variables and switch with the active theme automatically.

### Vue 3 (alt)

The CSS / tokens layer is framework-agnostic. Drop `tokens.css` + `components.css` into a Vue app and use the same class names (`tds-btn tds-btn--primary tds-btn--md`). Component logic in `components/*.tsx` ports directly: every component is a small, dependency-free function over native DOM. See `docs/components.md` for the props you'd port.

---

## Theming

```html
<html data-theme="light"> <!-- default -->
<html data-theme="dark">
```

Toggle at runtime:

```ts
document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
```

Every component reads CSS variables — no rebuild, no React state, no flash on toggle.

---

## Token philosophy (3 layers)

| Layer        | Example                              | When to use                                 |
|--------------|--------------------------------------|---------------------------------------------|
| **Primitive**| `--color-primary-700: oklch(...)`    | Inside the system only                      |
| **Semantic** | `--color-text-primary`               | **In application code (preferred)**         |
| **Component**| `--control-height-md: 36px`          | Internal sizing — don't override per call   |

**Rule:** application code references *semantic* tokens (`--color-text-primary`, `--space-4`), never primitives (`--color-primary-700`). Components reference component tokens for sizing.

---

## Component cheat-sheet

```tsx
// Buttons
<Button variant="primary" size="md" loading={saving}>Save</Button>
<Button variant="secondary" iconLeft={<PlusIcon />}>Add</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost" size="sm">Cancel</Button>

// Form
<Field label="Name" hint="Up to 32 characters" required htmlFor="n">
  <Input id="n" placeholder="acme-prod-04" />
</Field>

<Field label="Plan" error="Plan is required">
  <Select options={[{label:'Basic',value:'basic'},{label:'Pro',value:'pro'}]} value={plan} onChange={setPlan} />
</Field>

<Checkbox label="Auto-update" defaultChecked />
<Switch checked={enabled} onChange={setEnabled} aria-label="Auto-update" />

// Card / Data
<Card title="Storage" actions={<Button variant="ghost" size="sm">Refresh</Button>}>…</Card>
<Tabs items={[{key:'a',label:'Overview'},{key:'b',label:'Settings'}]} value={tab} onChange={setTab} />
<Table columns={cols} rows={rows} rowKey={r => r.id} sort={sort} onSortChange={setSort} />
<Pagination page={page} pageCount={20} onChange={setPage} />

// Feedback
<ToastProvider>{ /* app */ }</ToastProvider>
const { push } = useToast();
push({ tone: 'success', title: 'Saved', message: 'Changes applied.' });

<Modal open={open} onClose={close} title="Confirm restart"
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button>
            <Button variant="danger" onClick={confirm}>Restart</Button></>}>
  Restarting will disconnect 3 active sessions.
</Modal>

<Tooltip content="Last sync 2 min ago"><Button variant="ghost">Sync</Button></Tooltip>
```

---

## Component spec

| Component   | Variants                                     | Sizes      | States                                         |
|-------------|----------------------------------------------|------------|------------------------------------------------|
| Button      | primary / secondary / ghost / danger / link  | sm/md/lg   | hover · active · focus-visible · disabled · loading |
| Input       | text / password / search / email / number    | sm/md/lg   | hover · focus · invalid · disabled             |
| Select      | —                                            | sm/md/lg   | hover · focus · invalid · disabled             |
| Checkbox    | indeterminate                                | —          | checked · disabled · focus                     |
| Radio       | —                                            | —          | checked · disabled · focus                     |
| Switch      | —                                            | —          | on · off · disabled                            |
| Card        | flush body                                   | —          | —                                              |
| Badge       | neutral / success / warning / error / info   | —          | —                                              |
| Tabs        | —                                            | —          | active · disabled                              |
| Table       | sortable columns · sticky header             | —          | hover · empty                                  |
| Pagination  | —                                            | —          | active · disabled                              |
| Modal       | —                                            | width prop | open · closed                                  |
| Toast       | success / error / warning / info             | —          | enter · auto-dismiss                           |
| Tooltip     | top / bottom / left / right                  | —          | hover · focus                                  |
| Popover     | top / bottom × start / center / end          | —          | open · closed                                  |
| Layout      | sidebar + header                             | —          | —                                              |
| Grid · Stack| columns · direction props                    | —          | —                                              |

---

## Accessibility (built in)

- All interactive surfaces emit a visible `:focus-visible` ring (`--shadow-focus`).
- `Switch` uses `role="switch"` with `aria-checked`.
- `Modal` traps `Escape`, sets `role="dialog" aria-modal="true"`.
- `Toast` stack lives in `role="region" aria-label="Notifications"`.
- `Tooltip` triggers on hover **and** focus, anchored to a single focusable child.
- `Field` ties label → input via `htmlFor`; surfaces error in `role="alert"`.
- `prefers-reduced-motion: reduce` → all transitions collapse to 0ms.
- Default light + dark color combinations meet WCAG AA contrast.

---

## Live preview

Open `examples/showcase.html` in a browser — every token, every component, every state, light + dark side-by-side.

---

## Contributing tokens

1. Add the variable to `tokens/tokens.css` (both `:root` and `[data-theme="dark"]`).
2. Mirror in `tokens/tokens.json`.
3. Add to `tokens/tailwind.preset.js` if Tailwind needs it.
4. Document in `docs/tokens.md`.
5. **Never** hardcode a value in `components.css` or any `.tsx` — always reference `var(--…)`.

---

## Versioning

SemVer. Breaking token / API changes bump major. Adding new components or tokens is a minor.
