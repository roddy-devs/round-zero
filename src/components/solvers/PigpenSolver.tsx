import { useState } from 'react';
import styles from './PigpenSolver.module.css';

const INGREDIENTS: Record<string, string> = {
  FUNGI: "Widow's Lantern",
  LIMBS: 'Mysterious Limb',
  OCULI: 'Ravager Eyes',
  CONCH: 'Hoard Hunk Chucks',
  TALUS: 'Human Bones',
};

const WORDS = Object.keys(INGREDIENTS);

export function PigpenSolver() {
  const [selections, setSelections] = useState<(string | null)[]>([null, null, null]);

  const handleSelect = (word: string) => {
    setSelections((prev) => {
      // If already selected, remove it
      const existingIdx = prev.indexOf(word);
      if (existingIdx !== -1) {
        const next = [...prev];
        next[existingIdx] = null;
        return next;
      }
      // Place in first empty slot
      const emptyIdx = prev.indexOf(null);
      if (emptyIdx === -1) return prev;
      const next = [...prev];
      next[emptyIdx] = word;
      return next;
    });
  };

  const handleClear = () => {
    setSelections([null, null, null]);
  };

  const getSlotNumber = (word: string): number | null => {
    const idx = selections.indexOf(word);
    return idx !== -1 ? idx + 1 : null;
  };

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Pigpen Cipher Solver</h3>
      <p className={styles.description}>
        Select the 3 pigpen symbols from the chalkboard in order (top to bottom) to see which ingredients you need.
      </p>

      <div className={styles.wordCards}>
        {WORDS.map((word) => {
          const slot = getSlotNumber(word);
          return (
            <button
              key={word}
              className={`${styles.wordCard} ${slot !== null ? styles.wordCardActive : ''}`}
              onClick={() => handleSelect(word)}
              aria-pressed={slot !== null}
            >
              {slot !== null && <span className={styles.slotBadge}>{slot}</span>}
              <span className={styles.glyphs}>{word}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.results}>
        {selections.map((word, i) => (
          <div key={i} className={`${styles.slot} ${word ? styles.slotFilled : ''}`}>
            <span className={styles.slotNumber}>{i + 1}</span>
            {word ? (
              <div className={styles.slotContent}>
                <span className={styles.slotWord}>{word}</span>
                <span className={styles.slotArrow}>→</span>
                <span className={styles.slotIngredient}>{INGREDIENTS[word]}</span>
              </div>
            ) : (
              <span className={styles.slotPlaceholder}>Select ingredient {i + 1}…</span>
            )}
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.clearBtn} onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}
