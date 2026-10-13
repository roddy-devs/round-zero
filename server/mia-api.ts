// ─── Round Zero API for Mia (voice assistant) ─────────────────────────────────
// Read-mostly JSON surface so the Mia home brain can answer BO7 Zombies questions
// by voice: DPS, map guides/relics, and the voice-describable solvers.
//
// Solver logic here is a 1:1 port of the client-side React components in
// `src/components/solvers/*`. Reference data (DPS, maps, relics) is imported
// directly from `src/data` and bundled by esbuild at build time.
//
// See MIA-API-BUILD-NOTE.md for the full spec.

import { bo7Weapons, ULTRA_PAP4_FACTOR, dpsSummary } from '../src/data/bo7Dps';
import type { Bo7Weapon } from '../src/data/bo7Dps';
import { bo7Relics, bo7RelicMaps } from '../src/data/bo7Relics';
import { maps, getMapBySlug } from '../src/data/index';

// ─── Reference: DPS ────────────────────────────────────────────────────────────

export interface DpsQuery {
  name?: string;
  class?: string;
  tier?: string;
  top?: string | number;
}

/**
 * Filter + slice the BO7 weapons table. Mirrors the client DPS page semantics:
 * - `name`  — case-insensitive substring match on the display name.
 * - `class` — case-insensitive exact match on weapon class.
 * - `tier`  — case-insensitive exact match on DPS tier (S/A/B/C/D).
 * - `top`   — keep only the top N rows (already rank-sorted, rank 1 = highest DPS).
 */
export function queryDps(q: DpsQuery = {}): {
  count: number;
  total: number;
  ultraPap4Factor: number;
  note: string;
  summary: typeof dpsSummary;
  weapons: Bo7Weapon[];
} {
  let rows: Bo7Weapon[] = bo7Weapons;

  if (q.name) {
    const needle = String(q.name).toLowerCase();
    rows = rows.filter((w) => w.name.toLowerCase().includes(needle));
  }
  if (q.class) {
    const cls = String(q.class).toLowerCase();
    rows = rows.filter((w) => w.weaponClass.toLowerCase() === cls);
  }
  if (q.tier) {
    const tier = String(q.tier).toUpperCase();
    rows = rows.filter((w) => w.tier === tier);
  }

  // Keep rank order (ascending rank = descending DPS) before applying `top`.
  rows = [...rows].sort((a, b) => a.rank - b.rank);

  if (q.top !== undefined && q.top !== '') {
    const n = Number(q.top);
    if (Number.isFinite(n) && n > 0) {
      rows = rows.slice(0, Math.floor(n));
    }
  }

  return {
    count: rows.length,
    total: bo7Weapons.length,
    ultraPap4Factor: ULTRA_PAP4_FACTOR,
    note:
      'Baseline DPS/damagePerShot are Legendary + Triple Pack-A-Punch. Multiply ' +
      `either value by ultraPap4Factor (${ULTRA_PAP4_FACTOR}) to get Ultra rarity + PaP4 ` +
      'figures. RPM, tier, and percentile ranking are unchanged by that scaling.',
    summary: dpsSummary,
    weapons: rows,
  };
}

// ─── Reference: maps + relics ───────────────────────────────────────────────────

export function listMaps(): { slug: string; name: string; game: string; subtitle: string }[] {
  return maps.map((m) => ({
    slug: m.slug,
    name: m.name,
    game: m.game,
    subtitle: m.subtitle,
  }));
}

export function getMap(slug: string) {
  return getMapBySlug(slug) ?? null;
}

