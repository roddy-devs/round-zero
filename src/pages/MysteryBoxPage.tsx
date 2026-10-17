import { useMemo, useState } from 'react';
import {
  MYSTERY_BOX_RARITY,
  WEAPON_RARITY_SELECTION,
  WEAPON_CLASS_SHARES,
  computeMysteryBoxOutcomes,
  mysteryBoxRoundBand,
  weaponRarityBand,
  type MysteryBoxMode,
  type RoundBand,
  type WeaponRaritySelectionMode,
  type WeaponRarityRoundBand,
} from '../data/dropRates';
import styles from './DropRates.module.css';

/** The three UI modes map to a (box table, rarity table) pair. */
type UiMode = 'standard' | 'cursed' | 'peaks_mayhem';

const UI_MODES: { id: UiMode; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'cursed', label: 'Cursed' },
  { id: 'peaks_mayhem', label: 'Peaks Mayhem' },
];

function resolveModes(ui: UiMode): {
  boxMode: MysteryBoxMode;
  rarityMode: WeaponRaritySelectionMode;
} {
  if (ui === 'peaks_mayhem') {
    return { boxMode: 'peaks_mayhem', rarityMode: 'cursed' };
  }
  return {
    boxMode: 'standard_cursed',
    rarityMode: ui === 'cursed' ? 'cursed' : 'standard',
  };
}

const pct = (n: number) => `${(n * 100).toFixed(n < 0.1 && n > 0 ? 2 : 1)}%`;

const BOX_BANDS: RoundBand[] = [
  '1-5', '6-10', '11-15', '16-20', '21-25', '26-30', '31-35', '36+',
];

