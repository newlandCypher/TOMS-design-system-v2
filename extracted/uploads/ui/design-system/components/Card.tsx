import * as React from 'react';
import { cx } from './_internal/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  /** Remove default body padding. */
  flush?: boolean;
}
export const Card: React.FC<CardProps> = ({ title, actions, footer, flush, className, children, ...rest }) => (
  <div className={cx('tds-card', className)} {...rest}>
    {(title || actions) && (
      <div className="tds-card__header">
        <div className="tds-card__title">{title}</div>
        {actions && <div>{actions}</div>}
      </div>
    )}
    <div className={cx('tds-card__body', flush && 'tds-card__body--flush')} style={flush ? { padding: 0 } : undefined}>
      {children}
    </div>
    {footer && <div className="tds-card__footer">{footer}</div>}
  </div>
);

/** Badge / Tag for status, counts, semantic meaning. */
export type BadgeTone = 'neutral' | 'success' | 'warning' | 'error' | 'info';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}
export const Badge: React.FC<BadgeProps> = ({ tone = 'neutral', className, ...rest }) => (
  <span className={cx('tds-badge', `tds-badge--${tone}`, className)} {...rest} />
);
