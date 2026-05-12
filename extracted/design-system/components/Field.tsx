import * as React from 'react';
import { cx } from './_internal/utils';

export interface FieldProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Field — labelled wrapper around any input/select. Renders label, hint and error in
 * a consistent column. The error message replaces the hint when present.
 */
export const Field: React.FC<FieldProps> = ({ label, hint, error, required, htmlFor, className, children }) => (
  <div className={cx('tds-field', className)}>
    {label && (
      <label htmlFor={htmlFor} className={cx('tds-field__label', required && 'tds-field__label--required')}>
        {label}
      </label>
    )}
    {children}
    {error
      ? <div className="tds-field__error" role="alert">{error}</div>
      : hint ? <div className="tds-field__hint">{hint}</div> : null}
  </div>
);
