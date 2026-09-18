import { useMemo, useState } from 'react';
import { bo7Relics, bo7RelicMaps, type Bo7Relic } from '../data/bo7Relics';
import type { RelicTier } from '../data/types';
import styles from './RelicCalculatorPage.module.css';

const TIER_LABELS: Record<RelicTier, string> = {
  1: 'Tier 1',
  2: 'Tier 2',
  3: 'Tier 3',
};

const TIER_CLASS: Record<RelicTier, string> = {
  1: styles.tier1,
  2: styles.tier2,
  3: styles.tier3,
};

type MapFilter = 'all' | string;
type TierFilter = 'all' | RelicTier;

function RelicRow({
  relic,
  selected,
  onToggle,
}: {
  relic: Bo7Relic;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <label className={`${styles.relic} ${TIER_CLASS[relic.tier]} ${selected ? styles.relicSelected : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={selected}
        onChange={() => onToggle(relic.id)}
      />
      <div className={styles.relicBody}>
        <div className={styles.relicTop}>
          <span className={styles.relicName}>{relic.name}</span>
          <span className={`${styles.tierBadge} ${TIER_CLASS[relic.tier]}`}>
            {TIER_LABELS[relic.tier]} · {relic.points}pt{relic.points !== 1 ? 's' : ''}
          </span>
        </div>
        <span className={styles.relicMap}>{relic.map}</span>
        <p className={styles.relicEffect}>{relic.effect}</p>
      </div>
    </label>
  );
}

export function RelicCalculatorPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [mapFilter, setMapFilter] = useState<MapFilter>('all');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleRelics = useMemo(
    () =>
      bo7Relics.filter(
        (r) =>
          (mapFilter === 'all' || r.map === mapFilter) &&
          (tierFilter === 'all' || r.tier === tierFilter),
      ),
    [mapFilter, tierFilter],
  );

  const selectedRelics = useMemo(
    () => bo7Relics.filter((r) => selected.has(r.id)),
    [selected],
  );

  const totals = useMemo(() => {
    const t = { total: 0, tier1: 0, tier2: 0, tier3: 0, count: selectedRelics.length };
    for (const r of selectedRelics) {
      t.total += r.points;
      if (r.tier === 1) t.tier1 += r.points;
      if (r.tier === 2) t.tier2 += r.points;
      if (r.tier === 3) t.tier3 += r.points;
    }
    return t;
  }, [selectedRelics]);

  const tiers: RelicTier[] = [1, 2, 3];

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Black Ops 7 · Cursed Mode</span>
          <h1 className={styles.heroTitle}>Relic Calculator</h1>
          <p className={styles.heroSubtitle}>
            Select the relics you have equipped to tally your total relic points. Tier 1 = 1
            point, Tier 2 = 2 points, Tier 3 = 3 points.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        {/* ─── Tally summary ─── */}
        <section className={styles.summary}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{totals.total}</span>
            <span className={styles.statLabel}>Total Points</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{totals.count}</span>
            <span className={styles.statLabel}>Relics Equipped</span>
          </div>
          <div className={`${styles.statCard} ${styles.tier1}`}>
            <span className={styles.statValue}>{totals.tier1}</span>
            <span className={styles.statLabel}>Tier 1 Points</span>
          </div>
          <div className={`${styles.statCard} ${styles.tier2}`}>
            <span className={styles.statValue}>{totals.tier2}</span>
            <span className={styles.statLabel}>Tier 2 Points</span>
          </div>
          <div className={`${styles.statCard} ${styles.tier3}`}>
            <span className={styles.statValue}>{totals.tier3}</span>
            <span className={styles.statLabel}>Tier 3 Points</span>
          </div>
        </section>

        {/* ─── Selected relics list ─── */}
        {selectedRelics.length > 0 && (
          <section className={styles.selectedPanel}>
            <div className={styles.selectedHeader}>
              <h2 className={styles.selectedTitle}>Selected Relics</h2>
              <button className={styles.clearButton} onClick={() => setSelected(new Set())}>
                Clear all
              </button>
            </div>
            <ul className={styles.selectedList}>
              {selectedRelics.map((r) => (
                <li key={r.id} className={styles.selectedItem}>
                  <button
                    className={styles.removeButton}
                    onClick={() => toggle(r.id)}
                    aria-label={`Remove ${r.name}`}
                  >
                    ×
                  </button>
                  <span className={`${styles.tierDot} ${TIER_CLASS[r.tier]}`} />
                  <span className={styles.selectedName}>{r.name}</span>
                  <span className={styles.selectedEffect}>{r.effect}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ─── Filters ─── */}
        <section className={styles.filters}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Map</span>
            <div className={styles.chips}>
              <button
                className={`${styles.chip} ${mapFilter === 'all' ? styles.chipActive : ''}`}
                onClick={() => setMapFilter('all')}
              >
                All
              </button>
              {bo7RelicMaps.map((m) => (
                <button
                  key={m}
                  className={`${styles.chip} ${mapFilter === m ? styles.chipActive : ''}`}
                  onClick={() => setMapFilter(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Tier</span>
            <div className={styles.chips}>
              <button
                className={`${styles.chip} ${tierFilter === 'all' ? styles.chipActive : ''}`}
                onClick={() => setTierFilter('all')}
              >
                All
              </button>
              {tiers.map((t) => (
                <button
                  key={t}
                  className={`${styles.chip} ${tierFilter === t ? styles.chipActive : ''}`}
                  onClick={() => setTierFilter(t)}
                >
                  {TIER_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Relic grid ─── */}
        <section className={styles.grid}>
          {visibleRelics.map((relic) => (
            <RelicRow
              key={relic.id}
              relic={relic}
              selected={selected.has(relic.id)}
              onToggle={toggle}
            />
          ))}
          {visibleRelics.length === 0 && (
            <p className={styles.empty}>No relics match the current filters.</p>
          )}
        </section>
      </div>
    </div>
  );
}