export function listRelics(map?: string) {
  if (map) {
    const needle = map.toLowerCase();
    // Match either the display map name or its slugified id prefix.
    const relics = bo7Relics.filter(
      (r) => r.map.toLowerCase() === needle || r.id.startsWith(`${slugify(map)}--`),
    );
    return { map, count: relics.length, maps: bo7RelicMaps, relics };
  }
  return { count: bo7Relics.length, maps: bo7RelicMaps, relics: bo7Relics };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Solver: murder-case (Rex Infernus) ─────────────────────────────────────────
// Ported from src/components/solvers/MurderCaseSolver.tsx

const SYMPTOM_TOXINS: Record<string, string[]> = {
  plant: ['flower', 'plumpits'],
  emesis: ['plumpits', 'pufferfish'],
  paralysis: ['pufferfish', 'flower'],
};

const ACCOMPLICE_EXCLUDES: Record<string, string> = {
  courtier: 'plumpits',
  merchant: 'flower',
  gardener: 'pufferfish',
};

const TOXIN_NAMES: Record<string, string> = {
  flower: 'Monkshood',
  plumpits: 'Plum Pits',
  pufferfish: 'Pufferfish',
};

const ACCOMPLICE_ITEMS: Record<string, string> = {
  merchant: 'Abacus',
  courtier: "Noble's Hat",
  gardener: "Gardener's Shears",
};

const SYMBOL_ITEMS: Record<string, string> = {
  fish: 'Tea Whisk',
  mountains: 'Horse Statuette',
  bird: 'Calligraphy Brush',
};

const ZODIAC = [
  'Rat', 'Ox', 'Tiger', 'Hare', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Boar',
];

export interface MurderCaseInput {
  /** 'merchant' | 'courtier' | 'gardener' */
  accomplice?: string;
  /** 'plant' | 'emesis' | 'paralysis' */
  symptom?: string;
  /** Time-of-death zodiac index 0-11 (Rat=0 … Boar=11). */
  tod?: number | string;
  /** Toxin effect time in hours (1-12). */
  hours?: number | string;
  /** Symbol on the 4th painting: 'fish' | 'mountains' | 'bird'. */
  painting4?: string;
}

export function solveMurderCase(input: MurderCaseInput) {
  const { accomplice = '', symptom = '', tod = '', hours = '', painting4 = '' } = input;

  const painting1 = 'Comb';
  const painting5 = 'Crest Medallion';

  const painting2 = accomplice ? ACCOMPLICE_ITEMS[accomplice] ?? null : null;

  let painting3: string | null = null;
  if (symptom && accomplice) {
    const candidates = SYMPTOM_TOXINS[symptom]?.filter(
      (t) => t !== ACCOMPLICE_EXCLUDES[accomplice],
    );
    if (candidates?.length === 1) {
      painting3 = TOXIN_NAMES[candidates[0]];
    }
  }

  const painting4Result = painting4 ? SYMBOL_ITEMS[painting4] ?? null : null;

  let dial: string | null = null;
  if (tod !== '' && hours !== '') {
    const todIdx = parseInt(String(tod), 10);
    const h = parseInt(String(hours), 10);
    if (!isNaN(todIdx) && !isNaN(h)) {
      const dialIdx = (((todIdx - h) % 12) + 12) % 12;
      dial = ZODIAC[dialIdx];
    }
  }

  return {
    paintings: {
      1: painting1,
      2: painting2,
      3: painting3,
      4: painting4Result,
      5: painting5,
    },
    zodiacDial: dial,
  };
}

// ─── Solver: flag (clock & flag puzzle) ──────────────────────────────────────────
// Ported from src/components/solvers/FlagSolver.tsx

interface FlagSolution {
  points: { clock: number; flags: number[] }[];
}

function solveFlagPuzzle(clocks: number[], flags: number[]): FlagSolution[] {
  const assign: number[] = Array(6).fill(-1);
  const raw: FlagSolution[] = [];

  function bt(i: number) {
    if (i === 6) {
      const grouped: number[][] = [[], [], [], []];
      for (let f = 0; f < 6; f++) {
        grouped[assign[f]].push(flags[f]);
      }
      for (let p = 0; p < 4; p++) {
        if (grouped[p].length < 1 || grouped[p].length > 2) return;
        const sum = grouped[p].reduce((a, b) => a + b, 0);
        if (sum !== clocks[p]) return;
      }
      raw.push({
        points: grouped.map((g, p) => ({ clock: clocks[p], flags: g })),
      });
      return;
    }

    for (let p = 0; p < 4; p++) {
      const cnt = assign.slice(0, i).filter((a) => a === p).length;
      if (cnt >= 2) continue;
      const sm = assign
        .slice(0, i)
        .reduce((acc, a, idx) => (a === p ? acc + flags[idx] : acc), 0);
      if (sm + flags[i] > clocks[p]) continue;

      assign[i] = p;
      bt(i + 1);
      assign[i] = -1;
    }
  }

  bt(0);

  const seen = new Set<string>();
  const unique: FlagSolution[] = [];
  for (const sol of raw) {
    const key = sol.points
      .map((pt) => `${pt.clock}:${[...pt.flags].sort().join('+')}`)
      .sort()
      .join('|');
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(sol);
    }
  }

  return unique;
}

