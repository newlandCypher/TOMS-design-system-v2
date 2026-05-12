import * as React from 'react';
import { cx } from './_internal/utils';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
}
export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (key: string) => void;
  className?: string;
}
/** Tabs — top-level switcher between sibling views. */
export const Tabs: React.FC<TabsProps> = ({ items, value, onChange, className }) => (
  <div role="tablist" className={cx('tds-tabs', className)}>
    {items.map((it) => (
      <button
        key={it.key}
        role="tab"
        aria-selected={value === it.key}
        disabled={it.disabled}
        className={cx('tds-tab', value === it.key && 'tds-tab--active')}
        onClick={() => onChange(it.key)}
      >
        {it.label}
      </button>
    ))}
  </div>
);

export interface PaginationProps {
  page: number;            // 1-indexed
  pageCount: number;
  onChange: (page: number) => void;
  siblingCount?: number;
}
export const Pagination: React.FC<PaginationProps> = ({ page, pageCount, onChange, siblingCount = 1 }) => {
  const pages = React.useMemo(() => {
    const out: (number | '…')[] = [];
    const push = (n: number | '…') => out.push(n);
    const start = Math.max(2, page - siblingCount);
    const end = Math.min(pageCount - 1, page + siblingCount);
    push(1);
    if (start > 2) push('…');
    for (let i = start; i <= end; i++) push(i);
    if (end < pageCount - 1) push('…');
    if (pageCount > 1) push(pageCount);
    return out;
  }, [page, pageCount, siblingCount]);

  return (
    <nav className="tds-pagination" aria-label="Pagination">
      <button className="tds-pagination__page" disabled={page <= 1} onClick={() => onChange(page - 1)}>‹</button>
      {pages.map((p, i) => p === '…'
        ? <span key={`e${i}`} className="tds-pagination__page" aria-hidden>…</span>
        : <button
            key={p}
            className={cx('tds-pagination__page', p === page && 'tds-pagination__page--active')}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange(p)}
          >{p}</button>
      )}
      <button className="tds-pagination__page" disabled={page >= pageCount} onClick={() => onChange(page + 1)}>›</button>
    </nav>
  );
};

export type SortDir = 'asc' | 'desc' | null;
export interface TableColumn<R> {
  key: string;
  title: React.ReactNode;
  render?: (row: R) => React.ReactNode;
  /** Field on row used by default render + sort. */
  field?: keyof R;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
}
export interface TableProps<R> {
  columns: TableColumn<R>[];
  rows: R[];
  rowKey: (row: R, index: number) => string | number;
  /** Controlled sort (optional). */
  sort?: { key: string; dir: Exclude<SortDir, null> };
  onSortChange?: (sort: { key: string; dir: Exclude<SortDir, null> } | null) => void;
  empty?: React.ReactNode;
}
/** Table — sortable, header-stickied data grid. Sort is optional. */
export function Table<R>({ columns, rows, rowKey, sort, onSortChange, empty = 'No data' }: TableProps<R>) {
  const handleSort = (col: TableColumn<R>) => {
    if (!col.sortable || !onSortChange) return;
    if (!sort || sort.key !== col.key) onSortChange({ key: col.key, dir: 'asc' });
    else if (sort.dir === 'asc') onSortChange({ key: col.key, dir: 'desc' });
    else onSortChange(null);
  };
  return (
    <table className="tds-table">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} style={{ width: c.width, textAlign: c.align ?? 'left' }}>
              {c.sortable
                ? <span className="tds-table__sort" onClick={() => handleSort(c)}>
                    {c.title}
                    <span style={{ opacity: sort?.key === c.key ? 1 : 0.3 }}>
                      {sort?.key === c.key && sort.dir === 'desc' ? '▼' : '▲'}
                    </span>
                  </span>
                : c.title}
            </th>
          ))}
        </tr>
      </thead>
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
}
