import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import styles from './NumapRexInfernusPillarSolver.module.css';

type Lever = 'A' | 'B' | 'C';
type SolverStep = { type: 'pull'; lever: Lever };

interface Position {
  id: number;
  name: string;
  detail: string;
}

interface ElementTarget {
  id: number;
  label: string;
}

interface StepCounts {
  A: number;
  B: number;
  C: number;
  switches: number;
}

const POSITIONS: Position[] = [
  { id: 1, name: 'Dravakar', detail: '' },
  { id: 2, name: 'Between', detail: 'Dravakar / Veytharion' },
  { id: 3, name: 'Veytharion', detail: '' },
  { id: 4, name: 'Nyxara', detail: '' },
  { id: 5, name: 'Between', detail: 'Nyxara / Caltheris' },
  { id: 6, name: 'Caltheris', detail: '' },
];

const PILLARS: Lever[] = ['A', 'B', 'C'];
const DEFAULT_STATE: number[] = [6, 1, 2];
const ELEMENT_TARGETS: ElementTarget[] = [
  { id: 1, label: 'Dravakar' },
  { id: 3, label: 'Veytharion' },
  { id: 4, label: 'Nyxara' },
  { id: 6, label: 'Caltheris' },
];
const TARGET_IDS = ELEMENT_TARGETS.map((target) => target.id);

function applyMove(state: number[], lever: Lever): number[] {
  const next = [...state];
  const pushedIndex = PILLARS.indexOf(lever);

  for (let i = 0; i < PILLARS.length; i += 1) {
    const delta = i === pushedIndex ? 1 : 2;
    next[i] = ((next[i] - 1 - delta + 12) % 6) + 1;
  }

  return next;
}

function allTargetsMask(): number {
  return (1 << TARGET_IDS.length) - 1;
}

function alignmentMask(positions: number[]): number {
  if (!positions.every((value) => value === positions[0])) {
    return 0;
  }

  const alignedPosition = positions[0];
  const targetIndex = TARGET_IDS.indexOf(alignedPosition);
  if (targetIndex < 0) {
    return 0;
  }

  return 1 << targetIndex;
}

function countSteps(steps: SolverStep[] | null): StepCounts {
  const result: StepCounts = { A: 0, B: 0, C: 0, switches: 0 };
  if (!steps) {
    return result;
  }

  steps.forEach((step) => {
    if (step.type === 'pull') {
      result[step.lever] += 1;
      return;
    }
    result.switches += 1;
  });

  return result;
}

function shortestSolution(
  start: number[],
  target: number[]
): SolverStep[] | null {
  const stateKey = (positions: number[]) => positions.join(',');
  const startKey = stateKey(start);
  const targetKey = stateKey(target);

  if (startKey === targetKey) {
    return [];
  }

  const queue: number[][] = [start];
  const visited = new Set([startKey]);
  const parent = new Map<string, { prev: string; step: SolverStep }>();

  while (queue.length > 0) {
    const positions = queue.shift();
    if (!positions) {
      break;
    }

    for (const lever of PILLARS) {
      const nextPositions = applyMove(positions, lever);
      const nextKey = stateKey(nextPositions);

      if (visited.has(nextKey)) {
        continue;
      }

      visited.add(nextKey);
      parent.set(nextKey, {
        prev: stateKey(positions),
        step: { type: 'pull', lever },
      });

      if (nextKey === targetKey) {
        const path: SolverStep[] = [];
        let current = nextKey;

        while (current !== startKey) {
          const node = parent.get(current);
          if (!node) {
            return null;
          }
          path.push(node.step);
          current = node.prev;
        }

        return path.reverse();
      }

      queue.push(nextPositions);
    }
  }

  return null;
}

