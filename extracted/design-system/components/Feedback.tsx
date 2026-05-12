import * as React from 'react';
import { cx } from './_internal/utils';

/* ═══════════════ Modal ═══════════════ */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  /** Close on overlay click. Default true. */
  closeOnOverlay?: boolean;
  children?: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ open, onClose, title, footer, width = 480, closeOnOverlay = true, children }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="tds-modal-overlay" onClick={() => closeOnOverlay && onClose()} role="dialog" aria-modal="true">
      <div className="tds-modal" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="tds-modal__header">
            <div className="tds-modal__title">{title}</div>
            <button onClick={onClose} aria-label="Close" className="tds-btn tds-btn--ghost tds-btn--sm" style={{ height: 28, width: 28, padding: 0 }}>✕</button>
          </div>
        )}
        <div className="tds-modal__body">{children}</div>
        {footer && <div className="tds-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

/* ═══════════════ Toast ═══════════════ */
export type ToastTone = 'success' | 'error' | 'warning' | 'info';
export interface ToastInput { id?: string; tone?: ToastTone; title?: React.ReactNode; message?: React.ReactNode; duration?: number; }
interface ToastInternal extends ToastInput { id: string; tone: ToastTone; }

interface ToastCtx { push: (t: ToastInput) => string; dismiss: (id: string) => void; }
const ToastContext = React.createContext<ToastCtx | null>(null);

export const useToast = () => {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = React.useState<ToastInternal[]>([]);
  const dismiss = React.useCallback((id: string) => setItems((xs) => xs.filter((x) => x.id !== id)), []);
  const push = React.useCallback((t: ToastInput) => {
    const id = t.id ?? Math.random().toString(36).slice(2);
    const tone = t.tone ?? 'info';
    setItems((xs) => [...xs, { ...t, id, tone }]);
    const dur = t.duration ?? 3500;
    if (dur > 0) setTimeout(() => dismiss(id), dur);
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <div className="tds-toast-stack" role="region" aria-label="Notifications">
        {items.map((t) => (
          <div key={t.id} className={cx('tds-toast', `tds-toast--${t.tone}`)} role="status">
            <span className="tds-toast__icon" aria-hidden>{toneGlyph(t.tone)}</span>
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
function toneGlyph(t: ToastTone) {
  switch (t) {
    case 'success': return '✓';
    case 'error':   return '✕';
    case 'warning': return '!';
    default:        return 'i';
  }
}

/* ═══════════════ Tooltip ═══════════════ */
export interface TooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactElement;
}
/** Tooltip — hover/focus-triggered transient label. Wrap a single focusable child. */
export const Tooltip: React.FC<TooltipProps> = ({ content, side = 'top', delay = 250, children }) => {
  const [visible, setVisible] = React.useState(false);
  const [pos, setPos] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const anchorRef = React.useRef<HTMLElement | null>(null);
  const timer = React.useRef<number | undefined>();

  const measure = React.useCallback(() => {
    const el = anchorRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const offset = 6;
    let top = r.top, left = r.left + r.width / 2;
    if (side === 'top') top = r.top - offset;
    if (side === 'bottom') top = r.bottom + offset;
    if (side === 'left')  { top = r.top + r.height / 2; left = r.left - offset; }
    if (side === 'right') { top = r.top + r.height / 2; left = r.right + offset; }
    setPos({ top, left });
  }, [side]);

  const show = () => { timer.current = window.setTimeout(() => { measure(); setVisible(true); }, delay); };
  const hide = () => { window.clearTimeout(timer.current); setVisible(false); };

  const child = React.cloneElement(children, {
    ref: (n: HTMLElement) => { anchorRef.current = n; },
    onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide,
  });
  const transform = side === 'top' ? 'translate(-50%, -100%)'
                  : side === 'bottom' ? 'translate(-50%, 0)'
                  : side === 'left' ? 'translate(-100%, -50%)'
                  : 'translate(0, -50%)';
  return (
    <>
      {child}
      {visible && (
        <div className="tds-tooltip" style={{ top: pos.top, left: pos.left, transform }} role="tooltip">{content}</div>
      )}
    </>
  );
};

/* ═══════════════ Popover ═══════════════ */
export interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactElement;
  children: React.ReactNode;
  side?: 'bottom' | 'top';
  align?: 'start' | 'center' | 'end';
}
export const Popover: React.FC<PopoverProps> = ({ open, onOpenChange, trigger, children, side = 'bottom', align = 'start' }) => {
  const anchorRef = React.useRef<HTMLElement | null>(null);
  const popRef = React.useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });

  React.useEffect(() => {
    if (!open) return;
    const measure = () => {
      const el = anchorRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      let top = side === 'bottom' ? r.bottom + 4 : r.top - 4;
      let left = align === 'start' ? r.left : align === 'center' ? r.left + r.width / 2 : r.right;
      setPos({ top, left });
    };
    measure();
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
    };
  }, [open, side, align]);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (popRef.current?.contains(t) || anchorRef.current?.contains(t)) return;
      onOpenChange(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open, onOpenChange]);

  const transform = side === 'top'
    ? (align === 'center' ? 'translate(-50%, -100%)' : align === 'end' ? 'translate(-100%, -100%)' : 'translate(0, -100%)')
    : (align === 'center' ? 'translate(-50%, 0)' : align === 'end' ? 'translate(-100%, 0)' : 'translate(0, 0)');

  const triggerWithRef = React.cloneElement(trigger, {
    ref: (n: HTMLElement) => { anchorRef.current = n; },
    onClick: (e: React.MouseEvent) => { trigger.props.onClick?.(e); onOpenChange(!open); },
  });

  return (
    <>
      {triggerWithRef}
      {open && (
        <div ref={popRef} className="tds-popover" style={{ top: pos.top, left: pos.left, transform }} role="dialog">
          {children}
        </div>
      )}
    </>
  );
};