export function MysteryBoxPage() {
  const [ui, setUi] = useState<UiMode>('standard');
  const [round, setRound] = useState(10);

  const { boxMode, rarityMode } = resolveModes(ui);

  const calc = useMemo(
    () => computeMysteryBoxOutcomes(boxMode, rarityMode, round),
    [boxMode, rarityMode, round],
  );

  const activeBoxBand = mysteryBoxRoundBand(round);
  const activeRarityBand = weaponRarityBand(rarityMode, round);
  const maxOutcome = Math.max(...calc.outcomes.map((o) => o.probability), 0.0001);

  const rarityBands = Object.keys(
    WEAPON_RARITY_SELECTION[rarityMode],
  ) as WeaponRarityRoundBand[];

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Black Ops 7 · Drop Rates</span>
          <h1 className={styles.heroTitle}>Mystery Box</h1>
          <p className={styles.heroSubtitle}>
            Pull-rarity odds by round, the ordinary-weapon rarity selection, and a
            calculator that combines both to show exactly what a single spin is
            likely to give you.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        {/* ─── Calculator ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Pull Calculator</h2>
          <div className={styles.calc}>
            <div className={styles.controls}>
              <div className={styles.control}>
                <span className={styles.controlLabel}>Mode</span>
                <div className={styles.chips}>
                  {UI_MODES.map((m) => (
                    <button
                      key={m.id}
                      className={`${styles.chip} ${ui === m.id ? styles.chipActive : ''}`}
                      onClick={() => setUi(m.id)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.control}>
                <span className={styles.controlLabel}>Round</span>
                <div className={styles.stepper}>
                  <button
                    className={styles.stepperButton}
                    onClick={() => setRound((r) => Math.max(1, r - 1))}
                    aria-label="Decrease round"
                  >
                    −
                  </button>
                  <input
                    className={styles.numberInput}
                    type="number"
                    min={1}
                    value={round}
                    onChange={(e) =>
                      setRound(Math.max(1, Math.min(999, Number(e.target.value) || 1)))
                    }
                  />
                  <button
                    className={styles.stepperButton}
                    onClick={() => setRound((r) => Math.min(999, r + 1))}
                    aria-label="Increase round"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.result}>
              <p className={styles.resultMeta}>
                Box band <strong>{activeBoxBand}</strong> · rarity band{' '}
                <strong>{activeRarityBand}</strong>
                {mysteryBoxRoundBand(round) !== (activeRarityBand as string) &&
                  ' (rarity table is sparser — nearest band used)'}
              </p>
              <div className={styles.outcomes}>
                {calc.outcomes.map((o) => (
                  <div key={o.label} className={styles.outcome}>
                    <span className={styles.outcomeLabel}>{o.label}</span>
                    <div className={styles.outcomeBarTrack}>
                      <div
                        className={styles.outcomeBarFill}
                        style={{ width: `${(o.probability / maxOutcome) * 100}%` }}
                      />
                    </div>
                    <span className={styles.outcomeValue}>{pct(o.probability)}</span>
                  </div>
                ))}
              </div>
              <p className={styles.sectionNote}>
                Ordinary (non-Wonder) weapon chance this round:{' '}
                <strong>{pct(calc.ordinaryWeaponChance)}</strong>. If you pull an
                ordinary weapon, its class is chosen independently from the weapon-class
                table below.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Pull rarity table ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Pull Rarity by Round</h2>
          <p className={styles.sectionNote}>
            {ui === 'peaks_mayhem'
              ? 'Mr. Peeks Mayhem table (15% Wonder Weapon at round 36+).'
              : 'Standard / Cursed table (10% Wonder Weapon at round 36+).'}
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Rounds</th>
                  <th className={styles.num}>Uncommon</th>
                  <th className={styles.num}>Rare</th>
                  <th className={styles.num}>Epic</th>
                  <th className={styles.num}>Legendary</th>
                  <th className={styles.num}>Wonder Weapon</th>
                  <th className={styles.num}>Aether Tool</th>
                </tr>
              </thead>
              <tbody>
                {BOX_BANDS.map((band) => {
                  const row = MYSTERY_BOX_RARITY[boxMode][band];
                  return (
                    <tr key={band} className={band === activeBoxBand ? styles.rowActive : ''}>
                      <td className={styles.tdLabel}>{band}</td>
                      <td className={`${styles.num} ${styles.green}`}>{pct(row.uncommon)}</td>
                      <td className={`${styles.num} ${styles.blue}`}>{pct(row.rare)}</td>
                      <td className={`${styles.num} ${styles.purple}`}>{pct(row.epic)}</td>
                      <td className={`${styles.num} ${styles.orange}`}>{pct(row.legendary)}</td>
                      <td className={styles.num}>{pct(row.wonderWeapon)}</td>
                      <td className={`${styles.num} ${styles.muted}`}>{pct(row.aetherTool)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Weapon rarity selection ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ordinary Weapon Rarity Selection</h2>
          <p className={styles.sectionNote}>
            Used when the pull is a normal weapon (not a Wonder Weapon / Aether Tool) to
            decide its rarity. {rarityMode === 'cursed' ? 'Cursed' : 'Standard'} table.
            {rarityMode === 'cursed' && ' Ultra is a flat 0.5% (Cursed only).'}
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Rounds</th>
                  <th className={styles.num}>Uncommon</th>
                  <th className={styles.num}>Rare</th>
                  <th className={styles.num}>Epic</th>
                  <th className={styles.num}>Legendary</th>
                  {rarityMode === 'cursed' && <th className={styles.num}>Ultra</th>}
                </tr>
              </thead>
              <tbody>
                {rarityBands.map((band) => {
                  const row = WEAPON_RARITY_SELECTION[rarityMode][band]!;
                  return (
                    <tr key={band} className={band === activeRarityBand ? styles.rowActive : ''}>
                      <td className={styles.tdLabel}>{band}</td>
                      <td className={`${styles.num} ${styles.green}`}>{pct(row.green)}</td>
                      <td className={`${styles.num} ${styles.blue}`}>{pct(row.blue)}</td>
                      <td className={`${styles.num} ${styles.purple}`}>{pct(row.purple)}</td>
                      <td className={`${styles.num} ${styles.orange}`}>{pct(row.orange)}</td>
                      {rarityMode === 'cursed' && (
                        <td className={styles.num}>{pct(row.ultra ?? 0)}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Weapon class shares ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Weapon Class Shares</h2>
          <p className={styles.sectionNote}>
            Share of ordinary weapon selections by class — independent of rarity and round.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Weapon type</th>
                  <th className={styles.num}>Share</th>
                </tr>
              </thead>
              <tbody>
                {WEAPON_CLASS_SHARES.map((c) => (
                  <tr key={c.weaponClass}>
                    <td className={styles.tdLabel}>{c.weaponClass}</td>
                    <td className={styles.num}>{pct(c.share)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