function shortestAllTargetsSolution(start: number[]): SolverStep[] | null {
  const stateKey = (positions: number[], mask: number) =>
    `${positions.join(',')}|${mask}`;

  const startMask = alignmentMask(start);
  const fullMask = allTargetsMask();
  if (startMask === fullMask) {
    return [];
  }

  const startKey = stateKey(start, startMask);
  const queue: Array<{ positions: number[]; mask: number }> = [
    { positions: start, mask: startMask },
  ];
  const visited = new Set([startKey]);
  const parent = new Map<string, { prev: string; step: SolverStep }>();

  while (queue.length > 0) {
    const state = queue.shift();
    if (!state) {
      break;
    }

    for (const lever of PILLARS) {
      const nextPositions = applyMove(state.positions, lever);
      const nextMask = state.mask | alignmentMask(nextPositions);
      const nextKey = stateKey(nextPositions, nextMask);

      if (visited.has(nextKey)) {
        continue;
      }

      visited.add(nextKey);
      parent.set(nextKey, {
        prev: stateKey(state.positions, state.mask),
        step: { type: 'pull', lever },
      });

      if (nextMask === fullMask) {
        const path: SolverStep[] = [];
        let current = nextKey;

        while (current !== startKey) {
          const node = parent.get(current);
          if (!node) {
            return null;
          }
          path.push(node.step);
          current = node.prev;
        }

        return path.reverse();
      }

      queue.push({ positions: nextPositions, mask: nextMask });
    }
  }

  return null;
}

function milestoneLabels(
  start: number[],
  steps: SolverStep[]
): Array<{ id: number; label: string; actionNumber: number }> {
  const reached = new Set<number>();
  const milestones: Array<{ id: number; label: string; actionNumber: number }> = [];
  let positions = [...start];

  const pushMilestoneIfAny = (actionNumber: number) => {
    const mask = alignmentMask(positions);
    if (mask === 0) {
      return;
    }

    const targetIndex = Math.log2(mask);
    const target = ELEMENT_TARGETS[targetIndex];
    if (!target || reached.has(target.id)) {
      return;
    }

    reached.add(target.id);
    milestones.push({ id: target.id, label: target.label, actionNumber });
  };

  pushMilestoneIfAny(0);

  steps.forEach((step, index) => {
    if (step.type === 'pull') {
      positions = applyMove(positions, step.lever);
    }
    pushMilestoneIfAny(index + 1);
  });

  return milestones;
}

function pointForPosition(position: number, laneIndex: number): [number, number] {
  const laneRadiusByIndex = [40, 33, 26];
  const radius = laneRadiusByIndex[laneIndex] ?? laneRadiusByIndex[laneRadiusByIndex.length - 1];
  const angleDeg = -90 - (position - 1) * 60;
  const angleRad = (angleDeg * Math.PI) / 180;

  const left = 50 + radius * Math.cos(angleRad);
  const top = 50 + radius * Math.sin(angleRad);

  return [left, top];
}

