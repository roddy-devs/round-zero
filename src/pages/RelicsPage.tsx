import { useParams } from 'react-router-dom';
import { getMapBySlug } from '../data';
import type { Relic, RelicTier } from '../data/types';
import styles from './RelicsPage.module.css';

const TIER_LABELS: Record<RelicTier, string> = {
  1: 'Tier 1 — Grim',
  2: 'Tier 2 — Sinister',
  3: 'Tier 3 — Wicked',
};

const TIER_CLASS: Record<RelicTier, string> = {
  1: styles.tierGrim,
  2: styles.tierSinister,
  3: styles.tierWicked,
};

function RelicCard({ relic }: { relic: Relic }) {
  return (
    <article className={`${styles.card} ${TIER_CLASS[relic.tier]}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleRow}>
          <h3 className={styles.cardName}>{relic.name}</h3>
          <span className={`${styles.tierBadge} ${TIER_CLASS[relic.tier]}`}>
            Tier {relic.tier}
          </span>
        </div>
        <p className={styles.cardEffect}>
          <span className={styles.effectLabel}>Effect: </span>
          {relic.effect}
        </p>
      </div>
      <ol className={styles.stepList}>
        {relic.steps.map((step, i) => (
          <li key={i} className={styles.step}>
            <span className={styles.stepNumber}>{i + 1}</span>
            <p className={styles.stepText}>{step}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function RelicsPage() {
  const { slug } = useParams<{ slug: string }>();
  const map = getMapBySlug(slug ?? '');

  if (!map) {
    return (
      <div className={styles.notFound}>
        <h1>Map not found</h1>
      </div>
    );
  }

  const tiers: RelicTier[] = [1, 2, 3];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>{map.name}</span>
          <h1 className={styles.heroTitle}>Relics</h1>
          <p className={styles.heroSubtitle}>
            {map.relics.length} relics across {tiers.filter(t => map.relics.some(r => r.tier === t)).length} tiers — Cursed Mode
          </p>
        </div>
      </header>

      <div className={styles.body}>
        {tiers.map((tier) => {
          const relics = map.relics.filter((r) => r.tier === tier);
          if (relics.length === 0) return null;
          return (
            <section key={tier} className={styles.tierSection}>
              <div className={styles.tierHeader}>
                <span className={`${styles.tierLabel} ${TIER_CLASS[tier]}`}>
                  {TIER_LABELS[tier]}
                </span>
                <span className={styles.tierCount}>{relics.length} relic{relics.length !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.grid}>
                {relics.map((relic) => (
                  <RelicCard key={relic.id} relic={relic} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
