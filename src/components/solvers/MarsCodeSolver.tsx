import { useState } from 'react';
import styles from './MarsCodeSolver.module.css';

export function MarsCodeSolver() {
  const [code, setCode] = useState(['', '', '', '']);

  const handleChange = (idx: number, value: string) => {
    if (value.length > 1) return;
    const next = [...code];
    next[idx] = value;
    setCode(next);
  };

  const handleClear = () => {
    setCode(['', '', '', '']);
  };

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Mars Coordinates Code</h3>
      <p className={styles.description}>
        Enter the 4-digit declination code from the telescope.
      </p>

      <div className={styles.codeInputs}>
        {code.map((digit, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={styles.digitInput}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !digit && i > 0) {
                const prev = document.querySelectorAll(`.${styles.digitInput}`)[i - 1] as HTMLInputElement;
                prev?.focus();
              }
            }}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value && i < 3) {
                const next = document.querySelectorAll(`.${styles.digitInput}`)[i + 1] as HTMLInputElement;
                next?.focus();
              }
            }}
          />
        ))}
      </div>

      {code.every((d) => d !== '') && (
        <div className={styles.result}>
          <span className={styles.resultLabel}>Code</span>
          <span className={styles.resultCode}>{code.join('')}</span>
        </div>
      )}

      <div className={styles.actions}>
        <button className={styles.clearBtn} onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}
