import {
  VENDING_MACHINE_ROLLS,
  VENDING_MACHINE_DESTROY,
  VENDING_MACHINE_LOOTPOOL,
} from '../data/dropRates';
import styles from './DropRates.module.css';

const pct = (n: number) => {
  const p = n * 100;
  // Preserve the source's extra precision for the tiny values.
  const str = p < 2 ? p.toFixed(p < 1.1 ? 4 : 2) : p.toFixed(1);
  return `${str.replace(/\.?0+$/, '')}%`;
};

export function VendingMachinePage() {
  const foodThreshold = VENDING_MACHINE_ROLLS.food.threshold;
  const grenadeThreshold = VENDING_MACHINE_ROLLS.liveGrenade.threshold;
  const grenadeMax = VENDING_MACHINE_ROLLS.liveGrenade.rollMax;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Black Ops 7 · Drop Rates</span>
          <h1 className={styles.heroTitle}>Vending Machine</h1>
          <p className={styles.heroSubtitle}>
            How drops are rolled, what destroying the machine gives you, and the full
            lootpool with approximate chances.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        {/* ─── Roll rules ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How a Drop is Rolled</h2>
          <div className={styles.rules}>
            <div className={styles.rule}>
              <span className={styles.ruleBullet}>1.</span>
              <span>
                Rolls a number between <span className={styles.ruleStrong}>1–{grenadeMax}</span>.
                If it's less than <span className={styles.ruleStrong}>{grenadeThreshold}</span>,
                you get a <span className={styles.ruleStrong}>live grenade</span>.
              </span>
            </div>
            <div className={styles.rule}>
              <span className={styles.ruleBullet}>2.</span>
              <span>
                Rolls another between{' '}
                <span className={styles.ruleStrong}>1–{VENDING_MACHINE_ROLLS.food.rollMax}</span>.
                If it's less than <span className={styles.ruleStrong}>{foodThreshold}</span> you
                get <span className={styles.ruleStrong}>food</span>. Otherwise you get{' '}
                <span className={styles.ruleStrong}>loot</span>.
              </span>
            </div>
          </div>
        </section>

        {/* ─── Destroy ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Destroying the Machine</h2>
          <div className={styles.rules}>
            <div className={styles.rule}>
              <span className={styles.ruleBullet}>›</span>
              <span>
                Gives you <span className={styles.ruleStrong}>{VENDING_MACHINE_DESTROY.itemsGranted} items</span>{' '}
                from the lootpool and{' '}
                {VENDING_MACHINE_DESTROY.removesFoodDrops && (
                  <><span className={styles.ruleStrong}>removes food drops</span>.</>
                )}
              </span>
            </div>
            <div className={styles.rule}>
              <span className={styles.ruleBullet}>›</span>
              <span>
                Roughly <span className={styles.ruleStrong}>{pct(VENDING_MACHINE_DESTROY.raygunChance)}</span>{' '}
                chance to get a Ray Gun when you destroy it.
              </span>
            </div>
          </div>
        </section>

        {/* ─── Lootpool ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Lootpool</h2>
          <p className={styles.sectionNote}>
            Percentages are approximate as published. Values marked ~ in the source are
            rounded.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th className={styles.num}>Chance</th>
                </tr>
              </thead>
              <tbody>
                {VENDING_MACHINE_LOOTPOOL.map((entry) => (
                  <tr key={entry.item}>
                    <td className={styles.tdLabel}>{entry.item}</td>
                    <td className={styles.num}>
                      {pct(entry.chance)}
                      {entry.approximate ? '~' : ''}
                    </td>
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
