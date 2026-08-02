import { useState, useEffect } from 'react';
import {
  type RunLog,
  type RunPurpose,
  type ExecutionGrade,
  type RunResult,
  EMPTY_RUN,
} from '../data/runLog';
import styles from './RunLogPage.module.css';

// ─── API helpers ─────────────────────────────────────────────────────────────

async function fetchRuns(): Promise<RunLog[]> {
  const res = await fetch('/api/runs');
  if (!res.ok) throw new Error('Failed to fetch runs');
  return res.json();
}

async function postRun(data: Omit<RunLog, 'id' | 'date'>): Promise<RunLog> {
  const res = await fetch('/api/runs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save run');
  return res.json();
}

async function deleteRunById(id: string): Promise<void> {
  const res = await fetch(`/api/runs/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete run');
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ─── Run Card ─────────────────────────────────────────────────────────────────

function RunCard({ run, onView, onDelete }: { run: RunLog; onView: () => void; onDelete: () => void }) {
  return (
    <div className={`${styles.card} ${run.result === 'Reset' ? styles.cardReset : styles.cardComplete}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardMeta}>
          <span className={styles.cardDate}>{formatDate(run.date)}</span>
          <span className={`${styles.badge} ${run.result === 'Reset' ? styles.badgeReset : styles.badgeComplete}`}>{run.result}</span>
          <span className={`${styles.badge} ${styles.badgePurpose}`}>{run.purpose}</span>
          <span className={`${styles.badge} ${styles.badgeGrade}`}>Grade {run.executionGrade}</span>
        </div>
        <div className={styles.cardActions}>
          <button className={styles.btnSecondary} onClick={onView}>View</button>
          <button className={styles.btnDanger} onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardStat}><span className={styles.cardStatLabel}>Time</span><span className={styles.cardStatValue}>{run.finalTime || '—'}</span></div>
        <div className={styles.cardStat}><span className={styles.cardStatLabel}>Boss Entry</span><span className={styles.cardStatValue}>{run.s7BossEntry || '—'}</span></div>
        <div className={styles.cardStat}><span className={styles.cardStatLabel}>Weapon</span><span className={styles.cardStatValue}>{run.weapon || '—'}</span></div>
        <div className={styles.cardStat}><span className={styles.cardStatLabel}>Pack</span><span className={styles.cardStatValue}>{run.packTimingLevel || '—'}</span></div>
        <div className={styles.cardStat}><span className={styles.cardStatLabel}>Armor</span><span className={styles.cardStatValue}>{run.armorPurchased ? 'Yes' : 'No'}</span></div>
        <div className={styles.cardStat}><span className={styles.cardStatLabel}>Route v</span><span className={styles.cardStatValue}>{run.routeVersion || '—'}</span></div>
      </div>
      {run.mistakes && <p className={styles.cardMistakes}><strong>Mistakes:</strong> {run.mistakes}</p>}
    </div>
  );
}

// ─── Run Detail Modal ─────────────────────────────────────────────────────────

