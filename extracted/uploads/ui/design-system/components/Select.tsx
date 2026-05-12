import * as React from 'react';
import { cx } from './_internal/utils';

export interface SelectOption<V extends string | number = string> {
  label: string;
  value: V;
  disabled?: boolean;
}

export interface SelectProps<V extends string | number = string>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange' | 'value'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  options: SelectOption<V>[];
  value?: V;
  placeholder?: string;
  onChange?: (value: V) => void;
}

/** Select — native `<select>` with custom chrome. Accessible by default. */
export function Select<V extends string | number = string>({
  size = 'md',
  invalid,
  options,
  value,
  placeholder,
  onChange,
  disabled,
  className,
  ...rest
}: SelectProps<V>) {
  return (
    <div
      className={cx(
        'tds-select',
        `tds-select--${size}`,
        invalid && 'tds-select--invalid',
        disabled && 'tds-select--disabled',
        className
      )}
    >
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value as V)}
        {...rest}
      >
        {placeholder && <option value="" disabled hidden>{placeholder}</option>}
        {options.map((o) => (
          <option key={String(o.value)} value={o.value} disabled={o.disabled}>{o.label}</option>
        ))}
      </select>
      <svg className="tds-select__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
