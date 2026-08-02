import { Link } from 'react-router-dom';
import { maps } from '../data';
import styles from './Home.module.css';

export function Home() {
  // Group maps by game
  const gameGroups = maps.reduce<Record<string, typeof maps>>((acc, map) => {
    if (!acc[map.game]) acc[map.game] = [];
    acc[map.game].push(map);
    return acc;
  }, {});

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>Round Zero</h1>
        <p className={styles.subtitle}>
          Step-by-step guides, solvers, and interactive tools for Call of Duty Zombies maps.
        </p>
      </header>

      {Object.entries(gameGroups).map(([game, gameMaps]) => (
        <section key={game} className={styles.gameSection}>
          <h2 className={styles.gameTitle}>{game}</h2>
          <div className={styles.grid}>
            {gameMaps.map((map) => (
              <Link key={map.slug} to={`/map/${map.slug}`} className={styles.card}>
                <h3 className={styles.cardTitle}>{map.name}</h3>
                <span className={styles.cardSubtitle}>{map.subtitle}</span>
                <p className={styles.cardDescription}>{map.description}</p>
                <span className={styles.cardLink}>View Guide →</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
