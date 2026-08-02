import { useState } from 'react';
import styles from './ZaryaConsoleSolver.module.css';

const CODES: Record<string, string[]> = {
  LAUNCH: ['11', '00', '20', '13', '02', '07'],
  WEAPON: ['22', '04', '00', '15', '14', '13'],
  ENGINE: ['04', '13', '06', '08', '13', '04'],
  ROCKET: ['17', '14', '02', '10', '04', '19'],
};

const WORDS = Object.keys(CODES) as Array<keyof typeof CODES>;

export function ZaryaConsoleSolver() {
  const [selected, setSelected] = useState<string | null>(null);

  const digits = selected ? CODES[selected] : null;

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Zarya Console Solver</h3>
      <p className={styles.description}>
        Select the word shown on the monitors to reveal the 6-number console code.
      </p>

      <p className={styles.instruction}>
        Decode the pigpen cipher on the monitors, then select the matching word below to get the code to enter on the console.
      </p>

      <div className={styles.wordCards}>
        {WORDS.map((word) => (
          <button
            key={word}
            className={`${styles.wordCard} ${selected === word ? styles.wordCardActive : ''}`}
            onClick={() => setSelected(word)}
            aria-pressed={selected === word}
          >
            {word}
          </button>
        ))}
      </div>

      {digits ? (
        <div className={styles.codeDisplay}>
          <span className={styles.codeWord}>Code for {selected}</span>
          <div className={styles.codeDigits}>
            {digits.map((digit, i) => (
              <span key={i}>
                <span className={styles.digitBox}>{digit}</span>
                {i < digits.length - 1 && (
                  <span className={styles.codeSeparator} aria-hidden="true" />
                )}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.placeholder}>
          Select a word above to see the console code.
        </div>
      )}
    </div>
  );
}
