/* eslint-disable */
/* Babel-loaded mirror of design-system/components/*.tsx
   Same logic, types stripped. Used by the showcase only — production
   code consumes the .tsx files via a normal build. */

const cx = (...a) => a.filter(Boolean).join(' ');

/* ─── Button ───────────────────────────── */
const Button = React.forwardRef(function Button(
  { variant = 'secondary', size = 'md', loading, block, iconLeft, iconRight,
    disabled, className, children, type = 'button', ...rest }, ref) {
  const isDisabled = disabled || loading;
  return (
    <button ref={ref} type={type} disabled={isDisabled} aria-busy={loading || undefined}
      className={cx('tds-btn', `tds-btn--${variant}`, `tds-btn--${size}`,
                    block && 'tds-btn--block', className)} {...rest}>
      {loading ? <span className="tds-btn__spinner" aria-hidden /> : iconLeft}
      {children}
      {iconRight}
    </button>
  );
});

/* ─── Input ────────────────────────────── */
const Input = React.forwardRef(function Input(
  { size = 'md', invalid, prefix, suffix, disabled, wrapperClassName, className, ...rest }, ref) {
  return (
    <div className={cx('tds-input', `tds-input--${size}`,
                       invalid && 'tds-input--invalid',
                       disabled && 'tds-input--disabled', wrapperClassName)}>
      {prefix && <span className="tds-input__addon tds-input__addon--prefix">{prefix}</span>}
      <input ref={ref} disabled={disabled} aria-invalid={invalid || undefined}
             className={cx('tds-input__el', className)} {...rest} />
      {suffix && <span className="tds-input__addon tds-input__addon--suffix">{suffix}</span>}
    </div>
  );
});

