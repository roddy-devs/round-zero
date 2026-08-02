import { useState, useMemo } from 'react';
import styles from './MurderCaseSolver.module.css';

const SYMPTOM_TOXINS: Record<string, string[]> = {
  plant: ['flower', 'plumpits'],
  emesis: ['plumpits', 'pufferfish'],
  paralysis: ['pufferfish', 'flower'],
};

const ACCOMPLICE_EXCLUDES: Record<string, string> = {
  courtier: 'plumpits',
  merchant: 'flower',
  gardener: 'pufferfish',
};

const TOXIN_NAMES: Record<string, string> = {
  flower: 'Monkshood',
  plumpits: 'Plum Pits',
  pufferfish: 'Pufferfish',
};

const ACCOMPLICE_ITEMS: Record<string, string> = {
  merchant: 'Abacus',
  courtier: "Noble's Hat",
  gardener: "Gardener's Shears",
};

const SYMBOL_ITEMS: Record<string, string> = {
  fish: 'Tea Whisk',
  mountains: 'Horse Statuette',
  bird: 'Calligraphy Brush',
};

const ZODIAC = [
  'Rat', 'Ox', 'Tiger', 'Hare', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Boar',
];

export function MurderCaseSolver() {
  const [accomplice, setAccomplice] = useState('');
  const [symptom, setSymptom] = useState('');
  const [tod, setTod] = useState('');
  const [hours, setHours] = useState('');
  const [painting4, setPainting4] = useState('');

  const results = useMemo(() => {
    const painting1 = 'Comb';
    const painting5 = 'Crest Medallion';

    // Painting 2: accomplice item
    const painting2 = accomplice ? ACCOMPLICE_ITEMS[accomplice] ?? null : null;

    // Painting 3: toxin deduction
    let painting3: string | null = null;
    if (symptom && accomplice) {
      const candidates = SYMPTOM_TOXINS[symptom]?.filter(
        (t) => t !== ACCOMPLICE_EXCLUDES[accomplice]
      );
      if (candidates?.length === 1) {
        painting3 = TOXIN_NAMES[candidates[0]];
      }
    }

    // Painting 4: symbol lookup
    const painting4Result = painting4 ? SYMBOL_ITEMS[painting4] ?? null : null;

    // Zodiac dial
    let dial: string | null = null;
    if (tod !== '' && hours !== '') {
      const todIdx = parseInt(tod);
      const h = parseInt(hours);
      if (!isNaN(todIdx) && !isNaN(h)) {
        const dialIdx = ((todIdx - h) % 12 + 12) % 12;
        dial = ZODIAC[dialIdx];
      }
    }

    return { painting1, painting2, painting3, painting4: painting4Result, painting5, dial };
  }, [accomplice, symptom, tod, hours, painting4]);

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Murder Case Solver</h3>
      <p className={styles.description}>
        Enter what you found in-game to solve the mystery paintings and zodiac dial.
      </p>

      <div className={styles.inputs}>
        <div className={styles.field}>
          <label className={styles.label}>Accomplice (from ghost testimony)</label>
          <select className={styles.select} value={accomplice} onChange={(e) => setAccomplice(e.target.value)}>
            <option value="">— Select —</option>
            <option value="merchant">Merchant</option>
            <option value="courtier">Noble / Courtier</option>
            <option value="gardener">Gardener</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Cause of Death (from Death Records)</label>
          <select className={styles.select} value={symptom} onChange={(e) => setSymptom(e.target.value)}>
            <option value="">— Select —</option>
            <option value="plant">Noxious plant</option>
            <option value="emesis">Noxious food + emesis</option>
            <option value="paralysis">Evidence of paralysis</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Time of Death — Zodiac Animal</label>
          <select className={styles.select} value={tod} onChange={(e) => setTod(e.target.value)}>
            <option value="">— Select —</option>
            {ZODIAC.map((z, i) => (
              <option key={z} value={i}>{z}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Toxin Effect Time (hours)</label>
          <select className={styles.select} value={hours} onChange={(e) => setHours(e.target.value)}>
            <option value="">— Select —</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} hour{i > 0 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Symbol on 4th Painting</label>
          <select className={styles.select} value={painting4} onChange={(e) => setPainting4(e.target.value)}>
            <option value="">— Select —</option>
            <option value="fish">Fish</option>
            <option value="mountains">Mountains</option>
            <option value="bird">Bird</option>
          </select>
        </div>
      </div>

      <div className={styles.resultsSection}>
        <h4 className={styles.resultsTitle}>Paintings</h4>
        <div className={styles.paintingGrid}>
          {[
            { label: '1 — Suspect', value: results.painting1 },
            { label: '2 — Accomplice', value: results.painting2 },
            { label: '3 — Poison', value: results.painting3 },
            { label: '4 — Location', value: results.painting4 },
            { label: '5 — Motive', value: results.painting5 },
          ].map((p) => (
            <div key={p.label} className={`${styles.paintingCard} ${p.value ? styles.cardSolved : ''}`}>
              <span className={styles.cardLabel}>{p.label}</span>
              <span className={styles.cardValue}>{p.value ?? 'Pending...'}</span>
            </div>
          ))}
        </div>

        <div className={styles.dialSection}>
          <h4 className={styles.resultsTitle}>Zodiac Dial</h4>
          <div className={`${styles.dialResult} ${results.dial ? styles.dialSolved : ''}`}>
            {results.dial ?? 'Set time of death and toxin hours above'}
          </div>
        </div>
      </div>
    </div>
  );
}
