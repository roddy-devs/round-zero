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
import { DataTable, type DataColumn, type DataRow } from '../components/DataTable';
import { Tabs } from '../components/Tabs';
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

  // ─── Table models ───
  const boxColumns: DataColumn[] = [
    { key: 'band', label: 'Rounds' },
    { key: 'uncommon', label: 'Uncommon', numeric: true },
    { key: 'rare', label: 'Rare', numeric: true },
    { key: 'epic', label: 'Epic', numeric: true },
    { key: 'legendary', label: 'Legendary', numeric: true },
    { key: 'ww', label: 'Wonder Weapon', numeric: true },
    { key: 'aether', label: 'Aether Tool', numeric: true },
  ];
  const boxRows: DataRow[] = BOX_BANDS.map((band) => {
    const row = MYSTERY_BOX_RARITY[boxMode][band];
    return {
      key: band,
      active: band === activeBoxBand,
      cells: {
        band,
        uncommon: <span className={styles.green}>{pct(row.uncommon)}</span>,
        rare: <span className={styles.blue}>{pct(row.rare)}</span>,
        epic: <span className={styles.purple}>{pct(row.epic)}</span>,
        legendary: <span className={styles.orange}>{pct(row.legendary)}</span>,
        ww: pct(row.wonderWeapon),
        aether: <span className={styles.muted}>{pct(row.aetherTool)}</span>,
      },
    };
  });

  const selColumns: DataColumn[] = [
    { key: 'band', label: 'Rounds' },
    { key: 'green', label: 'Uncommon', numeric: true },
    { key: 'blue', label: 'Rare', numeric: true },
    { key: 'purple', label: 'Epic', numeric: true },
    { key: 'orange', label: 'Legendary', numeric: true },
    ...(rarityMode === 'cursed'
      ? [{ key: 'ultra', label: 'Ultra', numeric: true } as DataColumn]
      : []),
  ];
  const selRows: DataRow[] = rarityBands.map((band) => {
    const row = WEAPON_RARITY_SELECTION[rarityMode][band]!;
    return {
      key: band,
      active: band === activeRarityBand,
      cells: {
        band,
        green: <span className={styles.green}>{pct(row.green)}</span>,
        blue: <span className={styles.blue}>{pct(row.blue)}</span>,
        purple: <span className={styles.purple}>{pct(row.purple)}</span>,
        orange: <span className={styles.orange}>{pct(row.orange)}</span>,
        ultra: pct(row.ultra ?? 0),
      },
    };
  });

  const classColumns: DataColumn[] = [
    { key: 'cls', label: 'Weapon type' },
    { key: 'share', label: 'Share', numeric: true },
  ];
  const classRows: DataRow[] = WEAPON_CLASS_SHARES.map((c) => ({
    key: c.weaponClass,
    cells: { cls: c.weaponClass, share: pct(c.share) },
  }));

  // ─── Tab panels ───
  const calculatorPanel = (
    <div className={styles.calc}>
      <div className={styles.controls}>
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
          <strong>{pct(calc.ordinaryWeaponChance)}</strong>. If you pull an ordinary
          weapon, its class is chosen independently from the weapon-class table.
        </p>
      </div>
    </div>
  );

  const pullRarityPanel = (
    <div className={styles.section}>
      <p className={styles.sectionNote}>
        {ui === 'peaks_mayhem'
          ? 'Mr. Peeks Mayhem table (15% Wonder Weapon at round 36+).'
          : 'Standard and Cursed share this table (10% Wonder Weapon at round 36+).'}
      </p>
      <DataTable columns={boxColumns} rows={boxRows} caption="Pull rarity by round" />
    </div>
  );

  const weaponPanel = (
    <div className={styles.stack}>
      <div className={styles.section}>
        <h3 className={styles.subTitle}>Rarity Selection</h3>
        <p className={styles.sectionNote}>
          Used when the pull is a normal weapon (not a Wonder Weapon / Aether Tool) to
          decide its rarity. {rarityMode === 'cursed' ? 'Cursed' : 'Standard'} table —
          Standard and Cursed differ here.
          {rarityMode === 'cursed' && ' Ultra is a flat 0.5% (Cursed only).'}
        </p>
        <DataTable
          columns={selColumns}
          rows={selRows}
          caption="Ordinary weapon rarity selection"
        />
      </div>
      <div className={styles.section}>
        <h3 className={styles.subTitle}>Weapon Class Shares</h3>
        <p className={styles.sectionNote}>
          Share of ordinary weapon selections by class — independent of rarity, round, and
          mode.
        </p>
        <DataTable columns={classColumns} rows={classRows} caption="Weapon class shares" />
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Black Ops 7 · Drop Rates</span>
          <h1 className={styles.heroTitle}>Mystery Box</h1>
          <p className={styles.heroSubtitle}>
            Pull-rarity odds by round, the ordinary-weapon rarity + class selection, and a
            calculator that combines them to show what a single spin is likely to give you.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        {/* ─── Mode chip toggle (drives every tab) ─── */}
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

        {/* ─── Tabs: jump straight to a section, no scrolling ─── */}
        <Tabs
          tabs={[
            { id: 'calc', label: 'Pull Calculator', content: calculatorPanel },
            { id: 'pull', label: 'Pull Rarity', content: pullRarityPanel },
            { id: 'weapon', label: 'Weapon Rarity + Class', content: weaponPanel },
          ]}
        />
      </div>
    </div>
  );
}
