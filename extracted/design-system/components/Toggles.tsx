import * as React from 'react';
import { cx } from './_internal/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  /** Tri-state checkbox. */
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate, className, ...rest },
  forwardedRef
) {
  const innerRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement);
  React.useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <label className={cx('tds-checkbox', className)}>
      <input ref={innerRef} type="checkbox" {...rest} />
      <span className="tds-checkbox__box" aria-hidden>
        <svg className="tds-checkbox__check" viewBox="0 0 10 10" fill="none">
          {indeterminate
            ? <path d="M2 5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            : <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          }
        </svg>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
});

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, ...rest },
  ref
) {
  return (
    <label className={cx('tds-radio', className)}>
      <input ref={ref} type="radio" {...rest} />
      <span className="tds-radio__box" aria-hidden><span className="tds-radio__dot" /></span>
      {label && <span>{label}</span>}
    </label>
  );
});

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  'aria-label'?: string;
}
/** Switch — instant on/off. Use for settings (e.g. enable APN). */
export const Switch: React.FC<SwitchProps> = ({ checked, defaultChecked, onChange, disabled, ...aria }) => {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked! : internal;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        if (!isControlled) setInternal(!value);
        onChange?.(!value);
      }}
      className={cx('tds-switch', value && 'tds-switch--on')}
      {...aria}
    />
  );
};
