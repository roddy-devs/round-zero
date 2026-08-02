export type RunPurpose = 'PB' | 'Consistency' | 'Test';
export type ExecutionGrade = 'A' | 'B' | 'C';
export type RunResult = 'Completion' | 'Reset';

export interface RunLog {
  id: string;
  date: string;                    // ISO date string
  patchRulesetVersion: string;
  routeVersion: string;
  purpose: RunPurpose;
  testVariable: string;
  controlCondition: string;
  executionGrade: ExecutionGrade;
  finalTime: string;               // mm:ss
  result: RunResult;
  resetPointCause: string;

  // Loadout
  weapon: string;
  packTimingLevel: string;
  perks: string;
  armorPurchased: boolean;
  gobbleGumsUsed: string;

  // Splits (all mm:ss strings, empty if not reached)
  s2Power: string;
  s3FirstObjectiveStart: string;
  s4FirstObjectiveComplete: string;
  s5FirstPack: string;
  s6FinalRequiredItem: string;
  s7BossEntry: string;
  s8FirstRam: string;
  bossCycleTimes: string;          // comma-separated or freeform

  // Analysis
  largestSplitGain: string;
  largestSplitLoss: string;
  pointTotalsS5S6S7: string;
  ammoStateAtS7: string;
  mistakes: string;
  resetWorthyMistake: boolean;
  validEvidenceReason: string;
  nextTest: string;
}

export const EMPTY_RUN: Omit<RunLog, 'id' | 'date'> = {
  patchRulesetVersion: '',
  routeVersion: '',
  purpose: 'PB',
  testVariable: '',
  controlCondition: '',
  executionGrade: 'B',
  finalTime: '',
  result: 'Completion',
  resetPointCause: '',
  weapon: '',
  packTimingLevel: '',
  perks: '',
  armorPurchased: false,
  gobbleGumsUsed: '',
  s2Power: '',
  s3FirstObjectiveStart: '',
  s4FirstObjectiveComplete: '',
  s5FirstPack: '',
  s6FinalRequiredItem: '',
  s7BossEntry: '',
  s8FirstRam: '',
  bossCycleTimes: '',
  largestSplitGain: '',
  largestSplitLoss: '',
  pointTotalsS5S6S7: '',
  ammoStateAtS7: '',
  mistakes: '',
  resetWorthyMistake: false,
  validEvidenceReason: '',
  nextTest: '',
};

const STORAGE_KEY = 'aotd-run-logs';

export function loadRuns(): RunLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RunLog[]) : [];
  } catch {
    return [];
  }
}

export function saveRuns(runs: RunLog[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
}

export function createRun(data: Omit<RunLog, 'id' | 'date'>): RunLog {
  return {
    ...data,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
}

export function deleteRun(runs: RunLog[], id: string): RunLog[] {
  return runs.filter((r) => r.id !== id);
}
