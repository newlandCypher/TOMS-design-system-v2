import * as React from 'react';
import { cx } from './_internal/utils';

/** Layout shell — fixed sidebar + sticky header + scrollable content. */
export const Layout: React.FC<{
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}> = ({ sidebar, header, children, className }) => (
  <div className={cx('tds-layout', className)}>
    {sidebar && <aside className="tds-layout__sidebar">{sidebar}</aside>}
    <main className="tds-layout__main">
      {header && <header className="tds-layout__header">{header}</header>}
      <div className="tds-layout__content">{children}</div>
    </main>
  </div>
);

/** Grid — responsive 12-col grid backed by CSS grid. */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: number | string;
}
export const Grid: React.FC<GridProps> = ({ columns = 12, gap = 'var(--space-4)', style, children, ...rest }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap, ...style }} {...rest}>
    {children}
  </div>
);

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
}
export const GridItem: React.FC<GridItemProps> = ({ span = 1, style, ...rest }) => (
  <div style={{ gridColumn: `span ${span} / span ${span}`, minWidth: 0, ...style }} {...rest} />
);

/** Stack — flex column or row with gap. */
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  gap?: number | string;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
}
export const Stack: React.FC<StackProps> = ({ direction = 'column', gap = 'var(--space-3)', align, justify, wrap, style, ...rest }) => (
  <div
    style={{
      display: 'flex', flexDirection: direction, gap,
      alignItems: align, justifyContent: justify,
      flexWrap: wrap ? 'wrap' : undefined, ...style,
    }}
    {...rest}
  />
);
