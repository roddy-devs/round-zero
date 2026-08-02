import { useState } from 'react';
import styles from './NoteOrderSolver.module.css';

const LOCATIONS = [
  'Green House Front',
  'Green House Back',
  'Yellow House Front',
  'Yellow House Back',
  'Trinity Ave',
  'Cul-De-Sac',
  'Truck Interior',
  'Backyard',
] as const;

const PIANO_ORDER = '8-6-7-5-6-5-3-5';
const NOTE_COUNT = 8;

interface NoteState {
  location: string;
  found: boolean;
  interacted: boolean;
}

function createEmptyNotes(): NoteState[] {
  return Array.from({ length: NOTE_COUNT }, () => ({
    location: '',
    found: false,
    interacted: false,
  }));
}

export function NoteOrderSolver() {
  const [notes, setNotes] = useState<NoteState[]>(createEmptyNotes);

  const updateNote = (index: number, patch: Partial<NoteState>) => {
    setNotes((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  };

  const handleReset = () => {
    setNotes(createEmptyNotes());
  };

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Blue Note Order Tracker</h3>
      <p className={styles.description}>
        Track the 8 blue notes scattered around Destroyed Nuketown. Each note
        blinks 1–8 times indicating its collection order.
      </p>

      <div className={styles.instructions}>
        <h4 className={styles.instructionsTitle}>How it works</h4>
        <ol className={styles.instructionsList}>
          <li className={styles.instructionItem}>
            Find all 8 blue notes around the map. Count each note's blinks to
            determine its order number (1–8).
          </li>
          <li className={styles.instructionItem}>
            Interact with the notes in blink order (1 blink first, then 2,
            etc.) to complete the collection step.
          </li>
          <li className={styles.instructionItem}>
            After collecting all notes, play the piano using the wall order
            shown below: <strong>{PIANO_ORDER}</strong>
          </li>
        </ol>
      </div>

      <div className={styles.grid}>
        {notes.map((note, i) => (
          <div
            key={i}
            className={`${styles.noteSlot} ${
              note.interacted
                ? styles.noteSlotInteracted
                : note.found
                  ? styles.noteSlotFound
                  : ''
            }`}
          >
            <div className={styles.noteHeader}>
              <span className={styles.noteNumber}>{i + 1}</span>
              <span className={styles.blinkLabel}>
                {i + 1} blink{i > 0 ? 's' : ''}
              </span>
            </div>

            <select
              className={styles.locationSelect}
              value={note.location}
              onChange={(e) => updateNote(i, { location: e.target.value })}
              aria-label={`Location for note ${i + 1}`}
            >
              <option value="">— Location —</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <div className={styles.checkboxes}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={note.found}
                  onChange={(e) => updateNote(i, { found: e.target.checked })}
                />
                Found
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={note.interacted}
                  onChange={(e) =>
                    updateNote(i, { interacted: e.target.checked })
                  }
                />
                Done
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.answerBox}>
        <h4 className={styles.answerTitle}>Piano Wall Order</h4>
        <div className={styles.answerSequence}>{PIANO_ORDER}</div>
        <p className={styles.answerNote}>
          After collecting all 8 blue notes in blink order, play the piano keys
          in this wall order to complete the step.
        </p>
      </div>

      <div className={styles.actions}>
        <button className={styles.resetBtn} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
