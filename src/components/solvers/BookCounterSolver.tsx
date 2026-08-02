import { useState } from 'react';
import styles from './BookCounterSolver.module.css';

interface BookTitle {
  id: number;
  title: string;
  bust: number;
}

const BOOK_TITLES: BookTitle[] = [
  { id: 1, title: 'The Musica Universalis', bust: 1 },
  { id: 2, title: 'The Black Veil', bust: 1 },
  { id: 3, title: 'The Moon Directive', bust: 1 },
  { id: 4, title: 'Ash and Bone', bust: 2 },
  { id: 5, title: 'Echoes of Andromeda', bust: 2 },
  { id: 6, title: 'The Unknowable Void', bust: 2 },
  { id: 7, title: 'Pyramid of Cydonia', bust: 3 },
  { id: 8, title: 'Silence at Singularity', bust: 3 },
  { id: 9, title: 'Witchlight Codex', bust: 3 },
];

const BUSTS = [
  { id: 1, label: 'Bust 1' },
  { id: 2, label: 'Bust 2' },
  { id: 3, label: 'Bust 3' },
];

export function BookCounterSolver() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggleBook = (id: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleClear = () => {
    setChecked(new Set());
  };

  const getCountForBust = (bustId: number): number => {
    return BOOK_TITLES.filter(
      (book) => book.bust === bustId && checked.has(book.id)
    ).length;
  };

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Archive of Orbis — Book Counter</h3>
      <p className={styles.description}>
        The machine displays book titles. Check which titles are shown, then interact
        with each bust the number of times indicated below.
      </p>

      <div className={styles.instructions}>
        <h4 className={styles.instructionsTitle}>How it works:</h4>
        <ol className={styles.instructionsList}>
          <li>Look at the book titles the machine is displaying.</li>
          <li>Check those titles below.</li>
          <li>Each bust's count tells you how many times to interact with it.</li>
        </ol>
      </div>

      <div className={styles.bustGroups}>
        {BUSTS.map((bust) => {
          const bustBooks = BOOK_TITLES.filter((b) => b.bust === bust.id);
          const count = getCountForBust(bust.id);
          return (
            <div key={bust.id} className={styles.bustGroup}>
              <div className={styles.bustHeader}>
                <h4 className={styles.bustLabel}>{bust.label}</h4>
                <span className={`${styles.bustCount} ${count > 0 ? styles.bustCountActive : ''}`}>
                  Interact {count} time{count !== 1 ? 's' : ''}
                </span>
              </div>
              <div className={styles.bookList}>
                {bustBooks.map((book) => (
                  <label key={book.id} className={styles.bookItem}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={checked.has(book.id)}
                      onChange={() => toggleBook(book.id)}
                    />
                    <span className={styles.bookTitle}>{book.title}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.summary}>
        <h4 className={styles.summaryTitle}>Summary</h4>
        <div className={styles.summaryGrid}>
          {BUSTS.map((bust) => {
            const count = getCountForBust(bust.id);
            return (
              <div key={bust.id} className={styles.summaryItem}>
                <span className={styles.summaryLabel}>{bust.label}</span>
                <span className={`${styles.summaryValue} ${count > 0 ? styles.summaryValueActive : ''}`}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.clearBtn} onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}
