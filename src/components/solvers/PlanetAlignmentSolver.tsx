import { useState } from 'react';
import styles from './PlanetAlignmentSolver.module.css';

const PLANETS = ['Mars', 'Neptune', 'Saturn'] as const;

const DIRECTIONS = [
  'Northeast',
  'Southeast',
  'Southwest',
  'Northwest',
] as const;

export function PlanetAlignmentSolver() {
  const [assignments, setAssignments] = useState<Record<string, string>>({
    Mars: '',
    Neptune: '',
    Saturn: '',
  });

  const handleSelect = (planet: string, direction: string) => {
    setAssignments((prev) => ({ ...prev, [planet]: direction }));
  };

  const handleClear = () => {
    setAssignments({ Mars: '', Neptune: '', Saturn: '' });
  };

  const allSet = PLANETS.every((p) => assignments[p] !== '');

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Planet Alignment Solver</h3>
      <p className={styles.description}>
        Find the three pages around the map. Each shows a planet and a compass direction.
        Select the direction for each planet below, then align them on the model display.
      </p>

      <div className={styles.planets}>
        {PLANETS.map((planet) => (
          <div key={planet} className={`${styles.planetCard} ${assignments[planet] ? styles.planetCardFilled : ''}`}>
            <span className={styles.planetName}>{planet}</span>
            <select
              className={styles.select}
              value={assignments[planet]}
              onChange={(e) => handleSelect(planet, e.target.value)}
            >
              <option value="">— Select direction —</option>
              {DIRECTIONS.map((dir) => (
                <option key={dir} value={dir}>{dir}</option>
              ))}
            </select>
            {assignments[planet] && (
              <span className={styles.directionBadge}>{assignments[planet]}</span>
            )}
          </div>
        ))}
      </div>

      {allSet && (
        <div className={styles.summary}>
          <h4 className={styles.summaryTitle}>Alignment Summary</h4>
          <div className={styles.summaryGrid}>
            {PLANETS.map((planet) => (
              <div key={planet} className={styles.summaryItem}>
                <span className={styles.summaryPlanet}>{planet}</span>
                <span className={styles.summaryArrow}>→</span>
                <span className={styles.summaryDirection}>{assignments[planet]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <button className={styles.clearBtn} onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}
