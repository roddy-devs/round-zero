import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import styles from './NumapRexInfernusPillarSolver.module.css';

type Lever = 'A' | 'B' | 'C';

interface Position {
  id: number;
  name: string;
  detail: string;
}

interface ElementTarget {
  id: number;
  label: string;
}

const POSITIONS: Position[] = [
  { id: 1, name: 'Dravakar', detail: 'Target' },
  { id: 2, name: 'Between', detail: 'Dravakar / Veytharion' },
  { id: 3, name: 'Veytharion', detail: 'Target' },
  { id: 4, name: 'Nyxara', detail: 'Target' },
  { id: 5, name: 'Between', detail: 'Nyxara / Caltheris' },
  { id: 6, name: 'Caltheris', detail: 'Target' },
];

const PILLARS: Lever[] = ['A', 'B', 'C'];
const DEFAULT_STATE: number[] = [1, 3, 4];
const ELEMENT_TARGETS: ElementTarget[] = [
  { id: 1, label: 'Dravakar' },
  { id: 3, label: 'Veytharion' },
  { id: 4, label: 'Nyxara' },
  { id: 6, label: 'Caltheris' },
];

function applyMove(state: number[], lever: Lever): number[] {
  const next = [...state];
  const pushedIndex = PILLARS.indexOf(lever);

  for (let i = 0; i < PILLARS.length; i += 1) {
    const delta = i === pushedIndex ? 1 : 2;
    next[i] = ((next[i] - 1 + delta) % 6) + 1;
  }

  return next;
}

function shortestSolution(start: number[], target: number[]): Lever[] | null {
  const key = (state: number[]) => state.join(',');
  const startKey = key(start);
  const targetKey = key(target);

  if (startKey === targetKey) {
    return [];
  }

  const queue: number[][] = [start];
  const visited = new Set([startKey]);
  const parent = new Map<string, { prev: string; lever: Lever }>();

  while (queue.length > 0) {
    const state = queue.shift();
    if (!state) {
      break;
    }

    for (const lever of PILLARS) {
      const next = applyMove(state, lever);
      const nextKey = key(next);

      if (visited.has(nextKey)) {
        continue;
      }

      visited.add(nextKey);
      parent.set(nextKey, { prev: key(state), lever });

      if (nextKey === targetKey) {
        const path: Lever[] = [];
        let current = nextKey;

        while (current !== startKey) {
          const node = parent.get(current);
          if (!node) {
            return null;
          }
          path.push(node.lever);
          current = node.prev;
        }

        return path.reverse();
      }

      queue.push(next);
    }
  }

  return null;
}

function pointForPosition(position: number): [number, number] {
  const points: Record<number, [number, number]> = {
    1: [50, 7],
    2: [93, 28],
    3: [93, 72],
    4: [50, 93],
    5: [7, 72],
    6: [7, 28],
  };

  return points[position] ?? [50, 50];
}

export function NumapRexInfernusPillarSolver() {
  const [current, setCurrent] = useState<number[]>(DEFAULT_STATE);
  const [targetPosition, setTargetPosition] = useState<number>(1);
  const [solution, setSolution] = useState<Lever[] | null>(null);
  const [warning, setWarning] = useState<string>('');

  const counts = useMemo(() => {
    const result: Record<Lever, number> = { A: 0, B: 0, C: 0 };
    if (!solution) {
      return result;
    }

    solution.forEach((lever) => {
      result[lever] += 1;
    });

    return result;
  }, [solution]);

  const handleStateChange = (
    setter: Dispatch<SetStateAction<number[]>>,
    index: number,
    value: number
  ) => {
    setter((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSolve = () => {
    const target = [targetPosition, targetPosition, targetPosition];
    const path = shortestSolution(current, target);
    if (path === null) {
      setWarning('No solution exists for this configuration.');
      setSolution(null);
      return;
    }

    setWarning('');
    setSolution(path);
  };

  const handleReset = () => {
    setCurrent(DEFAULT_STATE);
    setTargetPosition(1);
    setSolution(null);
    setWarning('');
  };

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Numap Rex Infernus Pillar Solver</h3>
      <p className={styles.description}>
        Enter the current pillar positions, then choose one elemental destination for all pillars.
      </p>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <h4 className={styles.panelTitle}>Current Positions</h4>
          <div className={styles.rows}>
            {PILLARS.map((pillar, index) => (
              <label key={`current-${pillar}`} className={styles.row}>
                <span className={styles.rowLabel}>Pillar {pillar}</span>
                <select
                  className={styles.select}
                  value={current[index]}
                  onChange={(event) =>
                    handleStateChange(setCurrent, index, Number.parseInt(event.target.value, 10))
                  }
                >
                  {POSITIONS.map((position) => (
                    <option key={position.id} value={position.id}>
                      {position.id}. {position.name} ({position.detail})
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <h4 className={styles.panelTitle}>Shared Destination</h4>
          <div className={styles.targetGrid}>
            {ELEMENT_TARGETS.map((target) => (
              <label key={target.id} className={styles.targetChoice}>
                <input
                  type="radio"
                  name="targetPosition"
                  value={target.id}
                  checked={targetPosition === target.id}
                  onChange={() => setTargetPosition(target.id)}
                />
                <span>{target.label}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.diagramWrap}>
        <div className={styles.diagram}>
          <div className={styles.ring} />
          {POSITIONS.map((position, index) => (
            <div
              key={`slot-${position.id}`}
              className={`${styles.slot} ${styles[`slot${index + 1}` as keyof typeof styles]} ${targetPosition === position.id ? styles.slotTarget : ''}`}
            >
              <strong>{position.id}. {position.name}</strong>
              <small>{position.detail}</small>
            </div>
          ))}

          {PILLARS.map((pillar, index) => {
            const [left, top] = pointForPosition(current[index]);

            return (
              <div
                key={`dot-${pillar}`}
                className={`${styles.dot} ${styles[`dot${pillar}` as keyof typeof styles]}`}
                style={{ left: `${left}%`, top: `${top}%` }}
                aria-label={`Pillar ${pillar} marker`}
              />
            );
          })}

          <div className={styles.centerLabel}>3 Pillars | 6 Positions</div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.solveButton} onClick={handleSolve}>
          Solve Puzzle
        </button>
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>

      {warning && <p className={styles.warning}>{warning}</p>}

      {solution && (
        <section className={styles.result}>
          <div className={styles.summary}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{counts.A}</span>
              <span className={styles.statLabel}>Push A</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{counts.B}</span>
              <span className={styles.statLabel}>Push B</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{counts.C}</span>
              <span className={styles.statLabel}>Push C</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{solution.length}</span>
              <span className={styles.statLabel}>Total Pulls</span>
            </div>
          </div>

          <h4 className={styles.sequenceTitle}>Exact Lever Sequence</h4>
          <div className={styles.sequence}>
            {solution.length > 0 ? (
              solution.map((pillar, index) => (
                <div key={`step-${index + 1}`} className={styles.step}>
                  <span className={styles.stepNumber}>{index + 1}.</span>
                  <span>Push Pillar {pillar}</span>
                </div>
              ))
            ) : (
              <div className={styles.step}>Already solved. No lever pulls needed.</div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}