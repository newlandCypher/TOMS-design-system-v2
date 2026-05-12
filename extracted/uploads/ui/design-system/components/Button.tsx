import * as React from 'react';
import { cx } from './_internal/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Visual style. Defaults to `secondary`. */
  variant?: ButtonVariant;
  /** Control height. Defaults to `md`. */
  size?: ButtonSize;
  /** Show a spinner and disable interaction. */
  loading?: boolean;
  /** Stretch to fill container width. */
  block?: boolean;
  /** Icon node rendered before label. */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after label. */
  iconRight?: React.ReactNode;
  /** Native HTML button type — default `button` to avoid accidental form submits. */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button — primary action surface.
 *
 * Variants
 * - `primary` — midnight indigo CTA. Use for the single most important action per view.
 * - `secondary` — neutral-bordered. Default for most actions.
 * - `ghost` — transparent. Toolbar / dense rows.
 * - `danger` — destructive (delete, factory reset). Always pair with confirmation.
 * - `link` — inline navigation. No padding, no background.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    loading = false,
    block = false,
    iconLeft,
    iconRight,
    disabled,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cx('tds-btn', `tds-btn--${variant}`, `tds-btn--${size}`, block && 'tds-btn--block', className)}
      {...rest}
    >
      {loading ? <span className="tds-btn__spinner" aria-hidden /> : iconLeft}
      {children}
      {iconRight}
    </button>
  );
});