export function NumapRexInfernusPillarSolver() {
  const [current, setCurrent] = useState<number[]>(DEFAULT_STATE);
  const [targetPosition, setTargetPosition] = useState<number>(1);
  const [singleSolution, setSingleSolution] = useState<SolverStep[] | null>(null);
  const [routeSolution, setRouteSolution] = useState<SolverStep[] | null>(null);
  const [routeStart, setRouteStart] = useState<number[]>(DEFAULT_STATE);
  const [singleWarning, setSingleWarning] = useState<string>('');
  const [routeWarning, setRouteWarning] = useState<string>('');
  const [activeSolutionType, setActiveSolutionType] = useState<'single' | 'route' | null>(null);

  const singleCounts = useMemo(() => countSteps(singleSolution), [singleSolution]);
  const routeCounts = useMemo(() => countSteps(routeSolution), [routeSolution]);
  const routeMilestones = useMemo(() => {
    if (!routeSolution) {
      return [];
    }
    return milestoneLabels(routeStart, routeSolution);
  }, [routeStart, routeSolution]);

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
      setSingleWarning('No solution exists for this configuration.');
      setSingleSolution(null);
      return;
    }

    setSingleWarning('');
    setSingleSolution(path);
    setActiveSolutionType('single');
  };

  const handleSolveAllTargets = () => {
    const path = shortestAllTargetsSolution(current);
    if (path === null) {
      setRouteWarning('No all-target route exists for this configuration.');
      setRouteSolution(null);
      return;
    }

    setRouteWarning('');
    setRouteStart([...current]);
    setRouteSolution(path);
    setActiveSolutionType('route');
  };

  const handleReset = () => {
    setCurrent(DEFAULT_STATE);
    setTargetPosition(1);
    setSingleSolution(null);
    setRouteSolution(null);
    setRouteStart(DEFAULT_STATE);
    setSingleWarning('');
    setRouteWarning('');
    setActiveSolutionType(null);
  };

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Numap Rex Infernus Pillar Solver</h3>
      <p className={styles.description}>
        Enter current pillar positions and destination. Use Single Target to fix to one destination, or use All Targets Route to get the fastest path that hits all four targets.
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
                      {position.id}. {position.name}
                      {position.detail ? ` (${position.detail})` : ''}
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
          <div className={`${styles.lane} ${styles.laneA}`} />
          <div className={`${styles.lane} ${styles.laneB}`} />
          <div className={`${styles.lane} ${styles.laneC}`} />

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
            const laneByPillarIndex = [2, 1, 0];
            const [left, top] = pointForPosition(current[index], laneByPillarIndex[index]);

            return (
              <div
                key={`dot-${pillar}`}
                className={`${styles.dot} ${styles[`dot${pillar}` as keyof typeof styles]}`}
                style={{ left: `${left}%`, top: `${top}%` }}
                aria-label={`Pillar ${pillar} marker`}
              />
            );
          })}

          <div className={styles.centerLabel}>
            <div>3 Pillars | 6 Positions</div>
            <div className={styles.directionLabel}>↺ Counterclockwise</div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.solveButton} onClick={handleSolve}>
          Solve Single Target
        </button>
        <button type="button" className={styles.solveButton} onClick={handleSolveAllTargets}>
          Solve All Targets Route
        </button>
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>

      {singleWarning && <p className={styles.warning}>{singleWarning}</p>}
      {routeWarning && <p className={styles.warning}>{routeWarning}</p>}

      {activeSolutionType === 'single' && singleSolution && (
        <section className={styles.result}>
          <h4 className={styles.sequenceTitle}>Single Target Solution</h4>
          <div className={styles.summary}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{singleCounts.A}</span>
              <span className={styles.statLabel}>Push A</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{singleCounts.B}</span>
              <span className={styles.statLabel}>Push B</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{singleCounts.C}</span>
              <span className={styles.statLabel}>Push C</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{singleCounts.switches}</span>
              <span className={styles.statLabel}>Switches</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{singleSolution.length}</span>
              <span className={styles.statLabel}>Total Actions</span>
            </div>
          </div>

          <h4 className={styles.sequenceTitle}>Exact Lever Sequence</h4>
          <div className={styles.sequence}>
            {singleSolution.length > 0 ? (
              singleSolution.map((step, index) => (
                <div key={`step-${index + 1}`} className={styles.step}>
                  <span className={styles.stepNumber}>{index + 1}.</span>
                  <span>Push Pillar {step.lever}</span>
                </div>
              ))
            ) : (
              <div className={styles.step}>Already solved. No actions needed.</div>
            )}
          </div>
        </section>
      )}

      {activeSolutionType === 'route' && routeSolution && (
        <section className={styles.result}>
          <h4 className={styles.sequenceTitle}>All Four Targets Route (Fastest)</h4>
          <div className={styles.summary}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{routeCounts.A}</span>
              <span className={styles.statLabel}>Push A</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{routeCounts.B}</span>
              <span className={styles.statLabel}>Push B</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{routeCounts.C}</span>
              <span className={styles.statLabel}>Push C</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{routeCounts.switches}</span>
              <span className={styles.statLabel}>Switches</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{routeSolution.length}</span>
              <span className={styles.statLabel}>Total Actions</span>
            </div>
          </div>

          <div className={styles.sequence}>
            {routeMilestones.map((milestone) => (
              <div key={`milestone-${milestone.id}`} className={styles.step}>
                <span className={styles.stepNumber}>Hit</span>
                <span>
                  {milestone.label} at action {milestone.actionNumber}
                </span>
              </div>
            ))}
          </div>

          <h4 className={styles.sequenceTitle}>Exact Action Sequence</h4>
          <div className={styles.sequence}>
            {routeSolution.length > 0 ? (
              routeSolution.map((step, index) => (
                <div key={`route-step-${index + 1}`} className={styles.step}>
                  <span className={styles.stepNumber}>{index + 1}.</span>
                  <span>Push Pillar {step.lever}</span>
                </div>
              ))
            ) : (
              <div className={styles.step}>All four targets are already satisfied.</div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}