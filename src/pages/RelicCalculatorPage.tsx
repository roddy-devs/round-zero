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
      {selected && <span className={styles.relicCheck} aria-hidden="true">✓</span>}
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
  const [mobileListOpen, setMobileListOpen] = useState(false);
  const [selectedOnly, setSelectedOnly] = useState(false);

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
          (tierFilter === 'all' || r.tier === tierFilter) &&
          (!selectedOnly || selected.size === 0 || selected.has(r.id)),
      ),
    [mapFilter, tierFilter, selectedOnly, selected],
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
        {/* ─── Main column: filters + relic grid ─── */}
        <div className={styles.main}>
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
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>View</span>
              <button
                className={`${styles.chip} ${selectedOnly ? styles.chipActive : ''}`}
                onClick={() => setSelectedOnly((v) => !v)}
                disabled={selectedRelics.length === 0}
              >
                {selectedOnly ? '✓ ' : ''}Selected only
                {selectedRelics.length > 0 ? ` (${selectedRelics.length})` : ''}
              </button>
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

        {/* ─── Sticky summary sidebar (desktop) ─── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <section className={styles.summary}>
              <div className={styles.statCardTotal}>
                <span className={styles.statValue}>{totals.total}</span>
                <span className={styles.statLabel}>Total Points</span>
              </div>
              <div className={styles.statRow}>
                <div className={styles.statMini}>
                  <span className={styles.statMiniValue}>{totals.count}</span>
                  <span className={styles.statMiniLabel}>Equipped</span>
                </div>
                <div className={`${styles.statMini} ${styles.tier1}`}>
                  <span className={styles.statMiniValue}>{totals.tier1}</span>
                  <span className={styles.statMiniLabel}>T1</span>
                </div>
                <div className={`${styles.statMini} ${styles.tier2}`}>
                  <span className={styles.statMiniValue}>{totals.tier2}</span>
                  <span className={styles.statMiniLabel}>T2</span>
                </div>
                <div className={`${styles.statMini} ${styles.tier3}`}>
                  <span className={styles.statMiniValue}>{totals.tier3}</span>
                  <span className={styles.statMiniLabel}>T3</span>
                </div>
              </div>
            </section>

            <div className={styles.selectedHeader}>
              <h2 className={styles.selectedTitle}>
                Selected{selectedRelics.length > 0 ? ` (${selectedRelics.length})` : ''}
              </h2>
              {selectedRelics.length > 0 && (
                <button className={styles.clearButton} onClick={() => setSelected(new Set())}>
                  Clear all
                </button>
              )}
            </div>

            {selectedRelics.length === 0 ? (
              <p className={styles.selectedEmpty}>
                No relics selected yet. Tick relics on the left to build your loadout.
              </p>
            ) : (
              <div className={styles.selectedGroups}>
                {tiers.map((tier) => {
                  const group = selectedRelics.filter((r) => r.tier === tier);
                  if (group.length === 0) return null;
                  return (
                    <div key={tier} className={styles.selectedGroup}>
                      <div className={`${styles.selectedGroupHeader} ${TIER_CLASS[tier]}`}>
                        <span className={`${styles.tierDot} ${TIER_CLASS[tier]}`} />
                        <span className={styles.selectedGroupLabel}>{TIER_LABELS[tier]}</span>
                        <span className={styles.selectedGroupCount}>{group.length}</span>
                      </div>
                      <ul className={styles.selectedList}>
                        {group.map((r) => (
                          <li key={r.id} className={styles.selectedItem}>
                            <button
                              className={styles.removeButton}
                              onClick={() => toggle(r.id)}
                              aria-label={`Remove ${r.name}`}
                            >
                              ×
                            </button>
                            <div className={styles.selectedInfo}>
                              <span className={styles.selectedName}>{r.name}</span>
                              <span className={styles.selectedMeta}>{r.effect}</span>
                            </div>
                            <span className={styles.selectedPoints}>
                              {r.points}pt{r.points !== 1 ? 's' : ''}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ─── Sticky bottom bar + drawer (mobile) ─── */}
      {mobileListOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setMobileListOpen(false)}
        />
      )}
      <div className={`${styles.mobileBar} ${mobileListOpen ? styles.mobileBarOpen : ''}`}>
        {/* Expandable drawer with the selected relics */}
        {mobileListOpen && (
          <div className={styles.mobileDrawer}>
            <div className={styles.mobileDrawerHeader}>
              <h2 className={styles.selectedTitle}>
                Selected{selectedRelics.length > 0 ? ` (${selectedRelics.length})` : ''}
              </h2>
              {selectedRelics.length > 0 && (
                <button className={styles.clearButton} onClick={() => setSelected(new Set())}>
                  Clear all
                </button>
              )}
            </div>
            {selectedRelics.length === 0 ? (
              <p className={styles.selectedEmpty}>
                No relics selected yet. Tick relics above to build your loadout.
              </p>
            ) : (
              <ul className={styles.mobileDrawerList}>
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
                    <span className={`${styles.tierBadge} ${TIER_CLASS[r.tier]}`}>
                      {r.points}pt{r.points !== 1 ? 's' : ''}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Always-visible summary row (tap to toggle the drawer) */}
        <button
          className={styles.mobileBarRow}
          onClick={() => setMobileListOpen((v) => !v)}
          aria-expanded={mobileListOpen}
        >
          <div className={styles.mobileBarStats}>
            <span className={styles.mobileBarTotal}>{totals.total}</span>
            <span className={styles.mobileBarLabel}>pts</span>
            <span className={styles.mobileBarCount}>· {totals.count} equipped</span>
          </div>
          <div className={styles.mobileBarTiers}>
            <span className={styles.tier1}>T1 {totals.tier1}</span>
            <span className={styles.tier2}>T2 {totals.tier2}</span>
            <span className={styles.tier3}>T3 {totals.tier3}</span>
          </div>
          <span className={`${styles.mobileBarChevron} ${mobileListOpen ? styles.mobileBarChevronOpen : ''}`}>
            ›
          </span>
        </button>
      </div>
    </div>
  );
}
