import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import { maps } from '../data';

export function Layout() {
  const location = useLocation();
  // Track which map groups are expanded. Auto-expand if current path is under that map.
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const map of maps) {
      initial[map.slug] = location.pathname.includes(`/map/${map.slug}`);
    }
    return initial;
  });

  const toggle = (slug: string) =>
    setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoAccent}>Round</span> Zero
        </NavLink>

        <nav className={styles.nav}>
          <span className={styles.navLabel}>Maps</span>
          {maps.map((map) => {
            const isOpen = expanded[map.slug];
            const isMapActive = location.pathname.startsWith(`/map/${map.slug}`);
            return (
              <div key={map.slug} className={styles.navGroup}>
                <button
                  className={`${styles.navGroupToggle} ${isMapActive ? styles.navGroupToggleActive : ''}`}
                  onClick={() => toggle(map.slug)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.navGroupName}>{map.name}</span>
                  <span className={`${styles.navGroupChevron} ${isOpen ? styles.navGroupChevronOpen : ''}`}>
                    ›
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.navSubLinks}>
                    <NavLink
                      to={`/map/${map.slug}`}
                      end
                      className={({ isActive }) =>
                        `${styles.navSubLink} ${isActive ? styles.navSubLinkActive : ''}`
                      }
                    >
                      Guide
                    </NavLink>
                    <NavLink
                      to={`/map/${map.slug}/relics`}
                      className={({ isActive }) =>
                        `${styles.navSubLink} ${isActive ? styles.navSubLinkActive : ''}`
                      }
                    >
                      Relics
                    </NavLink>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
