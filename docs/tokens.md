# Tokens reference

All values live in [`../tokens/tokens.css`](../tokens/tokens.css). This doc is the human index.

## Color

### Primary (CTA — midnight indigo)
| Token                  | Light                  | Dark                   | Use                          |
|------------------------|------------------------|------------------------|------------------------------|
| `--color-primary-50`   | very pale tint         | very dark tint         | tinted backgrounds           |
| `--color-primary-500`  | mid                    | mid                    | links, accents               |
| `--color-primary-700`  | **deep midnight**      | **light steel**        | **default CTA bg**           |
| `--color-primary-900`  | near-black indigo      | near-white indigo      | extreme emphasis             |

### Semantic
`--color-success-500` · `--color-warning-500` · `--color-error-500` · `--color-info-500`
Each has a `-50` (background) and `-700` (text-on-tint).

### Surfaces
| Token              | Role                                 |
|--------------------|--------------------------------------|
| `--color-bg-1`     | App background                       |
| `--color-bg-2`     | Card / surface                       |
| `--color-bg-3`     | Sunken / sidebar                     |
| `--color-bg-hover` | Hover state on neutral surfaces      |
| `--color-bg-active`| Active/pressed state                 |
| `--color-bg-overlay`| Modal scrim                          |

### Text
`--color-text-primary` (18% L) · `--color-text-secondary` (42% L) · `--color-text-tertiary` (58% L) · `--color-text-disabled` · `--color-text-inverse` · `--color-text-on-primary`

### Border
`--color-border-subtle` · `--color-border-default` · `--color-border-strong` · `--color-border-focus`

## Typography

```css
--font-family-sans: "Geist", "Inter", system-ui, …;
--font-family-mono: "Geist Mono", "JetBrains Mono", …;
```

| Size token        | Value | Usage                            |
|-------------------|-------|----------------------------------|
| `--font-size-xs`  | 12px  | Captions, badges                 |
| `--font-size-sm`  | 13px  | Dense labels                     |
| `--font-size-md`  | 14px  | **Body / form controls**         |
| `--font-size-lg`  | 16px  | Card titles                      |
| `--font-size-xl`  | 18px  | Modal titles, section heads      |
| `--font-size-2xl` | 22px  | Page subtitle                    |
| `--font-size-3xl` | 28px  | Page title                       |
| `--font-size-4xl` | 36px  | Hero KPI                         |
| `--font-size-5xl` | 48px  | Marketing                        |

Weights `regular(400) / medium(500) / semibold(600) / bold(700)` · line-heights `tight(1.2) / snug(1.35) / normal(1.5) / relaxed(1.7)` · letter-spacing `tight / normal / wide`.

## Spacing — 4px grid

`--space-0` (0) → `--space-20` (80px). Numeric tokens are the value in 4px units (`--space-4` = 16px).

Aliases for general use: `--space-xs · sm · md · lg · xl`.

## Radius

`none / sm(4) / md(6) / lg(8) / xl(12) / 2xl(16) / full`.
- `sm/md` — controls (buttons, inputs).
- `lg/xl` — cards, modals.
- `full` — pills, switches, avatars.

## Shadows — 5 elevations

| Token        | Use                                            |
|--------------|------------------------------------------------|
| `--shadow-1` | Hairline / pressed inputs                      |
| `--shadow-2` | Cards at rest                                  |
| `--shadow-3` | Lifted card / popover                          |
| `--shadow-4` | Floating menu / toast                          |
| `--shadow-5` | Modal                                          |
| `--shadow-cta`   | The midnight-indigo CTA's inset highlight + 0.5px black edge |
| `--shadow-focus` | 3px focus ring                              |

## Z-index

`base 0 · dropdown 1000 · sticky 1020 · overlay 1040 · modal 1050 · popover 1060 · tooltip 1070 · toast 1080 · cmdk 1090`

## Breakpoints

`xs 480 · sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536` (mirrored in Tailwind preset).

## Motion

`--duration-instant 80ms · fast 120ms · normal 200ms · slow 320ms`
Easings: `--easing-standard` for most, `--easing-emphasized` for entrance/exit.
All durations collapse to 0 under `prefers-reduced-motion: reduce`.
