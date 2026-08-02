import { useState } from 'react';
import styles from './CrateFinderSolver.module.css';

interface CrateEntry {
  note: string;
  crate: string;
  location: string;
}

const CRATE_DATA: CrateEntry[] = [
  {
    note: 'replaced PzGR shipment with parts',
    crate: 'Crate III-6',
    location: 'War Factory',
  },
  {
    note: "couldn't tamper with PzGR",
    crate: 'Crate V-7',
    location: 'Dry Dock',
  },
  {
    note: 'PzGR shells are gone, robot parts instead',
    crate: 'Crate X-9',
    location: 'Core Foundry',
  },
  {
    note: 'switch is done, PzGR out, chemical bomb in',
    crate: 'Crate IV-3',
    location: 'Fjord Road',
  },
];

export function CrateFinderSolver() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Crate Finder</h3>
      <p className={styles.description}>
        Select the note text you found on the ground to reveal which crate to open.
      </p>

      <div className={styles.warning}>
        <span className={styles.warningIcon}>⚠</span>
        Opening the wrong crate triggers a 30-second penalty timer.
      </div>

      <div className={styles.cards}>
        {CRATE_DATA.map((entry, i) => (
          <button
            key={i}
            className={`${styles.card} ${selected === i ? styles.cardSelected : ''}`}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <span className={styles.cardNote}>{entry.note}</span>
            <span className={styles.cardCrate}>
              {entry.crate} — {entry.location}
            </span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className={styles.result} aria-live="polite">
          <span className={styles.resultCrate}>{CRATE_DATA[selected].crate}</span>
          <span className={styles.resultLocation}>
            Location: {CRATE_DATA[selected].location}
          </span>
          <span className={styles.resultHint}>
            Find this crate at the {CRATE_DATA[selected].location} area of the map.
          </span>
        </div>
      )}
    </div>
  );
}
