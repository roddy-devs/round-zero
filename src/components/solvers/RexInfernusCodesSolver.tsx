import { useRef, useState } from 'react';
import styles from './RexInfernusCodesSolver.module.css';

const FRACTURE_DIALS = [
  { dial: 1, position: 'Middle' },
  { dial: 2, position: 'Right' },
  { dial: 3, position: 'Left' },
  { dial: 4, position: 'Right' },
  { dial: 5, position: 'Middle' },
  { dial: 6, position: 'Middle' },
  { dial: 7, position: 'Left' },
];

const HOUSE_CODE_LENGTH = 4;
const HOUSE_SYMBOLS = new Set(['M', 'H', 'U', 'D']);

export function RexInfernusCodesSolver() {
  const [houseCode, setHouseCode] = useState<string[]>(Array(HOUSE_CODE_LENGTH).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleHouseCodeChange = (index: number, value: string) => {
    const symbol = value.slice(-1).toUpperCase();
    if (symbol && !HOUSE_SYMBOLS.has(symbol)) {
      return;
    }

    setHouseCode((current) => {
      const next = [...current];
      next[index] = symbol;
      return next;
    });

    if (symbol && index < HOUSE_CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleHouseCodeKeyDown = (index: number, value: string, key: string) => {
    if (key === 'Backspace' && !value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const clearHouseCode = () => {
    setHouseCode(Array(HOUSE_CODE_LENGTH).fill(''));
    inputsRef.current[0]?.focus();
  };

  return (
    <div className={styles.solver}>
      <section className={styles.section}>
        <h3 className={styles.title}>Nyxara&apos;s Fracture</h3>
        <p className={styles.description}>Set the seven dials to these positions.</p>
        <ol className={styles.dialList}>
          {FRACTURE_DIALS.map(({ dial, position }) => (
            <li key={dial} className={styles.dialItem}>
              <span>Dial {dial}</span>
              <strong>{position}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <h3 className={styles.title}>Piano Code</h3>
        <p className={styles.description}>Enter the notes in this order.</p>
        <output className={styles.pianoCode}>867565354</output>
      </section>

      <section className={styles.section}>
        <h3 className={styles.title}>House Code</h3>
        <p className={styles.description}>
          Record the four house symbols. Use M (Mike Diaz and Dog), H (Hotel), U (Uniform), or D.
        </p>
        <div className={styles.codeInputs} aria-label="Four-character house code">
          {houseCode.map((symbol, index) => (
            <input
              key={index}
              ref={(element) => {
                inputsRef.current[index] = element;
              }}
              aria-label={`House code symbol ${index + 1}`}
              className={styles.symbolInput}
              type="text"
              maxLength={1}
              value={symbol}
              onChange={(event) => handleHouseCodeChange(index, event.target.value)}
              onKeyDown={(event) => handleHouseCodeKeyDown(index, symbol, event.key)}
            />
          ))}
        </div>
        <button type="button" className={styles.clearButton} onClick={clearHouseCode}>
          Clear house code
        </button>
      </section>
    </div>
  );
}
