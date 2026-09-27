import { Fragment, useMemo, useState } from 'react';
import {
  bo7Weapons,
  weaponClasses,
  dpsSummary,
  ULTRA_PAP4_FACTOR,
  groupByBaseWeapon,
  type Bo7Weapon,
  type DpsTier,
  type WeaponClass,
} from '../data/bo7Dps';
import styles from './DpsAnalysisPage.module.css';

const TIERS: DpsTier[] = ['S', 'A', 'B', 'C', 'D'];

const TIER_CLASS: Record<DpsTier, string> = {
  S: styles.tierS,
  A: styles.tierA,
  B: styles.tierB,
  C: styles.tierC,
  D: styles.tierD,
};

type Rarity = 'legendary' | 'ultra';
type ClassFilter = 'all' | WeaponClass;
type TierFilter = 'all' | DpsTier;
type SortKey = 'dps' | 'damage' | 'rpm';

/** Format a number with thousands separators and no decimals. */
function fmt(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

/** Damage/DPS values for a weapon under the selected rarity. */
function scaled(weapon: Bo7Weapon, factor: number) {
  return {
    damagePerShot: weapon.damagePerShot * factor,
    dps: weapon.dps * factor,
  };
}

export function DpsAnalysisPage() {
  const [rarity, setRarity] = useState<Rarity>('legendary');
  const [classFilter, setClassFilter] = useState<ClassFilter>('all');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('dps');
  const [search, setSearch] = useState('');
  const [groupVariants, setGroupVariants] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const factor = rarity === 'ultra' ? ULTRA_PAP4_FACTOR : 1;
  const query = search.trim().toLowerCase();

  const toggleExpanded = (base: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(base)) next.delete(base);
      else next.add(base);
      return next;
    });
  };

  // Flat, filtered + sorted weapon list (used directly and as the source for grouping).
  const filtered = useMemo(() => {
    const list = bo7Weapons.filter(
      (w) =>
        (classFilter === 'all' || w.weaponClass === classFilter) &&
        (tierFilter === 'all' || w.tier === tierFilter) &&
        (query === '' ||
          w.name.toLowerCase().includes(query) ||
          w.baseWeapon.toLowerCase().includes(query) ||
          w.weaponClass.toLowerCase().includes(query)),
    );
    const cmp = (a: Bo7Weapon, b: Bo7Weapon) => {
      if (sortKey === 'damage') return b.damagePerShot - a.damagePerShot;
      if (sortKey === 'rpm') return b.rpm - a.rpm;
      return b.dps - a.dps;
    };
    return [...list].sort(cmp);
  }, [classFilter, tierFilter, sortKey, query]);

  // Grouped view: one entry per base gun, ordered by the current sort key
  // (using each group's best variant as the representative for ordering).
  const groups = useMemo(() => {
    const g = groupByBaseWeapon(filtered);
    const repVal = (w: Bo7Weapon) =>
      sortKey === 'damage' ? w.damagePerShot : sortKey === 'rpm' ? w.rpm : w.dps;
    return g.sort((a, b) => repVal(b.best) - repVal(a.best));
  }, [filtered, sortKey]);

  const clearFilters = () => {
    setClassFilter('all');
    setTierFilter('all');
    setSearch('');
    setSortKey('dps');
  };

  const hasFilters =
    classFilter !== 'all' || tierFilter !== 'all' || query !== '' || sortKey !== 'dps';

  const expandAll = () => setExpanded(new Set(groups.map((g) => g.baseWeapon)));
  const collapseAll = () => setExpanded(new Set());

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Black Ops 7 · Zombies</span>
          <h1 className={styles.heroTitle}>Weapon DPS Analysis</h1>
          <p className={styles.heroSubtitle}>
            Damage &amp; DPS for all {dpsSummary.count} BO7 weapons, tested identically:{' '}
            {rarity === 'ultra' ? 'Ultra rarity + Pack-A-Punch 4' : 'Legendary + Triple Pack-A-Punch'},
            Damage Barrel (where applicable), Deadshot "Dead Head", Double Tap &amp; Double Time.
            Guns with attachments (in parentheses) are variants of the same base weapon — use
            "Group variants" to collapse them.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        {/* ─── Summary stat cards ─── */}
        <section className={styles.stats}>
          <div className={styles.statCardPrimary}>
            <span className={styles.statValue}>{fmt(dpsSummary.maxDps * factor)}</span>
            <span className={styles.statLabel}>Max DPS</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{fmt(dpsSummary.median * factor)}</span>
            <span className={styles.statLabel}>Median DPS</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{fmt(dpsSummary.mean * factor)}</span>
            <span className={styles.statLabel}>Mean DPS</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{fmt(dpsSummary.q3 * factor)}</span>
            <span className={styles.statLabel}>Top Quartile (Q3)</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{fmt(dpsSummary.q1 * factor)}</span>
            <span className={styles.statLabel}>Bottom Quartile (Q1)</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{dpsSummary.count}</span>
            <span className={styles.statLabel}>Weapons Analyzed</span>
          </div>
        </section>

        {/* ─── Controls ─── */}
        <section className={styles.controls}>
          {/* Rarity toggle */}
          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Rarity</span>
            <div className={styles.toggle}>
              <button
                className={`${styles.toggleButton} ${rarity === 'legendary' ? styles.toggleActive : ''}`}
                onClick={() => setRarity('legendary')}
              >
                Legendary · Triple PaP
              </button>
              <button
                className={`${styles.toggleButton} ${rarity === 'ultra' ? styles.toggleActive : ''}`}
                onClick={() => setRarity('ultra')}
              >
                Ultra · PaP 4
              </button>
            </div>
          </div>

          {/* View: group variants */}
          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>View</span>
            <div className={styles.toggle}>
              <button
                className={`${styles.toggleButton} ${!groupVariants ? styles.toggleActive : ''}`}
                onClick={() => setGroupVariants(false)}
              >
                All variants
              </button>
              <button
                className={`${styles.toggleButton} ${groupVariants ? styles.toggleActive : ''}`}
                onClick={() => setGroupVariants(true)}
              >
                Group by base gun
              </button>
            </div>
            {groupVariants && (
              <div className={styles.expandControls}>
                <button className={styles.linkButton} onClick={expandAll}>
                  Expand all
                </button>
                <button className={styles.linkButton} onClick={collapseAll}>
                  Collapse all
                </button>
              </div>
            )}
          </div>

          {/* Search */}
          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Search</span>
            <div className={styles.searchWrap}>
              <input
                className={styles.search}
                type="search"
                placeholder="Weapon, base gun, or class…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Sort */}
          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Sort</span>
            <div className={styles.chips}>
              <button
                className={`${styles.chip} ${sortKey === 'dps' ? styles.chipActive : ''}`}
                onClick={() => setSortKey('dps')}
              >
                DPS
              </button>
              <button
                className={`${styles.chip} ${sortKey === 'damage' ? styles.chipActive : ''}`}
                onClick={() => setSortKey('damage')}
              >
                Damage/Shot
              </button>
              <button
                className={`${styles.chip} ${sortKey === 'rpm' ? styles.chipActive : ''}`}
                onClick={() => setSortKey('rpm')}
              >
                Rate of Fire
              </button>
            </div>
          </div>

          {/* Tier filter */}
          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Tier</span>
            <div className={styles.chips}>
              <button
                className={`${styles.chip} ${tierFilter === 'all' ? styles.chipActive : ''}`}
                onClick={() => setTierFilter('all')}
              >
                All
              </button>
              {TIERS.map((t) => (
                <button
                  key={t}
                  className={`${styles.chip} ${styles.chipTier} ${TIER_CLASS[t]} ${tierFilter === t ? styles.chipActive : ''}`}
                  onClick={() => setTierFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Class filter */}
          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>Class</span>
            <div className={styles.chips}>
              <button
                className={`${styles.chip} ${classFilter === 'all' ? styles.chipActive : ''}`}
                onClick={() => setClassFilter('all')}
              >
                All
              </button>
              {weaponClasses.map((c) => (
                <button
                  key={c}
                  className={`${styles.chip} ${classFilter === c ? styles.chipActive : ''}`}
                  onClick={() => setClassFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.resultRow}>
            <span className={styles.resultCount}>
              {groupVariants
                ? `${groups.length} base guns · ${filtered.length} variants`
                : `${filtered.length} of ${bo7Weapons.length} weapons`}
            </span>
            {hasFilters && (
              <button className={styles.clearButton} onClick={clearFilters}>
                Reset filters
              </button>
            )}
          </div>
        </section>

        {/* ─── Desktop table ─── */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thRank}>#</th>
                <th className={styles.thName}>Weapon</th>
                <th className={styles.thClass}>Class</th>
                <th className={styles.thNum}>Dmg/Shot</th>
                <th className={styles.thNum}>RPM</th>
                <th className={styles.thNum}>DPS</th>
                <th className={styles.thTier}>Tier</th>
                <th className={styles.thBar}>% of Top Gun</th>
              </tr>
            </thead>
            <tbody>
              {!groupVariants &&
                filtered.map((w) => {
                  const s = scaled(w, factor);
                  return (
                    <tr key={`${w.rank}-${w.name}`} className={styles.row}>
                      <td className={styles.tdRank}>{w.rank}</td>
                      <td className={styles.tdName}>{w.name}</td>
                      <td className={styles.tdClass}>
                        <span className={styles.classBadge}>{w.weaponClass}</span>
                      </td>
                      <td className={styles.tdNum}>{fmt(s.damagePerShot)}</td>
                      <td className={styles.tdNum}>{fmt(w.rpm)}</td>
                      <td className={`${styles.tdNum} ${styles.tdDps}`}>{fmt(s.dps)}</td>
                      <td className={styles.tdTier}>
                        <span className={`${styles.tierBadge} ${TIER_CLASS[w.tier]}`}>{w.tier}</span>
                      </td>
                      <td className={styles.tdBar}>
                        <div className={styles.barTrack}>
                          <div
                            className={`${styles.barFill} ${TIER_CLASS[w.tier]}`}
                            style={{ width: `${(w.percentOfTopGun * 100).toFixed(1)}%` }}
                          />
                        </div>
                        <span className={styles.barValue}>
                          {(w.percentOfTopGun * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}

              {groupVariants &&
                groups.map((g) => {
                  const isOpen = expanded.has(g.baseWeapon);
                  const single = g.variants.length === 1;
                  const s = scaled(g.best, factor);
                  return (
                    <Fragment key={g.baseWeapon}>
                      <tr
                        className={`${styles.row} ${styles.groupRow} ${!single ? styles.groupRowClickable : ''}`}
                        onClick={single ? undefined : () => toggleExpanded(g.baseWeapon)}
                      >
                        <td className={styles.tdRank}>{g.best.rank}</td>
                        <td className={styles.tdName}>
                          {!single && (
                            <span
                              className={`${styles.groupChevron} ${isOpen ? styles.groupChevronOpen : ''}`}
                              aria-hidden="true"
                            >
                              ›
                            </span>
                          )}
                          {g.baseWeapon}
                          {!single && (
                            <span className={styles.variantCount}>{g.variants.length} variants</span>
                          )}
                        </td>
                        <td className={styles.tdClass}>
                          <span className={styles.classBadge}>{g.weaponClass}</span>
                        </td>
                        <td className={styles.tdNum}>{fmt(s.damagePerShot)}</td>
                        <td className={styles.tdNum}>{fmt(g.best.rpm)}</td>
                        <td className={`${styles.tdNum} ${styles.tdDps}`}>{fmt(s.dps)}</td>
                        <td className={styles.tdTier}>
                          <span className={`${styles.tierBadge} ${TIER_CLASS[g.best.tier]}`}>
                            {g.best.tier}
                          </span>
                        </td>
                        <td className={styles.tdBar}>
                          <div className={styles.barTrack}>
                            <div
                              className={`${styles.barFill} ${TIER_CLASS[g.best.tier]}`}
                              style={{ width: `${(g.best.percentOfTopGun * 100).toFixed(1)}%` }}
                            />
                          </div>
                          <span className={styles.barValue}>
                            {(g.best.percentOfTopGun * 100).toFixed(0)}%
                          </span>
                        </td>
                      </tr>
                      {!single &&
                        isOpen &&
                        g.variants.map((w) => {
                          const vs = scaled(w, factor);
                          const label = w.variant ?? 'Stock (no attachment)';
                          return (
                            <tr key={`${w.rank}-${w.name}`} className={`${styles.row} ${styles.variantRow}`}>
                              <td className={styles.tdRank}>{w.rank}</td>
                              <td className={styles.tdName}>
                                <span className={styles.variantIndent} aria-hidden="true">
                                  └
                                </span>
                                {label}
                              </td>
                              <td className={styles.tdClass} />
                              <td className={styles.tdNum}>{fmt(vs.damagePerShot)}</td>
                              <td className={styles.tdNum}>{fmt(w.rpm)}</td>
                              <td className={`${styles.tdNum} ${styles.tdDps}`}>{fmt(vs.dps)}</td>
                              <td className={styles.tdTier}>
                                <span className={`${styles.tierBadge} ${TIER_CLASS[w.tier]}`}>
                                  {w.tier}
                                </span>
                              </td>
                              <td className={styles.tdBar}>
                                <div className={styles.barTrack}>
                                  <div
                                    className={`${styles.barFill} ${TIER_CLASS[w.tier]}`}
                                    style={{ width: `${(w.percentOfTopGun * 100).toFixed(1)}%` }}
                                  />
                                </div>
                                <span className={styles.barValue}>
                                  {(w.percentOfTopGun * 100).toFixed(0)}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </Fragment>
                  );
                })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className={styles.empty}>No weapons match the current filters.</p>
          )}
        </div>

        {/* ─── Mobile cards ─── */}
        <div className={styles.cards}>
          {!groupVariants &&
            filtered.map((w) => (
              <WeaponCard key={`${w.rank}-${w.name}`} weapon={w} factor={factor} />
            ))}

          {groupVariants &&
            groups.map((g) => {
              const isOpen = expanded.has(g.baseWeapon);
              const single = g.variants.length === 1;
              const s = scaled(g.best, factor);
              return (
                <article
                  key={g.baseWeapon}
                  className={`${styles.card} ${TIER_CLASS[g.best.tier]}`}
                >
                  <button
                    className={styles.cardGroupHeader}
                    onClick={single ? undefined : () => toggleExpanded(g.baseWeapon)}
                    aria-expanded={single ? undefined : isOpen}
                    disabled={single}
                  >
                    <span className={styles.cardRank}>#{g.best.rank}</span>
                    <span className={styles.cardName}>{g.baseWeapon}</span>
                    {!single && (
                      <span className={styles.variantCount}>{g.variants.length}</span>
                    )}
                    <span className={`${styles.tierBadge} ${TIER_CLASS[g.best.tier]}`}>
                      {g.best.tier}
                    </span>
                    {!single && (
                      <span
                        className={`${styles.groupChevron} ${isOpen ? styles.groupChevronOpen : ''}`}
                        aria-hidden="true"
                      >
                        ›
                      </span>
                    )}
                  </button>
                  <span className={styles.cardClass}>{g.weaponClass}</span>
                  <div className={styles.cardStats}>
                    <div className={styles.cardStat}>
                      <span className={styles.cardStatValue}>{fmt(s.dps)}</span>
                      <span className={styles.cardStatLabel}>Best DPS</span>
                    </div>
                    <div className={styles.cardStat}>
                      <span className={styles.cardStatValue}>{fmt(s.damagePerShot)}</span>
                      <span className={styles.cardStatLabel}>Dmg/Shot</span>
                    </div>
                    <div className={styles.cardStat}>
                      <span className={styles.cardStatValue}>{fmt(g.best.rpm)}</span>
                      <span className={styles.cardStatLabel}>RPM</span>
                    </div>
                  </div>
                  {!single && isOpen && (
                    <div className={styles.cardVariants}>
                      {g.variants.map((w) => {
                        const vs = scaled(w, factor);
                        return (
                          <div key={`${w.rank}-${w.name}`} className={styles.cardVariantRow}>
                            <span className={styles.cardVariantName}>
                              {w.variant ?? 'Stock (no attachment)'}
                            </span>
                            <span className={styles.cardVariantDps}>{fmt(vs.dps)} DPS</span>
                            <span className={`${styles.tierBadge} ${TIER_CLASS[w.tier]}`}>
                              {w.tier}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          {filtered.length === 0 && (
            <p className={styles.empty}>No weapons match the current filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/** A single flat weapon card (mobile, ungrouped view). */
function WeaponCard({ weapon, factor }: { weapon: Bo7Weapon; factor: number }) {
  const s = scaled(weapon, factor);
  return (
    <article className={`${styles.card} ${TIER_CLASS[weapon.tier]}`}>
      <div className={styles.cardHeader}>
        <span className={styles.cardRank}>#{weapon.rank}</span>
        <span className={styles.cardName}>{weapon.name}</span>
        <span className={`${styles.tierBadge} ${TIER_CLASS[weapon.tier]}`}>{weapon.tier}</span>
      </div>
      <span className={styles.cardClass}>{weapon.weaponClass}</span>
      <div className={styles.cardStats}>
        <div className={styles.cardStat}>
          <span className={styles.cardStatValue}>{fmt(s.dps)}</span>
          <span className={styles.cardStatLabel}>DPS</span>
        </div>
        <div className={styles.cardStat}>
          <span className={styles.cardStatValue}>{fmt(s.damagePerShot)}</span>
          <span className={styles.cardStatLabel}>Dmg/Shot</span>
        </div>
        <div className={styles.cardStat}>
          <span className={styles.cardStatValue}>{fmt(weapon.rpm)}</span>
          <span className={styles.cardStatLabel}>RPM</span>
        </div>
      </div>
      <div className={styles.cardBar}>
        <div className={styles.barTrack}>
          <div
            className={`${styles.barFill} ${TIER_CLASS[weapon.tier]}`}
            style={{ width: `${(weapon.percentOfTopGun * 100).toFixed(1)}%` }}
          />
        </div>
        <span className={styles.barValue}>
          {(weapon.percentOfTopGun * 100).toFixed(0)}% of top gun
        </span>
      </div>
    </article>
  );
}
