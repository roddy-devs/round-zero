import { superEasterEgg } from '../data/superEasterEgg';
import styles from './SuperEasterEggPage.module.css';

export function SuperEasterEggPage() {
  const { title, subtitle, intro, credits, sections } = superEasterEgg;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Black Ops 7 · Cross-Map</span>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          <p className={styles.heroIntro}>{intro}</p>
        </div>
      </header>

      <div className={styles.body}>
        {/* Section jump-nav */}
        <nav className={styles.toc} aria-label="Sections">
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className={styles.tocLink}>
              <span className={styles.tocNumber}>{String(i + 1).padStart(2, '0')}</span>
              {s.title}
            </a>
          ))}
        </nav>

        {sections.map((section, si) => (
          <section key={section.id} id={section.id} className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>{String(si + 1).padStart(2, '0')}</span>
              <div>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.sectionSubtitle}>{section.subtitle}</p>
              </div>
            </div>

            <ol className={styles.stepList}>
              {section.steps.map((step, i) => (
                <li key={i} className={styles.step}>
                  <span className={styles.stepNumber}>{i + 1}</span>
                  <div className={styles.stepContent}>
                    <p className={styles.stepText}>{step.text}</p>
                    {step.note && <p className={styles.stepNote}>{step.note}</p>}
                    {step.image && (
                      <figure className={styles.figure}>
                        <img
                          src={step.image}
                          alt={step.imageCaption ?? step.text}
                          className={styles.image}
                          loading="lazy"
                        />
                        {step.imageCaption && (
                          <figcaption className={styles.caption}>{step.imageCaption}</figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <footer className={styles.credits}>Credits: {credits}</footer>
      </div>
    </div>
  );
}
