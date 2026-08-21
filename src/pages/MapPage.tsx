import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMapBySlug } from '../data';
import { Tabs } from '../components/Tabs';
import { StepNavigator } from '../components/StepNavigator';
import {
  ScrollSolver,
  FlagSolver,
  MurderCaseSolver,
  PigpenSolver,
  ZaryaConsoleSolver,
  PlanetCodeSolver,
  BookCounterSolver,
  NoteOrderSolver,
  CrateFinderSolver,
  ClawMachineSolver,
  PillarSymbolSolver,
  PlanetAlignmentSolver,
  MarsCodeSolver,
  RexInfernusSolver,
} from '../components/solvers';
import styles from './MapPage.module.css';

export function MapPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState('mq');
  const map = getMapBySlug(slug ?? '');

  if (!map) {
    return (
      <div className={styles.notFound}>
        <h1>Map not found</h1>
        <p>No guide exists for this map yet.</p>
      </div>
    );
  }

  const wonderWeaponContent = (
    <div className={styles.wwContent}>
      <div className={styles.wwHeader}>
        <h2 className={styles.wwTitle}>{map.wonderWeapon.name}</h2>
      </div>
      {map.wonderWeapon.sections.map((section, i) => (
        <article key={section.id} className={styles.wwSection}>
          <div className={styles.wwSectionHeader}>
            <span className={styles.wwSectionNumber}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className={styles.wwSectionTitle}>{section.title}</h3>
          </div>
          <ol className={styles.wwStepList}>
            {section.steps.map((step) => (
              <li key={step.id} className={styles.wwStep}>
                <p className={styles.wwStepText}>{step.text}</p>
                {step.details && (
                  <p className={styles.wwStepDetails}>{step.details}</p>
                )}
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );

  const mainQuestContent = (
    <div className={styles.mqContent}>
      <StepNavigator
        sections={map.mainQuest.sections}
        mapSlug={map.slug}
        onSwitchToWonderWeapon={() => setActiveTab('ww')}
      />
    </div>
  );

  const solversContent = (
    <div className={styles.solversContent}>
      {map.slug === 'kowakujo' && (
        <div className={styles.solversList}>
          <ScrollSolver />
          <hr className={styles.solverDivider} />
          <FlagSolver />
          <hr className={styles.solverDivider} />
          <MurderCaseSolver />
        </div>
      )}
      {map.slug === 'ashes-of-the-damned' && (
        <div className={styles.solversList}>
          <PigpenSolver />
          <hr className={styles.solverDivider} />
          <ZaryaConsoleSolver />
        </div>
      )}
      {map.slug === 'astra' && (
        <div className={styles.solversList}>
          <PlanetAlignmentSolver />
          <hr className={styles.solverDivider} />
          <PillarSymbolSolver />
          <hr className={styles.solverDivider} />
          <MarsCodeSolver />
          <hr className={styles.solverDivider} />
          <PlanetCodeSolver />
          <hr className={styles.solverDivider} />
          <BookCounterSolver />
        </div>
      )}
      {map.slug === 'paradox' && (
        <div className={styles.solversList}>
          <NoteOrderSolver />
        </div>
      )}
      {map.slug === 'rex-infernus' && (
        <div className={styles.solversList}>
          <RexInfernusSolver />
        </div>
      )}
      {map.slug === 'totenreich' && (
        <div className={styles.solversList}>
          <CrateFinderSolver />
          <hr className={styles.solverDivider} />
          <ClawMachineSolver />
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.mapPage}>
      {/* Hero Header */}
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>{map.game}</span>
          <h1 className={styles.heroTitle}>{map.name}</h1>
          <p className={styles.heroSubtitle}>{map.subtitle}</p>
        </div>
      </header>

      {/* Tabs */}
      <div className={styles.body}>
        <Tabs
          tabs={[
            { id: 'mq', label: 'Main Quest', content: mainQuestContent },
            { id: 'ww', label: 'Wonder Weapon', content: wonderWeaponContent },
            { id: 'solvers', label: 'Solvers', content: solversContent },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}
