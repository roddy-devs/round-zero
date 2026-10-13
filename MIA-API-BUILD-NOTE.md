# BUILD NOTE — Round Zero API for Mia (voice assistant) integration

**Status: TO BUILD (spec only — not implemented yet).**
Authored 2026-10-13 as a handoff for a dedicated build session. Round Zero
(`personal/round-zero`) should expose a small, read-mostly API so the Mia home
brain (`personal/mia`) can answer BO7 Zombies questions by voice (DPS, map
guides/relics, and the voice-describable solvers).

## Why
Round Zero's solvers + DPS calculator are **client-side React** (no server data
for them today — only `/api/health` + `/api/runs` exist). Mia can't run browser
JS, so the knowledge must be exposed as JSON endpoints. See `personal/mia`'s
HANDOFF for the Mia side (a `roundzero` tool will call these endpoints).

## Deployment (confirmed)
AWS: ECR image → EC2 `hiro-apps` box → Caddy, deployed via SSM
(`deploy/remote.sh`, `deploy/db.sh`). Secrets in SSM `/hiro-apps/round-zero/*`.
Live at `https://round-zero.hiro-labs.dev`. Postgres via Prisma. **New routes go
in `server/index.ts`** (Express); redeploy with the existing scripts.

## Endpoints to add (all GET unless noted; no auth needed — public read data)

### Reference data (serve existing `src/data`, ALL maps incl. Ashes)
- `GET /api/dps` — the `bo7Weapons` table from `src/data/bo7Dps.ts` (342 rows:
  rank, name, class, damagePerShot, rpm, dps, tier, percentile). Support query
  params: `?name=`, `?class=`, `?tier=`, `?top=N`. Include `ULTRA_PAP4_FACTOR`
  (1.71875) + a note so Mia can compute Ultra/PaP4 DPS.
- `GET /api/maps` — list `{slug,name,game,subtitle}` from `src/data/index.ts`.
- `GET /api/maps/:slug` — full `MapData` (wonderWeapon + mainQuest sections/steps
  + relics). Serves guides incl. Paradox piano wall order text.
- `GET /api/relics?map=` — from `src/data/bo7Relics.ts`.

### Stateless compute solvers (voice-describable). Port the EXACT logic from the
### matching component. Prefer `POST /api/solve/:name` with JSON inputs.
- `murder-case` (Rex Infernus) — inputs: accomplice, symptom, tod, hours,
  painting4 symbol → paintings 1–5 + zodiac dial. Logic in
  `src/components/solvers/MurderCaseSolver.tsx` (SYMPTOM_TOXINS,
  ACCOMPLICE_EXCLUDES, TOXIN_NAMES, ACCOMPLICE_ITEMS, SYMBOL_ITEMS, ZODIAC;
  dial = ((tod − hours) mod 12)).
- `flag` (clock & flag puzzle) — inputs: clocks[4], flags[6] → placements.
  Backtracking solver in `FlagSolver.tsx` (`solveFlagPuzzle`).
- `pillar-symbol` (Mars) — input: 4 seen symbols → the missing one. `SYMBOLS`
  list in `PillarSymbolSolver.tsx` (Diamond/X/Glove/Circle/Everything).
- `book-counter` (Archive of Orbis) — input: book titles shown → turns per bust.
  `BOOK_TITLES`→bust map in `BookCounterSolver.tsx`.
- `rex-infernus-codes` — FIXED data: fracture-dial positions
  (1 Mid,2 R,3 L,4 R,5 Mid,6 Mid,7 L) + house-code symbol set {M,H,U,D}
  (`RexInfernusCodesSolver.tsx`). Serve as reference.
- `rex-infernus-riddle` — riddle→solution lookup (`RexInfernusSolver.tsx`
  RIDDLE_SOLUTIONS).

### FIXED codes to expose as plain reference (the owner said "handle/piano codes
### are fixed"):
- **Paradox note/piano order:** `PIANO_ORDER = '8-6-7-5-6-5-3-5'` with the 8
  note LOCATIONS (`NoteOrderSolver.tsx`). Expose at `GET /api/codes/paradox-piano`.
- Add any other fixed handle/piano codes found per map under `GET /api/codes/:map`.

## NOT in the API (handled by Mia's session scratchpad, not Round Zero)
"Remember what I dictate, give it back" items are a Mia memory feature, not a
Round Zero endpoint: dictated note order, dictated pillar symbols, Mars
coordinate code recall, planet alignment (Astra) tracking. Mia will store these
in its own session store. (So the API only needs the FIXED/compute pieces above.)

## Excluded entirely
**Ashes of the Damned** interactive solvers — visual/click puzzles the owner
can't describe by voice. (Its DPS/guide/relics reference data is still served.)
Astra Malorum IS included (planet alignment tracked on the Mia side).

## Mia side (separate repo `personal/mia`)
Build a governed `roundzero` tool (pattern: `packages/core-daemon/src/aura-tools.ts`)
that calls these endpoints (base `AURA`-style: `ROUNDZERO_BASE_URL`,
default `https://round-zero.hiro-labs.dev`). Low risk, fail-soft. The
dictate-and-recall items use a small session scratchpad tool in the brain.