function RunDetail({ run, onClose }: { run: RunLog; onClose: () => void }) {
  const Field = ({ label, value }: { label: string; value: string | boolean }) => (
    <div className={styles.detailField}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue}>{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : (value || '—')}</span>
    </div>
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Run — {formatDate(run.date)}</h2>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.modalBody}>
          <section className={styles.detailSection}>
            <h3 className={styles.detailSectionTitle}>Meta</h3>
            <div className={styles.detailGrid}>
              <Field label="Date" value={formatDate(run.date)} />
              <Field label="Patch / Ruleset" value={run.patchRulesetVersion} />
              <Field label="Route Version" value={run.routeVersion} />
              <Field label="Purpose" value={run.purpose} />
              <Field label="Test Variable" value={run.testVariable} />
              <Field label="Control Condition" value={run.controlCondition} />
              <Field label="Execution Grade" value={run.executionGrade} />
              <Field label="Result" value={run.result} />
              <Field label="Final Time" value={run.finalTime} />
              <Field label="Reset Point / Cause" value={run.resetPointCause} />
            </div>
          </section>

          <section className={styles.detailSection}>
            <h3 className={styles.detailSectionTitle}>Loadout</h3>
            <div className={styles.detailGrid}>
              <Field label="Weapon" value={run.weapon} />
              <Field label="Pack Timing & Level" value={run.packTimingLevel} />
              <Field label="Perks" value={run.perks} />
              <Field label="Armor Purchased" value={run.armorPurchased} />
              <Field label="GobbleGums Used" value={run.gobbleGumsUsed} />
            </div>
          </section>

          <section className={styles.detailSection}>
            <h3 className={styles.detailSectionTitle}>Splits</h3>
            <div className={styles.splitsGrid}>
              {([
                ['S2', 'Power', run.s2Power],
                ['S3', 'First Objective Start', run.s3FirstObjectiveStart],
                ['S4', 'First Objective Complete', run.s4FirstObjectiveComplete],
                ['S5', 'First Pack', run.s5FirstPack],
                ['S6', 'Final Required Item', run.s6FinalRequiredItem],
                ['S7', 'Boss Entry', run.s7BossEntry],
                ['S8', 'First Ram', run.s8FirstRam],
              ] as [string, string, string][]).map(([id, label, val]) => (
                <div key={id} className={styles.splitRow}>
                  <span className={styles.splitId}>{id}</span>
                  <span className={styles.splitLabel}>{label}</span>
                  <span className={styles.splitValue}>{val || '—'}</span>
                </div>
              ))}
              <div className={styles.splitRow}>
                <span className={styles.splitId}>—</span>
                <span className={styles.splitLabel}>Boss Cycle Times</span>
                <span className={styles.splitValue}>{run.bossCycleTimes || '—'}</span>
              </div>
            </div>
          </section>

          <section className={styles.detailSection}>
            <h3 className={styles.detailSectionTitle}>Analysis</h3>
            <div className={styles.detailGrid}>
              <Field label="Largest Split Gain" value={run.largestSplitGain} />
              <Field label="Largest Split Loss" value={run.largestSplitLoss} />
              <Field label="Points at S5/S6/S7" value={run.pointTotalsS5S6S7} />
              <Field label="Ammo State at S7" value={run.ammoStateAtS7} />
              <Field label="Reset-worthy Mistake?" value={run.resetWorthyMistake} />
            </div>
            {run.mistakes && <div className={styles.detailNotes}><span className={styles.detailLabel}>Mistakes</span><p>{run.mistakes}</p></div>}
            {run.validEvidenceReason && <div className={styles.detailNotes}><span className={styles.detailLabel}>Evidence Validity</span><p>{run.validEvidenceReason}</p></div>}
            {run.nextTest && <div className={styles.detailNotes}><span className={styles.detailLabel}>Next Test</span><p>{run.nextTest}</p></div>}
          </section>
        </div>
      </div>
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

type FormState = Omit<RunLog, 'id' | 'date'>;

