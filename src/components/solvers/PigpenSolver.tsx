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

/**
 * Standard Pigpen Cipher mapping:
 *   Grid 1 (no dot):  A-I in a 3x3 tic-tac-toe
 *   Grid 1 (dot):     J-R in the same 3x3 with a dot
 *   X grid (no dot):  S, T, U, V
 *   X grid (dot):     W, X, Y, Z
 *
 * Each letter's symbol is the WALLS surrounding its cell.
 *
 * 3x3 grid positions (reading order):
 *   0=top-left  1=top-center  2=top-right
 *   3=mid-left  4=center      5=mid-right
 *   6=bot-left  7=bot-center  8=bot-right
 *
 * X grid positions:
 *   0=top  1=left  2=right  3=bottom
 */

type SymbolInfo = { grid: 'box' | 'x'; position: number; hasDot: boolean };

function getSymbolInfo(letter: string): SymbolInfo {
  const code = letter.charCodeAt(0) - 65; // A=0, B=1, ...
  if (code < 9) return { grid: 'box', position: code, hasDot: false };
  if (code < 18) return { grid: 'box', position: code - 9, hasDot: true };
  if (code < 22) return { grid: 'x', position: code - 18, hasDot: false };
  return { grid: 'x', position: code - 22, hasDot: true };
}

function PigpenGlyph({ letter }: { letter: string }) {
  const { grid, position, hasDot } = getSymbolInfo(letter);
  const size = 36;
  const m = 6; // margin from edge
  const max = size - m;
  const cx = size / 2;
  const cy = size / 2;
  const stroke = '#e2e8f0';
  const sw = 2.5;

  if (grid === 'box') {
    // Which walls to draw for each cell in the 3x3 grid
    // A cell shows the walls that BOUND it (not the open sides)
    const walls: Record<number, [boolean, boolean, boolean, boolean]> = {
      //        top     right   bottom  left
      0: [false, true,  true,  false],   // A / J
      1: [false, true,  true,  true ],   // B / K
      2: [false, false, true,  true ],   // C / L
      3: [true,  true,  true,  false],   // D / M
      4: [true,  true,  true,  true ],   // E / N
      5: [true,  false, true,  true ],   // F / O
      6: [true,  true,  false, false],   // G / P
      7: [true,  true,  false, true ],   // H / Q
      8: [true,  false, false, true ],   // I / R
    };
    const [top, right, bottom, left] = walls[position];

    return (
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true" className={styles.glyph}>
        {top    && <line x1={m} y1={m} x2={max} y2={m} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />}
        {right  && <line x1={max} y1={m} x2={max} y2={max} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />}
        {bottom && <line x1={m} y1={max} x2={max} y2={max} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />}
        {left   && <line x1={m} y1={m} x2={m} y2={max} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />}
        {hasDot && <circle cx={cx} cy={cy} r={3} fill={stroke} />}
      </svg>
    );
  }

  // X grid: each position is a "wedge" of the X
  // pos 0 (S/W) = top wedge: lines from top-left and top-right to center
  // pos 1 (T/X) = left wedge: lines from top-left and bottom-left to center
  // pos 2 (U/Y) = right wedge: lines from top-right and bottom-right to center
  // pos 3 (V/Z) = bottom wedge: lines from bottom-left and bottom-right to center
  const wedges: Record<number, Array<[number, number, number, number]>> = {
    0: [[m, m, cx, cy], [max, m, cx, cy]],       // top: ∧
    1: [[m, m, cx, cy], [m, max, cx, cy]],       // left: <
    2: [[max, m, cx, cy], [max, max, cx, cy]],   // right: >
    3: [[m, max, cx, cy], [max, max, cx, cy]],   // bottom: ∨
  };
  const lines = wedges[position];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true" className={styles.glyph}>
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      ))}
      {hasDot && <circle cx={cx} cy={cy} r={3} fill={stroke} />}
    </svg>
  );
}

export function PigpenSolver() {
  const [selections, setSelections] = useState<(string | null)[]>([null, null, null]);

  const handleSelect = (word: string) => {
    setSelections((prev) => {
      const existingIdx = prev.indexOf(word);
      if (existingIdx !== -1) {
        const next = [...prev];
        next[existingIdx] = null;
        return next;
      }
      const emptyIdx = prev.indexOf(null);
      if (emptyIdx === -1) return prev;
      const next = [...prev];
      next[emptyIdx] = word;
      return next;
    });
  };

  const handleClear = () => setSelections([null, null, null]);

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
