import { useState } from 'react';
import styles from './FlagSolver.module.css';

interface Solution {
  points: { clock: number; flags: number[] }[];
}

function solveFlagPuzzle(clocks: number[], flags: number[]): Solution[] {
  const assign: number[] = Array(6).fill(-1);
  const raw: Solution[] = [];

  function bt(i: number) {
    if (i === 6) {
      // Validate: each point has 1-2 flags and sum matches clock
      const grouped: number[][] = [[], [], [], []];
      for (let f = 0; f < 6; f++) {
        grouped[assign[f]].push(flags[f]);
      }
      for (let p = 0; p < 4; p++) {
        if (grouped[p].length < 1 || grouped[p].length > 2) return;
        const sum = grouped[p].reduce((a, b) => a + b, 0);
        if (sum !== clocks[p]) return;
      }
      raw.push({
        points: grouped.map((g, p) => ({ clock: clocks[p], flags: g })),
      });
      return;
    }

    for (let p = 0; p < 4; p++) {
      // Pruning
      const cnt = assign.slice(0, i).filter((a) => a === p).length;
      if (cnt >= 2) continue;
      const sm = assign
        .slice(0, i)
        .reduce((acc, a, idx) => (a === p ? acc + flags[idx] : acc), 0);
      if (sm + flags[i] > clocks[p]) continue;

      assign[i] = p;
      bt(i + 1);
      assign[i] = -1;
    }
  }

  bt(0);

  // Deduplicate
  const seen = new Set<string>();
  const unique: Solution[] = [];
  for (const sol of raw) {
    const key = sol.points
      .map((pt) => `${pt.clock}:${[...pt.flags].sort().join('+')}`)
      .sort()
      .join('|');
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(sol);
    }
  }

  return unique;
}

export function FlagSolver() {
  const [clocks, setClocks] = useState<string[]>(['', '', '', '']);
  const [flags, setFlags] = useState<string[]>(['', '', '', '', '', '']);
  const [solutions, setSolutions] = useState<Solution[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clockSum = clocks.reduce((a, v) => a + (parseInt(v) || 0), 0);
  const flagSum = flags.reduce((a, v) => a + (parseInt(v) || 0), 0);
  const sumsMatch = clockSum === flagSum;

  const handleSolve = () => {
    setError(null);
    const clockNums = clocks.map((v) => parseInt(v));
    const flagNums = flags.map((v) => parseInt(v));

    if (clockNums.some(isNaN) || flagNums.some(isNaN)) {
      setError('Fill in all fields.');
      return;
    }
    if (!sumsMatch) {
      setError(`Clock total (${clockSum}) doesn't match flag total (${flagSum}).`);
      return;
    }

    const result = solveFlagPuzzle(clockNums, flagNums);
    if (result.length === 0) {
      setError('No valid solution found for these values.');
    } else {
      setSolutions(result);
    }
  };

  const handleClear = () => {
    setClocks(['', '', '', '']);
    setFlags(['', '', '', '', '', '']);
    setSolutions(null);
    setError(null);
  };

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Clock & Flag Solver</h3>
      <p className={styles.description}>
        Enter the 4 clock numbers and 6 flag values from your game.
      </p>

      <div className={styles.inputSection}>
        <label className={styles.sectionLabel}>Clock Numbers</label>
        <div className={styles.clockGrid}>
          {clocks.map((v, i) => (
            <div key={i} className={styles.inputGroup}>
              <span className={styles.inputLabel}>Point {i + 1}</span>
              <input
                type="number"
                min="0"
                className={styles.input}
                value={v}
                onChange={(e) => {
                  const next = [...clocks];
                  next[i] = e.target.value;
                  setClocks(next);
                  setSolutions(null);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.inputSection}>
        <label className={styles.sectionLabel}>Flag Values</label>
        <div className={styles.flagGrid}>
          {flags.map((v, i) => (
            <div key={i} className={styles.inputGroup}>
              <span className={styles.inputLabel}>Flag {i + 1}</span>
              <input
                type="number"
                min="0"
                className={styles.input}
                value={v}
                onChange={(e) => {
                  const next = [...flags];
                  next[i] = e.target.value;
                  setFlags(next);
                  setSolutions(null);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.sumBar}>
        <span>Clock total: <strong>{clockSum}</strong></span>
        <span className={sumsMatch ? styles.sumMatch : styles.sumMismatch}>
          {sumsMatch ? '✓' : '✗'}
        </span>
        <span>Flags total: <strong>{flagSum}</strong></span>
      </div>

      <div className={styles.actions}>
        <button className={styles.solveBtn} onClick={handleSolve}>Solve</button>
        <button className={styles.clearBtn} onClick={handleClear}>Clear</button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {solutions && solutions.length > 0 && (
        <div className={styles.results}>
          {solutions.map((sol, si) => (
            <div key={si} className={styles.solutionGroup}>
              {solutions.length > 1 && (
                <h4 className={styles.solutionLabel}>Possibility {si + 1}</h4>
              )}
              <div className={styles.solutionGrid}>
                {sol.points.map((pt, pi) => (
                  <div key={pi} className={styles.solutionCard}>
                    <span className={styles.cardLabel}>Point {pi + 1}</span>
                    <span className={styles.cardTarget}>{pt.clock}</span>
                    <span className={styles.cardFlags}>
                      {pt.flags.join(' + ')}
                    </span>
                    <span className={styles.cardTag}>
                      {pt.flags.length === 1 ? 'Single flag' : '2 flags'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
