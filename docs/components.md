# Component reference

Quick reference. Open the corresponding `.tsx` for full prop tables and JSDoc.

---

## Button

```tsx
<Button variant="primary" size="md" loading={false} block={false}
        iconLeft={…} iconRight={…} disabled={false} onClick={…}>Save</Button>
```

| Variant     | When                                                    |
|-------------|---------------------------------------------------------|
| `primary`   | The single most important action on a view.             |
| `secondary` | Default. Most actions.                                  |
| `ghost`     | Toolbar buttons, dense rows, inline actions.            |
| `danger`    | Destructive. Always pair with confirmation modal.       |
| `link`      | Inline navigation inside paragraphs.                    |

States: hover · active · `:focus-visible` · `disabled` · `loading` (spinner replaces `iconLeft`, sets `aria-busy`).

---

## Input

```tsx
<Input type="text" size="md" invalid={false} prefix={…} suffix={…}
       value={v} onChange={…} placeholder="…" />
```

Wrap in `<Field>` for label, hint, error. Use `type="password"` / `"search"` / `"email"` etc — all native types supported.

---

## Select

```tsx
<Select options={[{label,value,disabled?}]} value={v} onChange={(v) => …}
        size="md" placeholder="Pick one" invalid={false} />
```

Native `<select>` under custom chrome — keyboard, screen readers, mobile pickers all work.

---

## Checkbox / Radio / Switch

```tsx
<Checkbox label="Auto-update" checked={v} onChange={…} indeterminate={false} />
<Radio name="plan" value="pro" label="Pro" checked={…} onChange={…} />
<Switch checked={v} onChange={(v) => …} aria-label="Enable APN" />
```

`Switch` has no label slot by design — pair with a sibling label in a `<FieldRow>`-style layout. Always set `aria-label` or `aria-labelledby`.

---

## Field

```tsx
<Field label="Device name" hint="Up to 32 chars" error={err} required htmlFor="x">
  <Input id="x" />
</Field>
```

If `error` is set it replaces `hint`. Always pass `htmlFor` + matching `id` for screen readers.

---

## Card

```tsx
<Card title="Battery" actions={<Button variant="ghost" size="sm">Refresh</Button>}
      footer={<Button variant="link">View details</Button>}>
  …body…
</Card>
```

Pass `flush` to remove body padding (e.g. when embedding a `Table`).

---

## Badge

```tsx
<Badge tone="success">Online</Badge>
<Badge tone="warning">Battery low</Badge>
```

Tones: `neutral / success / warning / error / info`.

---

## Tabs

```tsx
<Tabs items={[{key:'overview',label:'Overview'}, {key:'settings',label:'Settings', disabled:true}]}
      value={tab} onChange={setTab} />
```

Controlled only — owns no state.

---

## Table

```tsx
<Table
  columns={[
    { key:'name', title:'Name', field:'name', sortable:true },
    { key:'status', title:'Status', render:(r) => <Badge tone={…}>{r.status}</Badge>, align:'center' },
  ]}
  rows={rows}
  rowKey={(r) => r.id}
  sort={sort}
  onSortChange={setSort}
  empty="No terminals match your filter"
/>
```

Sort is optional and controlled. Headers stick at top during scroll.

---

## Pagination

```tsx
<Pagination page={page} pageCount={Math.ceil(total / pageSize)} onChange={setPage} siblingCount={1} />
```

1-indexed.

---

## Modal

```tsx
const [open, setOpen] = useState(false);
<Modal open={open} onClose={() => setOpen(false)} title="Restart device" width={440}
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={confirm}>Restart</Button>
  </>}>
  This will disconnect 3 active sessions.
</Modal>
```

`Escape` closes. Overlay click closes (set `closeOnOverlay={false}` to disable).

---

## Toast

```tsx
// at app root
<ToastProvider>{children}</ToastProvider>

// anywhere inside
const { push, dismiss } = useToast();
push({ tone:'success', title:'Saved', message:'Applied to 3 terminals', duration:3500 });
```

`duration: 0` keeps it open until you call `dismiss(id)`.

---

## Tooltip

```tsx
<Tooltip content="Last sync 2 min ago" side="top" delay={250}>
  <Button variant="ghost">Sync</Button>
</Tooltip>
```

Wrap a single focusable child. Shows on hover and on keyboard focus.

---

## Popover

```tsx
const [open, setOpen] = useState(false);
<Popover open={open} onOpenChange={setOpen} side="bottom" align="end"
         trigger={<Button variant="ghost">···</Button>}>
  <MenuItem onClick={…}>Edit</MenuItem>
  <MenuItem onClick={…}>Delete</MenuItem>
</Popover>
```

Closes on outside click. You build the menu surface contents.

---

## Layout

```tsx
<Layout
  sidebar={<NavList />}
  header={<><Logo /><Search /><UserMenu /></>}
>
  <Tabs … />
  <Grid columns={12} gap="var(--space-6)">
    <GridItem span={8}><Card>…</Card></GridItem>
    <GridItem span={4}><Card>…</Card></GridItem>
  </Grid>
</Layout>
```

`Stack` for simple flex rows/columns: `<Stack direction="row" gap="var(--space-3)" align="center">`.

---

## Naming conventions

- All component class names are prefixed `tds-` (`tds-btn`, `tds-card`).
- Variant + size modifiers: `tds-btn--primary`, `tds-btn--md`.
- Element parts: `tds-card__header`, `tds-input__el`. (BEM)
- Don't write to `tds-*` classes from app code; pass `className` and let cascade win or use Tailwind alongside.
