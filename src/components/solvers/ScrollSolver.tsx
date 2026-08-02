import { useState, useCallback } from 'react';
import styles from './ScrollSolver.module.css';

const SIZE = 3;
const COUNT = SIZE * SIZE;
const POSITIONS = [
  'Top Left', 'Top Middle', 'Top Right',
  'Middle Left', 'Center', 'Middle Right',
  'Bottom Left', 'Bottom Middle', 'Bottom Right',
];

function press(state: boolean[], idx: number): boolean[] {
  const next = [...state];
  const r = Math.floor(idx / SIZE);
  const c = idx % SIZE;
  next[idx] = !next[idx];
  if (r > 0) next[idx - SIZE] = !next[idx - SIZE];
  if (r < SIZE - 1) next[idx + SIZE] = !next[idx + SIZE];
  if (c > 0) next[idx - 1] = !next[idx - 1];
  if (c < SIZE - 1) next[idx + 1] = !next[idx + 1];
  return next;
}

function solve(board: boolean[]): number[] | null {
  let best: number[] | null = null;
  const total = 1 << COUNT;

  for (let mask = 0; mask < total; mask++) {
    let state = [...board];
    const presses: number[] = [];

    for (let i = 0; i < COUNT; i++) {
      if (mask & (1 << i)) {
        state = press(state, i);
        presses.push(i);
      }
    }

    if (state.every((v) => v)) {
      if (best === null || presses.length < best.length) {
        best = presses;
      }
    }
  }

  return best;
}

export function ScrollSolver() {
  const [board, setBoard] = useState<boolean[]>(Array(COUNT).fill(false));
  const [solution, setSolution] = useState<number[] | null | 'none' | 'solved'>(null);

  const toggleTile = (idx: number) => {
    setBoard((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
    setSolution(null);
  };

  const handleSolve = useCallback(() => {
    if (board.every((v) => v)) {
      setSolution('solved');
      return;
    }
    const result = solve(board);
    setSolution(result ?? 'none');
  }, [board]);

  const handleClear = () => {
    setBoard(Array(COUNT).fill(false));
    setSolution(null);
  };

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Scroll Solver</h3>
      <p className={styles.description}>
        Set each scroll to match your in-game state, then hit Solve.
      </p>

      <div className={styles.grid}>
        {board.map((isIn, i) => (
          <button
            key={i}
            className={`${styles.tile} ${isIn ? styles.tileIn : styles.tileOut}`}
            onClick={() => toggleTile(i)}
          >
            {isIn ? 'IN' : 'OUT'}
          </button>
        ))}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendIn}>● Green = IN</span>
        <span className={styles.legendOut}>● Dark = OUT</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.solveBtn} onClick={handleSolve}>Solve</button>
        <button className={styles.clearBtn} onClick={handleClear}>Clear</button>
      </div>

      {solution && (
        <div className={styles.results}>
          {solution === 'solved' && (
            <p className={styles.resultMsg}>Already solved! All scrolls are IN.</p>
          )}
          {solution === 'none' && (
            <p className={styles.resultMsg}>No solution found.</p>
          )}
          {Array.isArray(solution) && (
            <>
              <h4 className={styles.resultTitle}>Press these scrolls:</h4>
              <ol className={styles.resultList}>
                {solution.map((idx, i) => (
                  <li key={i} className={styles.resultItem}>
                    {POSITIONS[idx]}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      )}
    </div>
  );
}
