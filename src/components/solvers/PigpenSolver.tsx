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

type SymbolInfo = { grid: 'ttt' | 'x'; position: number; hasDot: boolean };

function getSymbolInfo(letter: string): SymbolInfo {
  const code = letter.charCodeAt(0) - 65;
  if (code < 9) return { grid: 'ttt', position: code, hasDot: false };
  if (code < 18) return { grid: 'ttt', position: code - 9, hasDot: true };
  if (code < 22) return { grid: 'x', position: code - 18, hasDot: false };
  return { grid: 'x', position: code - 22, hasDot: true };
}

function PigpenGlyph({ letter }: { letter: string }) {
  const { grid, position, hasDot } = getSymbolInfo(letter);
  const size = 28;
  const margin = 3;
  const max = size - margin;
  const cx = size / 2;
  const cy = size / 2;
  const stroke = '#e2e8f0';
  const sw = 2.5;

  if (grid === 'ttt') {
    const borders: Record<number, { top: boolean; right: boolean; bottom: boolean; left: boolean }> = {
      0: { top: false, right: true, bottom: true, left: false },
      1: { top: false, right: true, bottom: true, left: true },
      2: { top: false, right: false, bottom: true, left: true },
      3: { top: true, right: true, bottom: true, left: false },
      4: { top: true, right: true, bottom: true, left: true },
      5: { top: true, right: false, bottom: true, left: true },
      6: { top: true, right: true, bottom: false, left: false },
      7: { top: true, right: true, bottom: false, left: true },
      8: { top: true, right: false, bottom: false, left: true },
    };
    const b = borders[position];
    return (
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
        {b.top && <line x1={margin} y1={margin} x2={max} y2={margin} stroke={stroke} strokeWidth={sw} />}
        {b.bottom && <line x1={margin} y1={max} x2={max} y2={max} stroke={stroke} strokeWidth={sw} />}
        {b.left && <line x1={margin} y1={margin} x2={margin} y2={max} stroke={stroke} strokeWidth={sw} />}
        {b.right && <line x1={max} y1={margin} x2={max} y2={max} stroke={stroke} strokeWidth={sw} />}
        {hasDot && <circle cx={cx} cy={cy} r={2.5} fill={stroke} />}
      </svg>
    );
  }

  const xLines: Record<number, Array<[number, number, number, number]>> = {
    0: [[margin, max, cx, cy], [max, max, cx, cy]],
    1: [[margin, margin, cx, cy], [margin, max, cx, cy]],
    2: [[margin, margin, cx, cy], [max, margin, cx, cy]],
    3: [[max, margin, cx, cy], [max, max, cx, cy]],
  };
  const lines = xLines[position];
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={sw} />
      ))}
      {hasDot && <circle cx={cx} cy={cy} r={2.5} fill={stroke} />}
    </svg>
  );
}

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
              <span className={styles.glyphs}>
                {word.split('').map((letter, i) => (
                  <PigpenGlyph key={i} letter={letter} />
                ))}
              </span>
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