export interface FlagInput {
  clocks: (number | string)[];
  flags: (number | string)[];
}

export function solveFlag(input: FlagInput): {
  ok: boolean;
  error?: string;
  clockTotal?: number;
  flagTotal?: number;
  solutions?: FlagSolution[];
} {
  const clocks = (input.clocks ?? []).map((v) => parseInt(String(v), 10));
  const flags = (input.flags ?? []).map((v) => parseInt(String(v), 10));

  if (clocks.length !== 4 || flags.length !== 6) {
    return { ok: false, error: 'Expected 4 clock values and 6 flag values.' };
  }
  if (clocks.some(isNaN) || flags.some(isNaN)) {
    return { ok: false, error: 'Fill in all fields with numbers.' };
  }

  const clockTotal = clocks.reduce((a, v) => a + v, 0);
  const flagTotal = flags.reduce((a, v) => a + v, 0);
  if (clockTotal !== flagTotal) {
    return {
      ok: false,
      error: `Clock total (${clockTotal}) doesn't match flag total (${flagTotal}).`,
      clockTotal,
      flagTotal,
    };
  }

  const solutions = solveFlagPuzzle(clocks, flags);
  if (solutions.length === 0) {
    return { ok: false, error: 'No valid solution found for these values.', clockTotal, flagTotal };
  }

  return { ok: true, clockTotal, flagTotal, solutions };
}

// ─── Solver: pillar-symbol (Mars) ────────────────────────────────────────────────
// Ported from src/components/solvers/PillarSymbolSolver.tsx

const PILLAR_SYMBOLS = [
  { id: 1, name: 'Diamond', location: 'Back Left' },
  { id: 2, name: 'X', location: 'Far Left' },
  { id: 3, name: 'Glove', location: 'Center Right' },
  { id: 4, name: 'Circle', location: 'Top Right' },
  { id: 5, name: 'Everything', location: 'Bottom Right' },
] as const;

export interface PillarSymbolInput {
  /**
   * The 4 symbols the player can see, by id (1-5) or name. The solver returns
   * the single missing one.
   */
  seen: (number | string)[];
}

export function solvePillarSymbol(input: PillarSymbolInput): {
  ok: boolean;
  error?: string;
  missing?: { id: number; name: string; location: string };
} {
  const seen = input.seen ?? [];
  const seenIds = new Set<number>();
  for (const s of seen) {
    const byId = typeof s === 'number' ? s : parseInt(String(s), 10);
    const match = Number.isFinite(byId)
      ? PILLAR_SYMBOLS.find((p) => p.id === byId)
      : PILLAR_SYMBOLS.find((p) => p.name.toLowerCase() === String(s).toLowerCase());
    if (match) seenIds.add(match.id);
  }

  if (seenIds.size !== 4) {
    return {
      ok: false,
      error: 'Provide exactly 4 distinct seen symbols (by id 1-5 or by name).',
    };
  }

  const missing = PILLAR_SYMBOLS.find((p) => !seenIds.has(p.id));
  if (!missing) {
    return { ok: false, error: 'Could not determine a missing symbol.' };
  }
  return { ok: true, missing: { id: missing.id, name: missing.name, location: missing.location } };
}

