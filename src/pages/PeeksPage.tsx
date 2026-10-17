import { useState } from 'react';
import {
  PEEKS_SPAWN_CHANCE,
  EGG_TIER_ODDS,
  peeksSpawnedAtLeastOnce,
  type CursedModeKind,
} from '../data/dropRates';
import { DataTable, type DataColumn, type DataRow } from '../components/DataTable';
import styles from './DropRates.module.css';

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
const pct0 = (n: number) => `${(n * 100).toFixed(0)}%`;

const MODES: { id: CursedModeKind; label: string }[] = [
  { id: 'normal', label: 'Cursed' },
  { id: 'mayhem', label: 'Mayhem' },
];

const TIERS: (1 | 2 | 3)[] = [1, 2, 3];

export function PeeksPage() {
  const [mode, setMode] = useState<CursedModeKind>('normal');
  const [rounds, setRounds] = useState(10);

  const perRound = PEEKS_SPAWN_CHANCE[mode];
  const atLeastOnce = peeksSpawnedAtLeastOnce(mode, rounds);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Black Ops 7 · Cursed · Drop Rates</span>
          <h1 className={styles.heroTitle}>Mr. Peeks &amp; Eggs</h1>
          <p className={styles.heroSubtitle}>
            Per-round spawn chances, the odds Mr. Peeks has shown up over a stretch of
            rounds, and the metal-tier rarities for each egg tier.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        {/* ─── Spawn calculator ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Spawn Calculator</h2>
          <div className={styles.calc}>
            <div className={styles.controls}>
              <div className={styles.control}>
                <span className={styles.controlLabel}>Mode</span>
                <div className={styles.chips}>
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      className={`${styles.chip} ${mode === m.id ? styles.chipActive : ''}`}
                      onClick={() => setMode(m.id)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.control}>
                <span className={styles.controlLabel}>Rounds played</span>
                <div className={styles.stepper}>
                  <button
                    className={styles.stepperButton}
                    onClick={() => setRounds((r) => Math.max(1, r - 1))}
                    aria-label="Decrease rounds"
                  >
                    −
                  </button>
                  <input
                    className={styles.numberInput}
                    type="number"
                    min={1}
                    value={rounds}
                    onChange={(e) =>
                      setRounds(Math.max(1, Math.min(999, Number(e.target.value) || 1)))
                    }
                  />
                  <button
                    className={styles.stepperButton}
                    onClick={() => setRounds((r) => Math.min(999, r + 1))}
                    aria-label="Increase rounds"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.result}>
              <div className={styles.bigStat}>
                <span className={styles.bigStatValue}>{pct(atLeastOnce)}</span>
                <span className={styles.bigStatLabel}>
                  chance Mr. Peeks has spawned at least once over {rounds} round
                  {rounds > 1 ? 's' : ''}
                </span>
              </div>
              <p className={styles.sectionNote}>
                Per-round spawn chance in {mode === 'mayhem' ? 'Mayhem' : 'Cursed'}:{' '}
                <strong>{pct0(perRound)}</strong>. Formula: 1 − (1 − {perRound})
                <sup>rounds</sup>, assuming each round rolls independently.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Spawn chance table ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Per-Round Spawn Chance</h2>
          <DataTable
            columns={
              [
                { key: 'mode', label: 'Mode' },
                { key: 'chance', label: 'Chance each round', numeric: true },
              ] as DataColumn[]
            }
            rows={
              MODES.map((m) => ({
                key: m.id,
                active: m.id === mode,
                cells: { mode: m.label, chance: pct0(PEEKS_SPAWN_CHANCE[m.id]) },
              })) as DataRow[]
            }
            caption="Per-round spawn chance"
          />
        </section>

        {/* ─── Egg tier odds ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Egg Tier Rarities</h2>
          <p className={styles.sectionNote}>
            Metal breakdown for each egg tier, by mode. Currently showing{' '}
            <strong>{mode === 'mayhem' ? 'Mayhem' : 'Cursed'}</strong>.
          </p>
          <DataTable
            columns={
              [
                { key: 'tier', label: 'Egg tier' },
                { key: 'bronze', label: 'Bronze', numeric: true },
                { key: 'silver', label: 'Silver', numeric: true },
                { key: 'gold', label: 'Gold', numeric: true },
              ] as DataColumn[]
            }
            rows={
              TIERS.map((t) => {
                const o = EGG_TIER_ODDS[mode][t];
                return {
                  key: String(t),
                  cells: {
                    tier: `Tier ${t}`,
                    bronze: <span className={styles.orange}>{pct0(o.bronze)}</span>,
                    silver: <span className={styles.muted}>{pct0(o.silver)}</span>,
                    gold: <span className={styles.orange}>{pct0(o.gold)}</span>,
                  },
                };
              }) as DataRow[]
            }
            caption="Egg tier rarities"
          />
        </section>
      </div>
    </div>
  );
}