function RunForm({ onSave, onCancel, saving }: { onSave: (data: FormState) => void; onCancel: () => void; saving: boolean }) {
  const [form, setForm] = useState<FormState>({ ...EMPTY_RUN });
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const Input = ({ label, field, placeholder }: { label: string; field: keyof FormState; placeholder?: string }) => (
    <div className={styles.formField}>
      <label className={styles.formLabel}>{label}</label>
      <input className={styles.formInput} type="text" value={form[field] as string} placeholder={placeholder}
        onChange={(e) => set(field, e.target.value as FormState[typeof field])} />
    </div>
  );

  const Textarea = ({ label, field }: { label: string; field: keyof FormState }) => (
    <div className={styles.formField}>
      <label className={styles.formLabel}>{label}</label>
      <textarea className={styles.formTextarea} value={form[field] as string} rows={3}
        onChange={(e) => set(field, e.target.value as FormState[typeof field])} />
    </div>
  );

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <div className={styles.formSection}>
        <h3 className={styles.formSectionTitle}>Meta</h3>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Purpose</label>
            <select className={styles.formSelect} value={form.purpose} onChange={(e) => set('purpose', e.target.value as RunPurpose)}>
              <option value="PB">PB</option>
              <option value="Consistency">Consistency</option>
              <option value="Test">Test</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Result</label>
            <select className={styles.formSelect} value={form.result} onChange={(e) => set('result', e.target.value as RunResult)}>
              <option value="Completion">Completion</option>
              <option value="Reset">Reset</option>
            </select>
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Execution Grade</label>
            <select className={styles.formSelect} value={form.executionGrade} onChange={(e) => set('executionGrade', e.target.value as ExecutionGrade)}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <Input label="Final Time" field="finalTime" placeholder="mm:ss" />
          <Input label="Patch / Ruleset Version" field="patchRulesetVersion" placeholder="e.g. S4 Reloaded" />
          <Input label="Route Version" field="routeVersion" placeholder="e.g. v1.2" />
          <Input label="Test Variable" field="testVariable" placeholder="e.g. Skip armor" />
          <Input label="Control Condition" field="controlCondition" placeholder="e.g. Same weapon, same Pack timing" />
        </div>
        <Input label="Reset Point / Cause" field="resetPointCause" placeholder="Leave blank if completed" />
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.formSectionTitle}>Loadout</h3>
        <div className={styles.formGrid}>
          <Input label="Weapon" field="weapon" placeholder="e.g. LCAR-9" />
          <Input label="Pack Timing & Level" field="packTimingLevel" placeholder="e.g. Pack I at S5, Pack II before boss" />
          <Input label="Perks" field="perks" placeholder="e.g. Speed Cola, Juggernog, Quick Revive, PHD" />
          <Input label="GobbleGums Used" field="gobbleGumsUsed" placeholder="e.g. Who's Keeping Score (R3)" />
        </div>
        <div className={styles.formField}>
          <label className={styles.formCheckboxLabel}>
            <input type="checkbox" checked={form.armorPurchased} onChange={(e) => set('armorPurchased', e.target.checked)} />
            Gold Armor Purchased
          </label>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.formSectionTitle}>Splits</h3>
        <div className={styles.formGrid}>
          <Input label="S2 — Power" field="s2Power" placeholder="mm:ss" />
          <Input label="S3 — First Objective Start" field="s3FirstObjectiveStart" placeholder="mm:ss" />
          <Input label="S4 — First Objective Complete" field="s4FirstObjectiveComplete" placeholder="mm:ss" />
          <Input label="S5 — First Pack" field="s5FirstPack" placeholder="mm:ss" />
          <Input label="S6 — Final Required Item / Objective" field="s6FinalRequiredItem" placeholder="mm:ss" />
          <Input label="S7 — Boss Entry" field="s7BossEntry" placeholder="mm:ss" />
          <Input label="S8 — First Ram" field="s8FirstRam" placeholder="mm:ss" />
        </div>
        <Input label="Boss Cycle Times" field="bossCycleTimes" placeholder="e.g. 32s, 28s, 31s, 29s" />
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.formSectionTitle}>Analysis</h3>
        <div className={styles.formGrid}>
          <Input label="Largest Split Gain" field="largestSplitGain" placeholder="e.g. S3→S4 saved ~45s" />
          <Input label="Largest Split Loss" field="largestSplitLoss" placeholder="e.g. S7→S8 lost ~30s" />
          <Input label="Point Totals at S5 / S6 / S7" field="pointTotalsS5S6S7" placeholder="e.g. 28k / 41k / 47k" />
          <Input label="Ammo State at S7" field="ammoStateAtS7" placeholder="e.g. 60% primary, 40% secondary" />
        </div>
        <Textarea label="Mistakes" field="mistakes" />
        <div className={styles.formField}>
          <label className={styles.formCheckboxLabel}>
            <input type="checkbox" checked={form.resetWorthyMistake} onChange={(e) => set('resetWorthyMistake', e.target.checked)} />
            Run contained a reset-worthy mistake
          </label>
        </div>
        <Textarea label="Why this run is or is not valid evidence" field="validEvidenceReason" />
        <Textarea label="Next test" field="nextTest" />
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.btnSecondary} onClick={onCancel} disabled={saving}>Cancel</button>
        <button type="submit" className={styles.btnPrimary} disabled={saving}>{saving ? 'Saving...' : 'Save Run'}</button>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type View = 'list' | 'new' | 'detail';

