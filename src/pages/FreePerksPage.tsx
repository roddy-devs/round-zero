import { useState } from 'react';
import {
  FREE_PERK_REQUIRED_PERKS,
  FREE_PERK_GRANT_CHANCE,
  FREE_PERK_MAX_PERKS,
} from '../data/dropRates';
import { DataTable, type DataColumn, type DataRow } from '../components/DataTable';
import styles from './DropRates.module.css';

const pct = (n: number) => `${(n * 100).toFixed(0)}%`;

type PlayerCount = 1 | 2 | 3 | 5;
const PLAYER_COUNTS: { id: PlayerCount; label: string }[] = [
  { id: 1, label: 'Solo' },
  { id: 2, label: '2 players' },
  { id: 3, label: '3 players' },
  { id: 5, label: '5 players' },
];

export function FreePerksPage() {
  const [players, setPlayers] = useState<PlayerCount>(1);
  const required = FREE_PERK_REQUIRED_PERKS[players];

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Black Ops 7 · Drop Rates</span>
          <h1 className={styles.heroTitle}>Free Perks</h1>
          <p className={styles.heroSubtitle}>
            When a Free Perk enters the drop cycle, the chance it actually gives you a
            perk, and when it stops appearing.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        {/* ─── Helper ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Requirement by Lobby Size</h2>
          <div className={styles.calc}>
            <div className={styles.controls}>
              <div className={styles.control}>
                <span className={styles.controlLabel}>Players</span>
                <div className={styles.chips}>
                  {PLAYER_COUNTS.map((p) => (
                    <button
                      key={p.id}
                      className={`${styles.chip} ${players === p.id ? styles.chipActive : ''}`}
                      onClick={() => setPlayers(p.id)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.result}>
              <div className={styles.bigStat}>
                <span className={styles.bigStatValue}>{required}</span>
                <span className={styles.bigStatLabel}>
                  total perks across the team before a Free Perk is added to the drop cycle
                </span>
              </div>
              <p className={styles.sectionNote}>
                When a power-up drops and is slated to be a Free Perk, it runs a{' '}
                <strong>{pct(FREE_PERK_GRANT_CHANCE)}</strong> chance to actually grant the
                perk.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Requirement table ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Perks Required</h2>
          <DataTable
            columns={
              [
                { key: 'lobby', label: 'Lobby' },
                { key: 'required', label: 'Perks required (team total)', numeric: true },
              ] as DataColumn[]
            }
            rows={
              PLAYER_COUNTS.map((p) => ({
                key: String(p.id),
                active: p.id === players,
                cells: {
                  lobby: p.label,
                  required: FREE_PERK_REQUIRED_PERKS[p.id],
                },
              })) as DataRow[]
            }
            caption="Perks required by lobby size"
          />
        </section>

        {/* ─── Rules ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Rules</h2>
          <div className={styles.rules}>
            <div className={styles.rule}>
              <span className={styles.ruleBullet}>›</span>
              <span>
                The Free Perk is added to the drop cycle based on the{' '}
                <span className={styles.ruleStrong}>total perks the team has</span>.
              </span>
            </div>
            <div className={styles.rule}>
              <span className={styles.ruleBullet}>›</span>
              <span>
                When a power-up drops that's supposed to be a Free Perk, it runs a{' '}
                <span className={styles.ruleStrong}>{pct(FREE_PERK_GRANT_CHANCE)} roll</span>{' '}
                to actually give you the perk.
              </span>
            </div>
            <div className={styles.rule}>
              <span className={styles.ruleBullet}>›</span>
              <span>
                Once every player in the lobby has{' '}
                <span className={styles.ruleStrong}>{FREE_PERK_MAX_PERKS}+ perks</span>, Free
                Perk never appears again. It stays in the cycle while any one player is below{' '}
                {FREE_PERK_MAX_PERKS}.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
