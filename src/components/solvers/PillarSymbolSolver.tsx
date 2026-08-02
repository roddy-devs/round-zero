import { useState } from 'react';
import styles from './PillarSymbolSolver.module.css';

/**
 * 5 pillar symbols on Mars, each at a fixed map position.
 * The organ shows 5 in order with one hidden by distortion.
 * User marks which 4 they can see — solver reveals the missing one.
 */
const SYMBOLS = [
  { id: 1, name: 'Diamond', location: 'Back Left' },
  { id: 2, name: 'X', location: 'Far Left' },
  { id: 3, name: 'Glove', location: 'Center Right' },
  { id: 4, name: 'Circle', location: 'Top Right' },
  { id: 5, name: 'Everything', location: 'Bottom Right' },
] as const;

export function PillarSymbolSolver() {
  // 5 slots for the organ sequence. User fills in 4 they can see.
  const [sequence, setSequence] = useState<(number | null)[]>([null, null, null, null, null]);

  const usedSymbols = sequence.filter((s): s is number => s !== null);
  const missingSymbol = SYMBOLS.find((s) => !usedSymbols.includes(s.id)) ?? null;
  const hiddenSlot = sequence.indexOf(null);

  const handleSelect = (slotIdx: number, symbolId: number) => {
    setSequence((prev) => {
      const next = [...prev];
      // Remove this symbol from any other slot
      const existingIdx = next.indexOf(symbolId);
      if (existingIdx !== -1) next[existingIdx] = null;
      next[slotIdx] = symbolId;
      return next;
    });
  };

  const handleClear = () => {
    setSequence([null, null, null, null, null]);
  };

  const isSolved = usedSymbols.length === 4 && missingSymbol !== null;

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Pillar Symbol Solver</h3>
      <p className={styles.description}>
        The organ screen shows 5 symbols in order, but one is hidden by distortion.
        Select the 4 symbols you can see in their positions — the solver reveals the missing one.
      </p>

      <div className={styles.slots}>
        {sequence.map((symbolId, slotIdx) => (
          <div key={slotIdx} className={`${styles.slot} ${symbolId !== null ? styles.slotFilled : ''} ${isSolved && symbolId === null ? styles.slotMissing : ''}`}>
            <span className={styles.slotLabel}>
              {isSolved && symbolId === null ? '?' : slotIdx + 1}
            </span>
            {isSolved && symbolId === null ? (
              <div className={styles.solvedSlot}>
                <span className={styles.solvedName}>{missingSymbol!.name}</span>
                <span className={styles.solvedLocation}>Pillar: {missingSymbol!.location}</span>
              </div>
            ) : (
              <select
                className={styles.select}
                value={symbolId ?? ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setSequence((prev) => {
                      const next = [...prev];
                      next[slotIdx] = null;
                      return next;
                    });
                  } else {
                    handleSelect(slotIdx, parseInt(val));
                  }
                }}
              >
                <option value="">{slotIdx + 1}. — Select symbol —</option>
                {SYMBOLS.map((sym) => (
                  <option key={sym.id} value={sym.id} disabled={usedSymbols.includes(sym.id) && sequence[slotIdx] !== sym.id}>
                    {sym.name}
                  </option>
                ))}
                <option value="hidden" disabled>⬛ Hidden (distorted)</option>
              </select>
            )}
          </div>
        ))}
      </div>

      {isSolved && (
        <div className={styles.result}>
          <span className={styles.resultLabel}>Hidden Symbol (Position {hiddenSlot + 1})</span>
          <span className={styles.resultName}>{missingSymbol!.name}</span>
          <span className={styles.resultLocation}>📍 Pillar Location: {missingSymbol!.location}</span>
        </div>
      )}

      <div className={styles.reference}>
        <h4 className={styles.referenceTitle}>Symbol Reference — Pillar Locations</h4>
        <img
          src="/images/astra/pillar-symbols.webp"
          alt="Map showing the 5 pillar symbol locations on Mars"
          className={styles.referenceImage}
        />
        <div className={styles.referenceGrid}>
          {SYMBOLS.map((sym) => (
            <div key={sym.id} className={`${styles.referenceCard} ${isSolved && missingSymbol?.id === sym.id ? styles.referenceHighlight : ''}`}>
              <span className={styles.refNumber}>{sym.id}</span>
              <span className={styles.refName}>{sym.name}</span>
              <span className={styles.refLocation}>{sym.location}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.clearBtn} onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}
