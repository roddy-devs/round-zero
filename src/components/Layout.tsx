import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import { maps } from '../data';

export function Layout() {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

  // Close the mobile nav whenever the route changes.
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  return (
    <div className={styles.layout}>
      {/* Mobile top bar */}
      <header className={styles.topbar}>
        <button
          className={styles.hamburger}
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open navigation"
          aria-expanded={mobileNavOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <NavLink to="/" className={styles.topbarLogo}>
          <span className={styles.logoAccent}>Round</span> Zero
        </NavLink>
      </header>

      {/* Backdrop (mobile, when nav open) */}
      {mobileNavOpen && (
        <div className={styles.backdrop} onClick={() => setMobileNavOpen(false)} />
      )}

      <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <NavLink to="/" className={styles.logo}>
            <span className={styles.logoAccent}>Round</span> Zero
          </NavLink>
          <button
            className={styles.closeButton}
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          >
            ×
          </button>
        </div>

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

          <span className={`${styles.navLabel} ${styles.navLabelTools}`}>Tools</span>
          <NavLink
            to="/relic-calculator"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            Relic Calculator
          </NavLink>
          <NavLink
            to="/super-easter-egg"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            Super Easter Egg
          </NavLink>
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
