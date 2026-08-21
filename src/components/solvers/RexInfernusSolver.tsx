import { useMemo, useState } from 'react';
import styles from './RexInfernusSolver.module.css';

interface RiddleSolution {
  id: string;
  label: string;
  sentence: string;
  left: number;
  bottom: number;
  right: number;
}

const RIDDLE_SOLUTIONS: RiddleSolution[] = [
  {
    id: 'r1',
    label: 'Riddle 1',
    sentence:
      'I remember the runner that travels to stars, while moons and galaxies stay true.',
    left: 0,
    bottom: 2,
    right: 3,
  },
  {
    id: 'r2',
    label: 'Riddle 2',
    sentence:
      'I drift to the runner that travels moon, who borrow from galaxies when stars stay true.',
    left: 3,
    bottom: 2,
    right: 1,
  },
  {
    id: 'r3',
    label: 'Riddle 3',
    sentence:
      'I drift to stars that remember moons, who borrow the runner that travels the galaxy.',
    left: 1,
    bottom: 2,
    right: 2,
  },
  {
    id: 'r4',
    label: 'Riddle 4',
    sentence:
      'I remember galaxies that drift to moons, who borrow the runner that travels the stars.',
    left: 2,
    bottom: 0,
    right: 2,
  },
];

export function RexInfernusSolver() {
  const [selectedId, setSelectedId] = useState(RIDDLE_SOLUTIONS[0].id);

  const selectedRiddle = useMemo(
    () =>
      RIDDLE_SOLUTIONS.find((riddle) => riddle.id === selectedId) ??
      RIDDLE_SOLUTIONS[0],
    [selectedId]
  );

  const solvedRiddle = useMemo(
    () => RIDDLE_SOLUTIONS.find((riddle) => riddle.id === selectedId) ?? null,
    [selectedId]
  );

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Rex Infernus Riddle Solver</h3>
      <p className={styles.description}>
        Select the sentence that appears on your run to instantly reveal the
        switch values.
      </p>

      <div className={styles.riddleTabs} role="tablist" aria-label="Riddle selections">
        {RIDDLE_SOLUTIONS.map((riddle) => (
          <button
            key={riddle.id}
            type="button"
            role="tab"
            className={`${styles.riddleTab} ${selectedId === riddle.id ? styles.riddleTabActive : ''}`}
            aria-selected={selectedId === riddle.id}
            onClick={() => setSelectedId(riddle.id)}
          >
            {riddle.label}
          </button>
        ))}
      </div>

      <blockquote className={styles.riddleQuote}>
        {selectedRiddle.sentence}
      </blockquote>

      <div className={styles.results}>
        <div className={styles.resultItem}>
          <span className={styles.resultLabel}>Left Switch</span>
          <span className={styles.resultValue}>{solvedRiddle ? solvedRiddle.left : '-'}</span>
        </div>
        <div className={styles.resultItem}>
          <span className={styles.resultLabel}>Bottom Switch</span>
          <span className={styles.resultValue}>{solvedRiddle ? solvedRiddle.bottom : '-'}</span>
        </div>
        <div className={styles.resultItem}>
          <span className={styles.resultLabel}>Right Switch</span>
          <span className={styles.resultValue}>{solvedRiddle ? solvedRiddle.right : '-'}</span>
        </div>
      </div>
    </div>
  );
}
