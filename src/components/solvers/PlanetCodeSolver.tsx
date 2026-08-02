import { useState } from 'react';
import styles from './PlanetCodeSolver.module.css';

const PLANETS = [
  { name: 'Mercury', number: 1 },
  { name: 'Venus', number: 2 },
  { name: 'Earth', number: 3 },
  { name: 'Mars', number: 4 },
  { name: 'Jupiter', number: 5 },
  { name: 'Saturn', number: 6 },
  { name: 'Uranus', number: 7 },
  { name: 'Neptune', number: 8 },
] as const;

const MAX_SELECTIONS = 3;

export function PlanetCodeSolver() {
  const [selections, setSelections] = useState<number[]>([]);

  const handlePlanetClick = (planetNumber: number) => {
    if (selections.length >= MAX_SELECTIONS) return;
    setSelections((prev) => [...prev, planetNumber]);
  };

  const handleClear = () => {
    setSelections([]);
  };

  const code = selections.map(String).join('');
  const selectionIndex = (planetNumber: number): number | null => {
    const idx = selections.indexOf(planetNumber);
    return idx !== -1 ? idx : null;
  };

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Observatory Code Solver</h3>
      <p className={styles.description}>
        Dr. Thurston recites 3 planet names. Click them in order to get the 3-digit code
        (each planet's number = distance from the Sun).
      </p>

      <div className={styles.planetGrid}>
        {PLANETS.map((planet) => {
          const idx = selectionIndex(planet.number);
          const isSelected = idx !== null;
          return (
            <button
              key={planet.name}
              className={`${styles.planetBtn} ${isSelected ? styles[`selected${idx + 1}` as keyof typeof styles] : ''}`}
              onClick={() => handlePlanetClick(planet.number)}
              disabled={selections.length >= MAX_SELECTIONS}
              aria-label={`${planet.name}, number ${planet.number}`}
            >
              <span className={styles.planetName}>{planet.name}</span>
              <span className={styles.planetNumber}>{planet.number}</span>
              {isSelected && (
                <span className={styles.selectionBadge}>{idx + 1}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className={styles.codeDisplay}>
        <span className={styles.codeLabel}>Code:</span>
        <span className={styles.codeValue}>
          {code || '---'}
        </span>
      </div>

      <div className={styles.actions}>
        <button className={styles.clearBtn} onClick={handleClear}>Clear</button>
      </div>

      <div className={styles.reference}>
        <h4 className={styles.referenceTitle}>Planet Reference</h4>
        <table className={styles.referenceTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Planet</th>
            </tr>
          </thead>
          <tbody>
            {PLANETS.map((planet) => (
              <tr key={planet.name}>
                <td>{planet.number}</td>
                <td>{planet.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
