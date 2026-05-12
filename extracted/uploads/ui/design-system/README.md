# TOMS Design System

> Engineering-grade design system for TOMS (Terminal Operations Management System) and adjacent B-end SaaS products.
> **React + TypeScript** components driven entirely by **CSS-variable design tokens**. Light + dark themes built in.

---

## What's in the box

```
design-system/
├── tokens/
│   ├── tokens.css            ← single source of truth (CSS variables, light + dark)
│   ├── tokens.json           ← machine-readable (for Style Dictionary, Figma sync, etc.)
│   └── tailwind.preset.js    ← Tailwind v3+ preset that maps every token
├── styles/
│   └── components.css        ← component CSS (uses tokens, no magic numbers)
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Toggles.tsx           ← Checkbox / Radio / Switch
│   ├── Field.tsx             ← label + hint + error wrapper
│   ├── Card.tsx              ← Card + Badge
│   ├── DataDisplay.tsx       ← Tabs / Pagination / Table
│   ├── Feedback.tsx          ← Modal / Toast / Tooltip / Popover
│   └── Layout.tsx            ← Layout shell / Grid / Stack
├── docs/
│   ├── components.md         ← prop reference + usage
│   └── tokens.md             ← token reference
├── examples/
│   └── showcase.html         ← live preview (open in browser)
└── index.ts                  ← barrel export
```

---

## Install (in a host React app)

The package is consumed via path alias / monorepo workspace; treat it as `@toms/design-system`.

```bash
# in the host app
pnpm add react react-dom
# tokens & components are imported directly:
```

```ts
// src/main.tsx
import '@toms/design-system/tokens/tokens.css';
import '@toms/design-system/styles/components.css';
```

```ts
// src/AnyComponent.tsx
import { Button, Card, Field, Input, ToastProvider, useToast } from '@toms/design-system';
```

### Tailwind (optional)

```js
// tailwind.config.js
const tomsPreset = require('@toms/design-system/tokens/tailwind.preset');
module.exports = {
  presets: [tomsPreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

Now `bg-primary-700`, `text-text-secondary`, `shadow-cta`, `rounded-xl`, `gap-4`, `z-modal` — all map to the same CSS variables and switch with the theme automatically.

---

## Theming

```html
<!-- light (default) -->
<html data-theme="light">

<!-- dark -->
<html data-theme="dark">
```

Toggle at runtime:
```ts
document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
```

Every component reads from CSS variables — no rebuild, no React state, no flash.

---

## Token philosophy

| Layer        | Example                              | When to use                                  |
|--------------|--------------------------------------|----------------------------------------------|
| **Primitive**| `--color-primary-700: oklch(...)`    | Inside the system only                       |
| **Semantic** | `--color-text-primary`               | In application code (preferred)              |
| **Component**| `--control-height-md: 36px`          | Internal sizing — don't override per-call    |

**Rule:** application code references *semantic* tokens (`--color-text-primary`, `--space-4`), never primitive tokens (`--color-primary-700`). Components reference component tokens.

---

## Component cheat-sheet

```tsx
// Buttons
<Button variant="primary" size="md" loading={saving}>Save</Button>
<Button variant="secondary" iconLeft={<Icon name="plus" />}>Add</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost" size="sm">Cancel</Button>

// Form
<Field label="Device name" hint="Up to 32 characters" required>
  <Input placeholder="TOMS-A29-04" />
</Field>

<Field label="Plan" error="Plan is required">
  <Select options={[{label:'Basic',value:'basic'}, {label:'Pro',value:'pro'}]} value={plan} onChange={setPlan} />
</Field>

<Checkbox label="Auto-update" defaultChecked />
<Switch checked={apnEnabled} onChange={setApn} aria-label="Enable APN" />

// Card
<Card title="Battery" actions={<Button variant="ghost" size="sm">Refresh</Button>}>
  …
</Card>

// Data
<Tabs items={[{key:'a',label:'Overview'},{key:'b',label:'Settings'}]} value={tab} onChange={setTab} />
<Table columns={cols} rows={rows} rowKey={(r) => r.id} sort={sort} onSortChange={setSort} />
<Pagination page={page} pageCount={20} onChange={setPage} />

// Feedback
<ToastProvider>{ /* app */ }</ToastProvider>
const { push } = useToast();
push({ tone: 'success', title: 'Saved', message: 'Configuration applied to 3 terminals.' });

<Modal open={open} onClose={close} title="Confirm restart"
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button>
            <Button variant="danger" onClick={confirm}>Restart</Button></>}>
  Restarting will disconnect 3 active sessions.
</Modal>

<Tooltip content="Last sync 2 min ago"><Button variant="ghost">Sync</Button></Tooltip>
```

---

## Component spec

Every component's JSDoc lists **variants · sizes · states · usage**. Open the `.tsx` for the canonical spec.

| Component   | Variants                                    | Sizes      | States                                    |
|-------------|---------------------------------------------|------------|-------------------------------------------|
| Button      | primary / secondary / ghost / danger / link | sm/md/lg   | hover · active · focus · disabled · loading |
| Input       | text / password / search / email / number   | sm/md/lg   | hover · focus · invalid · disabled         |
| Select      | —                                           | sm/md/lg   | hover · focus · invalid · disabled         |
| Checkbox    | indeterminate                               | —          | checked · disabled · focus                 |
| Radio       | —                                           | —          | checked · disabled · focus                 |
| Switch      | —                                           | —          | on · off · disabled                        |
| Card        | flush                                       | —          | —                                          |
| Badge       | neutral / success / warning / error / info  | —          | —                                          |
| Tabs        | —                                           | —          | active · disabled                          |
| Table       | sortable columns                            | —          | hover · empty                              |
| Pagination  | —                                           | —          | active · disabled                          |
| Modal       | —                                           | width prop | open · closed                              |
| Toast       | success / error / warning / info            | —          | enter · auto-dismiss                       |
| Tooltip     | top / bottom / left / right                 | —          | hover · focus                              |
| Popover     | top / bottom × start / center / end         | —          | open · closed                              |
| Layout      | sidebar + header                            | —          | —                                          |
| Grid        | columns prop                                | —          | —                                          |

---

## Accessibility checklist

- All interactive components emit a visible `:focus-visible` ring (`--shadow-focus`).
- `Switch` uses `role="switch"` with `aria-checked`.
- `Modal` traps `Escape`, sets `role="dialog" aria-modal="true"`.
- `Toast` stack lives in a `role="region" aria-label="Notifications"` landmark.
- `Tooltip` is anchored to a single focusable child; appears on hover **and** focus.
- `Field` ties label → input via `htmlFor` and surfaces errors in `role="alert"`.
- Reduced-motion preference disables transitions globally.
- All color combinations meet WCAG AA at default theme; verify when adding new combos.

---

## Contributing tokens

1. Add the variable to `tokens/tokens.css` (both light + dark blocks).
2. Mirror in `tokens/tokens.json`.
3. If it should be Tailwind-accessible, add it to `tokens/tailwind.preset.js`.
4. Document in `docs/tokens.md`.

**Never** hardcode a value in `components.css` or any `.tsx` — always reference `var(--…)`.

---

## Live preview

Open `examples/showcase.html` in a browser (or via the project preview) — every component, every state, light + dark side-by-side.

---

## Versioning

Semver. Breaking token / API changes bump major. Adding components or tokens is a minor.
