import { useState } from 'react';
import { MULTI_PACK, multiPackCumulative } from '../data/dropRates';
import { DataTable, type DataColumn, type DataRow } from '../components/DataTable';
import styles from './DropRates.module.css';

const pct = (n: number) => `${(n * 100).toFixed(0)}%`;
const pct1 = (n: number) => `${(n * 100).toFixed(1)}%`;

const FAILS: (0 | 1 | 2 | 3)[] = [0, 1, 2, 3];

export function MultiPackPage() {
  const [fails, setFails] = useState(0);

  const nextChance = MULTI_PACK.chanceByFails[Math.min(fails, 3) as 0 | 1 | 2 | 3];
  // Cumulative chance to have activated by the end of attempt (fails + 1).
  const cumulative = multiPackCumulative(fails + 1);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Black Ops 7 · Drop Rates</span>
          <h1 className={styles.heroTitle}>Multi Pack</h1>
          <p className={styles.heroSubtitle}>
            Multi Pack has a base {pct(MULTI_PACK.baseChance)} chance to activate when
            Pack-a-Punching. Each failed attempt adds another{' '}
            {pct(MULTI_PACK.perFailIncrement)} for the next attempt; a success resets it
            back to the base.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        {/* ─── Calculator ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Calculator</h2>
          <div className={styles.calc}>
            <div className={styles.controls}>
              <div className={styles.control}>
                <span className={styles.controlLabel}>Consecutive fails so far</span>
                <div className={styles.stepper}>
                  <button
                    className={styles.stepperButton}
                    onClick={() => setFails((f) => Math.max(0, f - 1))}
                    aria-label="Decrease fails"
                  >
                    −
                  </button>
                  <span className={styles.stepperValue}>{fails}</span>
                  <button
                    className={styles.stepperButton}
                    onClick={() => setFails((f) => Math.min(3, f + 1))}
                    aria-label="Increase fails"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.result}>
              <div className={styles.bigStat}>
                <span className={styles.bigStatValue}>{pct(nextChance)}</span>
                <span className={styles.bigStatLabel}>
                  chance on your next Pack-a-Punch attempt
                </span>
              </div>
              <p className={styles.sectionNote}>
                Cumulative chance you'll have hit Multi Pack by the end of this attempt
                (across all {fails + 1} attempts from a fresh start):{' '}
                <strong>{pct1(cumulative)}</strong>.
                {fails >= MULTI_PACK.guaranteedAfterFails &&
                  ` After ${MULTI_PACK.guaranteedAfterFails} fails it's guaranteed.`}
              </p>
            </div>
          </div>
        </section>

        {/* ─── Table ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Odds by Consecutive Fails</h2>
          <DataTable
            columns={
              [
                { key: 'state', label: 'State' },
                { key: 'chance', label: 'Next attempt chance', numeric: true },
              ] as DataColumn[]
            }
            rows={
              FAILS.map((f) => ({
                key: String(f),
                active: f === Math.min(fails, 3),
                cells: {
                  state: f === 0 ? 'Base (no fails)' : `${f} fail${f > 1 ? 's' : ''}`,
                  chance: pct(MULTI_PACK.chanceByFails[f]),
                },
              })) as DataRow[]
            }
            caption="Multi pack odds by consecutive fails"
          />
          <p className={styles.sectionNote}>
            When Multi Pack succeeds, it resets back to the base{' '}
            {pct(MULTI_PACK.baseChance)} chance.
          </p>
        </section>
      </div>
    </div>
  );
}
