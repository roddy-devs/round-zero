import { useState } from 'react';
import styles from './ClawMachineSolver.module.css';

interface CylinderConfig {
  label: string;
  cylinders: number[];
  sum: number;
}

const CONFIGS: CylinderConfig[] = [
  { label: '6 + 3', cylinders: [6, 3], sum: 9 },
  { label: '7 + 2', cylinders: [7, 2], sum: 9 },
  { label: '7 + 1 + 1', cylinders: [7, 1, 1], sum: 9 },
];

const MAX_GAUGE = 9;

const SEGMENT_STYLES = [styles.segmentA, styles.segmentB, styles.segmentC];

export function ClawMachineSolver() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className={styles.solver}>
      <h3 className={styles.title}>Claw Machine Calculator</h3>
      <p className={styles.description}>
        Place uranium cylinders so the gauge total doesn't exceed the green section.
        All valid configurations sum to exactly 9. Select the one that matches your
        available cylinders.
      </p>

      <div className={styles.greenZone}>
        <span className={styles.greenIcon}>●</span>
        Green zone limit: 9 units — all valid combos fill it exactly.
      </div>

      <div className={styles.configs}>
        {CONFIGS.map((config, i) => (
          <button
            key={i}
            className={`${styles.configCard} ${selected === i ? styles.configSelected : ''}`}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <div className={styles.configHeader}>
              <span className={styles.configLabel}>{config.label}</span>
              <span className={styles.configSum}>= {config.sum} units</span>
            </div>

            <div className={styles.gauge}>
              {config.cylinders.map((size, j) => (
                <div
                  key={j}
                  className={`${styles.gaugeSegment} ${SEGMENT_STYLES[j]}`}
                  style={{ width: `${(size / MAX_GAUGE) * 100}%` }}
                  aria-label={`Cylinder ${j + 1}: ${size} units`}
                >
                  {size}
                </div>
              ))}
              {config.sum < MAX_GAUGE && <div className={styles.gaugeEmpty} />}
            </div>

            <div className={styles.scaleRow}>
              {Array.from({ length: MAX_GAUGE + 1 }, (_, n) => (
                <span key={n} className={styles.scaleMark}>
                  {n}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.swatchA}`} />
          <span>Cylinder 1</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.swatchB}`} />
          <span>Cylinder 2</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.swatchC}`} />
          <span>Cylinder 3</span>
        </div>
      </div>

      <p className={styles.hint}>
        Tip: Check which cylinder sizes are available at the machine, then select
        the matching configuration above.
      </p>
    </div>
  );
}