/* ─── Select ───────────────────────────── */
const Select = ({ size = 'md', invalid, options, value, placeholder, onChange, disabled, className, ...rest }) => (
  <div className={cx('tds-select', `tds-select--${size}`,
                     invalid && 'tds-select--invalid',
                     disabled && 'tds-select--disabled', className)}>
    <select value={value} disabled={disabled} onChange={(e) => onChange?.(e.target.value)} {...rest}>
      {placeholder && <option value="" disabled hidden>{placeholder}</option>}
      {options.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
    </select>
    <svg className="tds-select__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

/* ─── Checkbox / Radio / Switch ───────── */
const Checkbox = React.forwardRef(function Checkbox({ label, indeterminate, className, ...rest }, fwd) {
  const r = React.useRef(null);
  React.useImperativeHandle(fwd, () => r.current);
  React.useEffect(() => { if (r.current) r.current.indeterminate = !!indeterminate; }, [indeterminate]);
  return (
    <label className={cx('tds-checkbox', className)}>
      <input ref={r} type="checkbox" {...rest} />
      <span className="tds-checkbox__box" aria-hidden>
        <svg className="tds-checkbox__check" viewBox="0 0 10 10" fill="none">
          {indeterminate
            ? <path d="M2 5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            : <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
});
const Radio = ({ label, className, ...rest }) => (
  <label className={cx('tds-radio', className)}>
    <input type="radio" {...rest} />
    <span className="tds-radio__box" aria-hidden><span className="tds-radio__dot" /></span>
    {label && <span>{label}</span>}
  </label>
);
const Switch = ({ checked, defaultChecked, onChange, disabled, ...aria }) => {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : internal;
  return (
    <button type="button" role="switch" aria-checked={value} disabled={disabled}
      className={cx('tds-switch', value && 'tds-switch--on')}
      onClick={() => { if (disabled) return; if (!isControlled) setInternal(!value); onChange?.(!value); }}
      {...aria} />
  );
};

/* ─── Field ─────────────────────────────── */
const Field = ({ label, hint, error, required, htmlFor, className, children }) => (
  <div className={cx('tds-field', className)}>
    {label && <label htmlFor={htmlFor}
      className={cx('tds-field__label', required && 'tds-field__label--required')}>{label}</label>}
    {children}
    {error ? <div className="tds-field__error" role="alert">{error}</div>
           : hint ? <div className="tds-field__hint">{hint}</div> : null}
  </div>
);

/* ─── Card / Badge ─────────────────────── */
const Card = ({ title, actions, footer, flush, className, children, ...rest }) => (
  <div className={cx('tds-card', className)} {...rest}>
    {(title || actions) && (
      <div className="tds-card__header">
        <div className="tds-card__title">{title}</div>
        {actions && <div>{actions}</div>}
      </div>
    )}
    <div className="tds-card__body" style={flush ? { padding: 0 } : undefined}>{children}</div>
    {footer && <div className="tds-card__footer">{footer}</div>}
  </div>
);
const Badge = ({ tone = 'neutral', className, ...rest }) => (
  <span className={cx('tds-badge', `tds-badge--${tone}`, className)} {...rest} />
);

/* ─── Tabs / Pagination / Table ────────── */
const Tabs = ({ items, value, onChange, className }) => (
  <div role="tablist" className={cx('tds-tabs', className)}>
    {items.map((it) => (
      <button key={it.key} role="tab" aria-selected={value === it.key} disabled={it.disabled}
        className={cx('tds-tab', value === it.key && 'tds-tab--active')}
        onClick={() => onChange(it.key)}>{it.label}</button>
    ))}
  </div>
);
const Pagination = ({ page, pageCount, onChange, siblingCount = 1 }) => {
  const pages = [];
  const start = Math.max(2, page - siblingCount);
  const end = Math.min(pageCount - 1, page + siblingCount);
  pages.push(1);
  if (start > 2) pages.push('…');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < pageCount - 1) pages.push('…');
  if (pageCount > 1) pages.push(pageCount);
  return (
    <nav className="tds-pagination" aria-label="Pagination">
      <button className="tds-pagination__page" disabled={page <= 1} onClick={() => onChange(page - 1)}>‹</button>
      {pages.map((p, i) => p === '…'
        ? <span key={`e${i}`} className="tds-pagination__page" aria-hidden>…</span>
        : <button key={p}
            className={cx('tds-pagination__page', p === page && 'tds-pagination__page--active')}
            onClick={() => onChange(p)}>{p}</button>)}
      <button className="tds-pagination__page" disabled={page >= pageCount} onClick={() => onChange(page + 1)}>›</button>
    </nav>
  );
};
const Table = ({ columns, rows, rowKey, sort, onSortChange, empty = 'No data' }) => {
  const handleSort = (col) => {
    if (!col.sortable || !onSortChange) return;
    if (!sort || sort.key !== col.key) onSortChange({ key: col.key, dir: 'asc' });
    else if (sort.dir === 'asc') onSortChange({ key: col.key, dir: 'desc' });
    else onSortChange(null);
  };
  return (
    <table className="tds-table">
      <thead><tr>{columns.map((c) => (
        <th key={c.key} style={{ width: c.width, textAlign: c.align ?? 'left' }}>
          {c.sortable
            ? <span className="tds-table__sort" onClick={() => handleSort(c)}>
                {c.title}
                <span style={{ opacity: sort?.key === c.key ? 1 : 0.3 }}>
                  {sort?.key === c.key && sort.dir === 'desc' ? '▼' : '▲'}
                </span>
              </span>
            : c.title}
        </th>))}</tr></thead>
      <tbody>
        {rows.length === 0
          ? <tr><td colSpan={columns.length} style={{ textAlign: 'center', padding: 32, color: 'var(--color-text-tertiary)' }}>{empty}</td></tr>
          : rows.map((r, i) => (
              <tr key={rowKey(r, i)}>
                {columns.map((c) => (
                  <td key={c.key} style={{ textAlign: c.align ?? 'left' }}>
                    {c.render ? c.render(r) : (c.field != null ? String(r[c.field] ?? '') : null)}
                  </td>
                ))}
              </tr>
            ))}
      </tbody>
    </table>
  );
};

/* ─── Modal / Toast / Tooltip ──────────── */
const Modal = ({ open, onClose, title, footer, width = 480, closeOnOverlay = true, children }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="tds-modal-overlay" onClick={() => closeOnOverlay && onClose()}
         role="dialog" aria-modal="true">
      <div className="tds-modal" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="tds-modal__header">
            <div className="tds-modal__title">{title}</div>
            <button onClick={onClose} aria-label="Close"
              className="tds-btn tds-btn--ghost tds-btn--sm"
              style={{ height: 28, width: 28, padding: 0 }}>✕</button>
          </div>
        )}
        <div className="tds-modal__body">{children}</div>
        {footer && <div className="tds-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};
const ToastContext = React.createContext(null);
const useToast = () => React.useContext(ToastContext);
const ToastProvider = ({ children }) => {
  const [items, setItems] = React.useState([]);
  const dismiss = React.useCallback((id) => setItems((xs) => xs.filter((x) => x.id !== id)), []);
  const push = React.useCallback((t) => {
    const id = t.id ?? Math.random().toString(36).slice(2);
    const tone = t.tone ?? 'info';
    setItems((xs) => [...xs, { ...t, id, tone }]);
    const dur = t.duration ?? 3500;
    if (dur > 0) setTimeout(() => dismiss(id), dur);
    return id;
  }, [dismiss]);
  const glyph = (t) => t === 'success' ? '✓' : t === 'error' ? '✕' : t === 'warning' ? '!' : 'i';
  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <div className="tds-toast-stack" role="region" aria-label="Notifications">
        {items.map((t) => (
          <div key={t.id} className={cx('tds-toast', `tds-toast--${t.tone}`)} role="status">
            <span className="tds-toast__icon" aria-hidden>{glyph(t.tone)}</span>
            <div className="tds-toast__body">
              {t.title && <div className="tds-toast__title">{t.title}</div>}
              {t.message && <div className="tds-toast__msg">{t.message}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
const Tooltip = ({ content, side = 'top', delay = 200, children }) => {
  const [visible, setVisible] = React.useState(false);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });
  const anchorRef = React.useRef(null);
  const timer = React.useRef();
  const measure = () => {
    const el = anchorRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const off = 6;
    let top = r.top, left = r.left + r.width / 2;
    if (side === 'top') top = r.top - off;
    if (side === 'bottom') top = r.bottom + off;
    if (side === 'left')  { top = r.top + r.height / 2; left = r.left - off; }
    if (side === 'right') { top = r.top + r.height / 2; left = r.right + off; }
    setPos({ top, left });
  };
  const show = () => { timer.current = setTimeout(() => { measure(); setVisible(true); }, delay); };
  const hide = () => { clearTimeout(timer.current); setVisible(false); };
  const transform = side === 'top' ? 'translate(-50%, -100%)'
                  : side === 'bottom' ? 'translate(-50%, 0)'
                  : side === 'left' ? 'translate(-100%, -50%)'
                  : 'translate(0, -50%)';
  return (
    <>
      {React.cloneElement(children, {
        ref: (n) => { anchorRef.current = n; },
        onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide,
      })}
      {visible && <div className="tds-tooltip" style={{ top: pos.top, left: pos.left, transform }} role="tooltip">{content}</div>}
    </>
  );
};

Object.assign(window, {
  cx, Button, Input, Select, Checkbox, Radio, Switch,
  Field, Card, Badge, Tabs, Pagination, Table,
  Modal, ToastContext, ToastProvider, useToast, Tooltip,
});
