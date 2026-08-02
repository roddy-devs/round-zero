import { useState, useEffect, useCallback } from 'react';
import type { Section, Step, SubStep } from '../data';
import styles from './StepNavigator.module.css';

interface StepNavigatorProps {
  sections: Section[];
  mapSlug: string;
  onSwitchToWonderWeapon?: () => void;
}

function getStorageKey(mapSlug: string) {
  return `zee-progress-${mapSlug}`;
}

function loadCheckedState(mapSlug: string): Record<string, boolean> {
  try {
    const stored = localStorage.getItem(getStorageKey(mapSlug));
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveCheckedState(mapSlug: string, state: Record<string, boolean>) {
  localStorage.setItem(getStorageKey(mapSlug), JSON.stringify(state));
}

export function StepNavigator({ sections, mapSlug, onSwitchToWonderWeapon }: StepNavigatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    loadCheckedState(mapSlug)
  );
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    setActiveIndex(0);
    setChecked(loadCheckedState(mapSlug));
  }, [mapSlug]);

  const toggleStep = useCallback(
    (stepId: string) => {
      setChecked((prev) => {
        const next = { ...prev, [stepId]: !prev[stepId] };
        saveCheckedState(mapSlug, next);
        return next;
      });
    },
    [mapSlug]
  );

  const current = sections[activeIndex];

  const sectionProgress = (section: Section) => {
    const checkableSteps = section.steps.filter((s) => !s.isNote);
    const total = checkableSteps.length;
    const done = checkableSteps.filter((s) => checked[s.id]).length;
    return { total, done };
  };

  const currentProgress = sectionProgress(current);

  function renderLocation(location: string) {
    return (
      <span className={styles.location}>
        <span className={styles.locationIcon}>◈</span>
        {location}
      </span>
    );
  }

  function renderMedia(media: Step['media']) {
    if (!media) return null;
    return (
      <div className={styles.media}>
        {media.type === 'video' ? (
          <div className={styles.mediaVideo}>
            <iframe
              className={styles.mediaIframe}
              src={media.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
              title={media.caption ?? 'Video guide'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div
            className={styles.mediaThumbnail}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLightboxSrc(media.url); }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setLightboxSrc(media.url); }}
          >
            <img src={media.url} alt={media.caption ?? ''} />
            <span className={styles.expandIcon}>⤢</span>
          </div>
        )}
        {media.caption && <span className={styles.mediaCaption}>{media.caption}</span>}
      </div>
    );
  }

  function renderSubsteps(substeps: SubStep[]) {
    return (
      <ul className={styles.substepList}>
        {substeps.map((sub) => (
          <li key={sub.id} className={styles.substep}>
            <span className={styles.substepBullet} />
            <div className={styles.substepContent}>
              <span className={styles.substepText}>{sub.text}</span>
              {sub.location && renderLocation(sub.location)}
              {sub.media && renderMedia(sub.media)}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.navigator}>
      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div className={styles.track}>
          <div
            className={styles.trackFill}
            style={{ width: `${(activeIndex / Math.max(sections.length - 1, 1)) * 100}%` }}
          />
        </div>
        <div className={styles.dots}>
          {sections.map((section, i) => {
            const progress = sectionProgress(section);
            const isComplete = progress.done === progress.total && progress.total > 0;
            return (
              <button
                key={section.id}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''} ${isComplete ? styles.dotCompleted : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Section ${i + 1}: ${section.title}`}
                title={section.title}
              >
                {isComplete ? (
                  <span className={styles.dotCheck}>✓</span>
                ) : (
                  <span className={styles.dotIndex}>{i + 1}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content} key={current.id}>
        <div className={styles.contentHeader}>
          <div className={styles.headerMeta}>
            <span className={styles.sectionLabel}>
              Section {activeIndex + 1} of {sections.length}
            </span>
            <span className={styles.progressCount}>
              {currentProgress.done}/{currentProgress.total}
            </span>
          </div>
          <h3 className={styles.sectionTitle}>{current.title}</h3>
          <div className={styles.progressBarMini}>
            <div
              className={styles.progressBarMiniFill}
              style={{
                width: `${(currentProgress.done / Math.max(currentProgress.total, 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className={styles.stepList}>
          {current.steps.map((step) =>
            step.isNote ? (
              <div key={step.id} className={styles.noteStep}>
                <span className={styles.noteIcon}>✦</span>
                <p className={styles.noteText}>{step.text}</p>
              </div>
            ) : (
            <div
              key={step.id}
              className={`${styles.step} ${checked[step.id] ? styles.stepDone : ''}`}
            >
              <label className={styles.stepMain}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={!!checked[step.id]}
                  onChange={() => toggleStep(step.id)}
                />
                <span className={styles.checkmark} />
                <div className={styles.stepBody}>
                  {step.media?.type === 'video' && (
                    <span className={styles.videoBadge}>▶ Video</span>
                  )}
                  <p className={styles.stepText}>{step.text}</p>
                  {step.wonderWeaponLink && onSwitchToWonderWeapon && (
                    <button
                      className={styles.wwLink}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSwitchToWonderWeapon(); }}
                    >
                      ✦ View Wonder Weapon guide →
                    </button>
                  )}
                  {step.location && renderLocation(step.location)}
                  {step.details && (
                    <p className={styles.stepDetails}>{step.details}</p>
                  )}
                  {step.media && renderMedia(step.media)}
                  {step.substeps && step.substeps.length > 0 && renderSubsteps(step.substeps)}
                </div>
              </label>
            </div>
            )
          )}
        </div>
      </div>

      {/* Nav */}
      <div className={styles.navButtons}>
        <button
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
          disabled={activeIndex === 0}
        >
          <span className={styles.navArrow}>←</span>
          Previous
        </button>
        <button
          className={`${styles.navButton} ${styles.navButtonNext}`}
          onClick={() => setActiveIndex((i) => Math.min(sections.length - 1, i + 1))}
          disabled={activeIndex === sections.length - 1}
        >
          Next
          <span className={styles.navArrow}>→</span>
        </button>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-label="Expanded image"
        >
          <button className={styles.lightboxClose} onClick={() => setLightboxSrc(null)}>✕</button>
          <img src={lightboxSrc} alt="" className={styles.lightboxImage} />
        </div>
      )}
    </div>
  );
}