export function RunLogPage() {
  const [runs, setRuns] = useState<RunLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('list');
  const [selectedRun, setSelectedRun] = useState<RunLog | null>(null);
  const [filterPurpose, setFilterPurpose] = useState<RunPurpose | 'All'>('All');
  const [filterResult, setFilterResult] = useState<RunResult | 'All'>('All');

  useEffect(() => {
    fetchRuns()
      .then(setRuns)
      .catch(() => setError('Failed to load runs'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (data: Omit<RunLog, 'id' | 'date'>) => {
    setSaving(true);
    setError(null);
    try {
      const created = await postRun(data);
      setRuns((prev) => [created, ...prev]);
      setView('list');
    } catch {
      setError('Failed to save run. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this run?')) return;
    try {
      await deleteRunById(id);
      setRuns((prev) => prev.filter((r) => r.id !== id));
      if (selectedRun?.id === id) { setSelectedRun(null); setView('list'); }
    } catch {
      setError('Failed to delete run.');
    }
  };

  const filtered = runs.filter((r) => {
    if (filterPurpose !== 'All' && r.purpose !== filterPurpose) return false;
    if (filterResult !== 'All' && r.result !== filterResult) return false;
    return true;
  });

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Run Log</h1>
          <p className={styles.pageSubtitle}>Ashes of the Damned — Speedrun Gauntlet</p>
        </div>
        {view === 'list' && (
          <button className={styles.btnPrimary} onClick={() => setView('new')}>+ New Run</button>
        )}
      </header>

      {error && <div className={styles.errorBanner}>{error}</div>}

      {view === 'new' && (
        <div className={styles.formWrap}>
          <h2 className={styles.formTitle}>Log a Run</h2>
          <RunForm onSave={handleSave} onCancel={() => setView('list')} saving={saving} />
        </div>
      )}

      {view === 'list' && (
        loading ? (
          <div className={styles.empty}><p>Loading runs...</p></div>
        ) : (
          <>
            {runs.length > 0 && (
              <div className={styles.filters}>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Purpose</label>
                  <select className={styles.filterSelect} value={filterPurpose} onChange={(e) => setFilterPurpose(e.target.value as RunPurpose | 'All')}>
                    <option value="All">All</option>
                    <option value="PB">PB</option>
                    <option value="Consistency">Consistency</option>
                    <option value="Test">Test</option>
                  </select>
                </div>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Result</label>
                  <select className={styles.filterSelect} value={filterResult} onChange={(e) => setFilterResult(e.target.value as RunResult | 'All')}>
                    <option value="All">All</option>
                    <option value="Completion">Completion</option>
                    <option value="Reset">Reset</option>
                  </select>
                </div>
                <span className={styles.filterCount}>{filtered.length} run{filtered.length !== 1 ? 's' : ''}</span>
              </div>
            )}
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>{runs.length === 0 ? 'No runs logged yet. Hit "+ New Run" to start tracking.' : 'No runs match the current filters.'}</p>
              </div>
            ) : (
              <div className={styles.runList}>
                {filtered.map((run) => (
                  <RunCard key={run.id} run={run}
                    onView={() => { setSelectedRun(run); setView('detail'); }}
                    onDelete={() => handleDelete(run.id)} />
                ))}
              </div>
            )}
          </>
        )
      )}

      {view === 'detail' && selectedRun && (
        <RunDetail run={selectedRun} onClose={() => setView('list')} />
      )}
    </div>
  );
}
