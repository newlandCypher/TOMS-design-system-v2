import * as React from 'react';
import { cx } from './_internal/utils';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: InputSize;
  invalid?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** Wrapper className (input itself stays clean). */
  wrapperClassName?: string;
}

/**
 * Input — single-line text field. Supports `type="text" | "password" | "search" | "email" | ...`.
 * Wrap in `<Field>` for label + hint + error UI.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', invalid = false, prefix, suffix, disabled, wrapperClassName, className, ...rest },
  ref
) {
  return (
    <div
      className={cx(
        'tds-input',
        `tds-input--${size}`,
        invalid && 'tds-input--invalid',
        disabled && 'tds-input--disabled',
        wrapperClassName
      )}
    >
      {prefix && <span className="tds-input__addon tds-input__addon--prefix">{prefix}</span>}
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cx('tds-input__el', className)}
        {...rest}
      />
      {suffix && <span className="tds-input__addon tds-input__addon--suffix">{suffix}</span>}
    </div>
  );
});