// ─── Solver: book-counter (Archive of Orbis) ─────────────────────────────────────
// Ported from src/components/solvers/BookCounterSolver.tsx

interface BookTitle {
  id: number;
  title: string;
  bust: number;
}

const BOOK_TITLES: BookTitle[] = [
  { id: 1, title: 'The Musica Universalis', bust: 1 },
  { id: 2, title: 'The Black Veil', bust: 1 },
  { id: 3, title: 'The Moon Directive', bust: 1 },
  { id: 4, title: 'Ash and Bone', bust: 2 },
  { id: 5, title: 'Echoes of Andromeda', bust: 2 },
  { id: 6, title: 'The Unknowable Void', bust: 2 },
  { id: 7, title: 'Pyramid of Cydonia', bust: 3 },
  { id: 8, title: 'Silence at Singularity', bust: 3 },
  { id: 9, title: 'Witchlight Codex', bust: 3 },
];

export interface BookCounterInput {
  /** Book titles shown by the machine — matched by id or (case-insensitive) title. */
  titles: (number | string)[];
}

export function solveBookCounter(input: BookCounterInput): {
  ok: boolean;
  error?: string;
  matched?: { id: number; title: string; bust: number }[];
  unmatched?: (number | string)[];
  busts?: { bust: number; interactions: number }[];
} {
  const titles = input.titles ?? [];
  if (!Array.isArray(titles) || titles.length === 0) {
    return { ok: false, error: 'Provide the book titles shown (by id or title).' };
  }

  const matched: BookTitle[] = [];
  const unmatched: (number | string)[] = [];
  for (const t of titles) {
    const byId = typeof t === 'number' ? t : parseInt(String(t), 10);
    const match = Number.isFinite(byId) && String(byId) === String(t).trim()
      ? BOOK_TITLES.find((b) => b.id === byId)
      : BOOK_TITLES.find((b) => b.title.toLowerCase() === String(t).toLowerCase());
    if (match) matched.push(match);
    else unmatched.push(t);
  }

  const busts = [1, 2, 3].map((bust) => ({
    bust,
    interactions: matched.filter((b) => b.bust === bust).length,
  }));

  return {
    ok: true,
    matched: matched.map((b) => ({ id: b.id, title: b.title, bust: b.bust })),
    unmatched,
    busts,
  };
}

// ─── Fixed reference: Rex Infernus codes ─────────────────────────────────────────
// Ported from src/components/solvers/RexInfernusCodesSolver.tsx

export const rexInfernusCodes = {
  fractureDials: [
    { dial: 1, position: 'Middle' },
    { dial: 2, position: 'Right' },
    { dial: 3, position: 'Left' },
    { dial: 4, position: 'Right' },
    { dial: 5, position: 'Middle' },
    { dial: 6, position: 'Middle' },
    { dial: 7, position: 'Left' },
  ],
  pianoCode: '867565354',
  houseCode: {
    length: 4,
    symbols: ['M', 'H', 'U', 'D'],
    note: 'The 4-character house code is run-specific — record the symbols you see in-game. Valid symbols are M, H, U, D.',
  },
} as const;

// ─── Fixed reference: Rex Infernus riddle lookup ─────────────────────────────────
// Ported from src/components/solvers/RexInfernusSolver.tsx

export const rexInfernusRiddles = [
  {
    id: 'r1',
    label: 'Riddle 1',
    sentence:
      'I remember the runner that travels to stars, while moons and galaxies stay true.',
    left: 0,
    bottom: 2,
    right: 3,
  },
  {
    id: 'r2',
    label: 'Riddle 2',
    sentence:
      'I drift to the runner that travels moon, who borrow from galaxies when stars stay true.',
    left: 3,
    bottom: 2,
    right: 1,
  },
  {
    id: 'r3',
    label: 'Riddle 3',
    sentence:
      'I drift to stars that remember moons, who borrow the runner that travels the galaxy.',
    left: 1,
    bottom: 2,
    right: 2,
  },
  {
    id: 'r4',
    label: 'Riddle 4',
    sentence:
      'I remember galaxies that drift to moons, who borrow the runner that travels the stars.',
    left: 2,
    bottom: 0,
    right: 2,
  },
] as const;

