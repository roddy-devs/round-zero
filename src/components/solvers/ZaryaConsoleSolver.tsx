import { useState } from 'react';
import styles from './ZaryaConsoleSolver.module.css';

const CODES: Record<string, string[]> = {
  LAUNCH: ['11', '00', '20', '13', '02', '07'],
  WEAPON: ['22', '04', '00', '15', '14', '13'],
  ENGINE: ['04', '13', '06', '08', '13', '04'],
  ROCKET: ['17', '14', '02', '10', '04', '19'],
};

const WORDS = Object.keys(CODES) as Array<keyof typeof CODES>;

type SymbolInfo = { grid: 'box' | 'x'; position: number; hasDot: boolean };

function getSymbolInfo(letter: string): SymbolInfo {
  const code = letter.charCodeAt(0) - 65;
  if (code < 9) return { grid: 'box', position: code, hasDot: false };
  if (code < 18) return { grid: 'box', position: code - 9, hasDot: true };
  if (code < 22) return { grid: 'x', position: code - 18, hasDot: false };
  return { grid: 'x', position: code - 22, hasDot: true };
}

function PigpenGlyph({ letter }: { letter: string }) {
  const { grid, position, hasDot } = getSymbolInfo(letter);
  const size = 32;
  const m = 5;
  const max = size - m;
  const cx = size / 2;
  const cy = size / 2;
  const stroke = '#e2e8f0';
  const sw = 2.5;

  if (grid === 'box') {
    const walls: Record<number, [boolean, boolean, boolean, boolean]> = {
      0: [false, true,  true,  false],
      1: [false, true,  true,  true ],
      2: [false, false, true,  true ],
      3: [true,  true,  true,  false],
      4: [true,  true,  true,  true ],
      5: [true,  false, true,  true ],
      6: [true,  true,  false, false],
      7: [true,  true,  false, true ],
      8: [true,  false, false, true ],
    };
    const [top, right, bottom, left] = walls[position];
    return (
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
        {top    && <line x1={m} y1={m} x2={max} y2={m} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />}
        {right  && <line x1={max} y1={m} x2={max} y2={max} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />}
        {bottom && <line x1={m} y1={max} x2={max} y2={max} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />}
        {left   && <line x1={m} y1={m} x2={m} y2={max} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />}
        {hasDot && <circle cx={cx} cy={cy} r={3} fill={stroke} />}
      </svg>
    );
  }

  const wedges: Record<number, Array<[number, number, number, number]>> = {
    0: [[m, m, cx, cy], [max, m, cx, cy]],
    1: [[m, m, cx, cy], [m, max, cx, cy]],
    2: [[max, m, cx, cy], [max, max, cx, cy]],
    3: [[m, max, cx, cy], [max, max, cx, cy]],
  };
  const lines = wedges[position];
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      ))}
      {hasDot && <circle cx={cx} cy={cy} r={3} fill={stroke} />}
    </svg>
  );
}

export function ZaryaConsoleSolver() {
  const [selected, setSelected] = useState<string | null>(null);

  const digits = selected ? CODES[selected] : null;

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Zarya Console Solver</h3>
      <p className={styles.description}>
        Match the pigpen cipher shown on the monitors to one of the words below. Select it to reveal the word and the 6-number code.
      </p>

      <div className={styles.wordCards}>
        {WORDS.map((word) => (
          <button
            key={word}
            className={`${styles.wordCard} ${selected === word ? styles.wordCardActive : ''}`}
            onClick={() => setSelected(word)}
            aria-pressed={selected === word}
          >
            <span className={styles.pigpenGlyphs}>
              {word.split('').map((letter, i) => (
                <PigpenGlyph key={i} letter={letter} />
              ))}
            </span>
          </button>
        ))}
      </div>

      {digits ? (
        <div className={styles.codeDisplay}>
          <span className={styles.codeWord}>{selected}</span>
          <div className={styles.codeDigits}>
            {digits.map((digit, i) => (
              <span key={i}>
                <span className={styles.digitBox}>{digit}</span>
                {i < digits.length - 1 && (
                  <span className={styles.codeSeparator} aria-hidden="true">-</span>
                )}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.placeholder}>
          Select the matching pigpen cipher above to see the word and code.
        </div>
      )}
    </div>
  );
}
