import type { ReactNode } from 'react';
import styles from './DataTable.module.css';

export interface DataColumn {
  /** Unique key for the column. */
  key: string;
  /** Header label. */
  label: string;
  /** Right-align (numeric) column. Defaults to false. */
  numeric?: boolean;
}

export interface DataRow {
  /** Unique key for the row. */
  key: string;
  /** Whether the row is highlighted (e.g. the active round band). */
  active?: boolean;
  /** Cell content keyed by column key. */
  cells: Record<string, ReactNode>;
}

/**
 * A responsive table that renders as a normal table on desktop and reflows
 * into stacked, labeled cards on narrow screens — so no horizontal scrolling
 * is ever required on mobile.
 */
export function DataTable({
  columns,
  rows,
  caption,
}: {
  columns: DataColumn[];
  rows: DataRow[];
  caption?: string;
}) {
  return (
    <div className={styles.wrap}>
      {/* Desktop: real table */}
      <table className={styles.table}>
        {caption && <caption className={styles.srOnly}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={c.numeric ? styles.num : undefined}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className={row.active ? styles.rowActive : undefined}>
              {columns.map((c, i) => (
                <td
                  key={c.key}
                  className={`${c.numeric ? styles.num : ''} ${i === 0 ? styles.firstCol : ''}`}
                >
                  {row.cells[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: stacked cards */}
      <div className={styles.cards}>
        {rows.map((row) => {
          const [first, ...rest] = columns;
          return (
            <div
              key={row.key}
              className={`${styles.card} ${row.active ? styles.cardActive : ''}`}
            >
              <div className={styles.cardTitle}>{row.cells[first.key]}</div>
              <dl className={styles.cardGrid}>
                {rest.map((c) => (
                  <div key={c.key} className={styles.cardRow}>
                    <dt className={styles.cardLabel}>{c.label}</dt>
                    <dd className={styles.cardValue}>{row.cells[c.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