/** Lookup a riddle solution by id or by (fuzzy) sentence substring. */
export function solveRexInfernusRiddle(input: { id?: string; sentence?: string }) {
  if (input.id) {
    const match = rexInfernusRiddles.find((r) => r.id === input.id);
    if (match) return { ok: true as const, riddle: match };
  }
  if (input.sentence) {
    const needle = input.sentence.toLowerCase().trim();
    const match =
      rexInfernusRiddles.find((r) => r.sentence.toLowerCase() === needle) ??
      rexInfernusRiddles.find((r) => r.sentence.toLowerCase().includes(needle)) ??
      rexInfernusRiddles.find((r) => needle.includes(r.sentence.toLowerCase().slice(0, 24)));
    if (match) return { ok: true as const, riddle: match };
  }
  return {
    ok: false as const,
    error: 'Provide a riddle id (r1-r4) or a sentence that matches one of the riddles.',
    riddles: rexInfernusRiddles,
  };
}

// ─── Fixed reference: Paradox piano / note order ─────────────────────────────────
// Ported from src/components/solvers/NoteOrderSolver.tsx

export const paradoxPiano = {
  pianoOrder: '8-6-7-5-6-5-3-5',
  noteCount: 8,
  noteLocations: [
    'Green House Front',
    'Green House Back',
    'Yellow House Front',
    'Yellow House Back',
    'Trinity Ave',
    'Cul-De-Sac',
    'Truck Interior',
    'Backyard',
  ],
  note:
    'Find all 8 blue notes around Destroyed Nuketown. Each note blinks 1-8 times ' +
    'indicating its collection order; interact in blink order (1 first). Then play ' +
    'the piano in the wall order 8-6-7-5-6-5-3-5.',
} as const;

/** Fixed codes keyed by map slug. Only maps with known fixed codes are present. */
export const fixedCodesByMap: Record<string, unknown> = {
  paradox: { pianoOrder: paradoxPiano.pianoOrder, noteLocations: paradoxPiano.noteLocations },
  'rex-infernus': {
    fractureDials: rexInfernusCodes.fractureDials,
    pianoCode: rexInfernusCodes.pianoCode,
    houseCode: rexInfernusCodes.houseCode,
  },
};

// ─── Solver dispatch ─────────────────────────────────────────────────────────────

export type SolveResult = { status: number; body: unknown };

export function dispatchSolve(name: string, input: Record<string, unknown>): SolveResult {
  switch (name) {
    case 'murder-case':
      return { status: 200, body: solveMurderCase(input as MurderCaseInput) };
    case 'flag': {
      const result = solveFlag(input as unknown as FlagInput);
      return { status: result.ok ? 200 : 400, body: result };
    }
    case 'pillar-symbol': {
      const result = solvePillarSymbol(input as unknown as PillarSymbolInput);
      return { status: result.ok ? 200 : 400, body: result };
    }
    case 'book-counter': {
      const result = solveBookCounter(input as unknown as BookCounterInput);
      return { status: result.ok ? 200 : 400, body: result };
    }
    case 'rex-infernus-codes':
      return { status: 200, body: rexInfernusCodes };
    case 'rex-infernus-riddle': {
      const result = solveRexInfernusRiddle(input as { id?: string; sentence?: string });
      return { status: result.ok ? 200 : 400, body: result };
    }
    default:
      return {
        status: 404,
        body: {
          error: `Unknown solver '${name}'.`,
          available: [
            'murder-case',
            'flag',
            'pillar-symbol',
            'book-counter',
            'rex-infernus-codes',
            'rex-infernus-riddle',
          ],
        },
      };
  }
}
