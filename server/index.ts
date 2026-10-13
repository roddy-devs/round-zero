import { fileURLToPath } from 'node:url';
import path from 'node:path';
import express, { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  queryDps,
  listMaps,
  getMap,
  listRelics,
  dispatchSolve,
  paradoxPiano,
  fixedCodesByMap,
} from './mia-api';

// ─── Prisma ──────────────────────────────────────────────────────────────────
// Single long-lived client for the lifetime of the server process (unlike the
// per-invocation client the old Vercel functions created).
function makePrisma(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

const prisma = makePrisma();

// ─── App ─────────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json({ limit: '1mb' }));

// Health check (used by the deploy verification gate + Caddy).
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

// GET /api/runs — fetch all runs, newest first
app.get('/api/runs', async (_req: Request, res: Response) => {
  try {
    const runs = await prisma.runLog.findMany({ orderBy: { date: 'desc' } });
    res.status(200).json(runs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/runs — create a new run
app.post('/api/runs', async (req: Request, res: Response) => {
  try {
    const run = await prisma.runLog.create({ data: req.body });
    res.status(201).json(run);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/runs/:id — update a run
app.patch('/api/runs/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const run = await prisma.runLog.update({ where: { id }, data: req.body });
    res.status(200).json(run);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/runs/:id — delete a run
app.delete('/api/runs/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.runLog.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Mia API (BO7 Zombies knowledge for the voice assistant) ──────────────────
// Public read-mostly endpoints. See MIA-API-BUILD-NOTE.md + server/mia-api.ts.

// GET /api/dps — BO7 weapon DPS table. Query: ?name= ?class= ?tier= ?top=N
app.get('/api/dps', (req: Request, res: Response) => {
  try {
    const { name, class: weaponClass, tier, top } = req.query;
    res.status(200).json(
      queryDps({
        name: typeof name === 'string' ? name : undefined,
        class: typeof weaponClass === 'string' ? weaponClass : undefined,
        tier: typeof tier === 'string' ? tier : undefined,
        top: typeof top === 'string' ? top : undefined,
      }),
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/maps — list of maps {slug,name,game,subtitle}
app.get('/api/maps', (_req: Request, res: Response) => {
  try {
    res.status(200).json({ maps: listMaps() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/maps/:slug — full MapData (guide + relics)
app.get('/api/maps/:slug', (req: Request, res: Response) => {
  try {
    const map = getMap(req.params.slug);
    if (!map) {
      res.status(404).json({ error: `No map with slug '${req.params.slug}'.` });
      return;
    }
    res.status(200).json(map);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/relics?map= — relic list, optionally filtered by map
app.get('/api/relics', (req: Request, res: Response) => {
  try {
    const { map } = req.query;
    res.status(200).json(listRelics(typeof map === 'string' ? map : undefined));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/solve/:name — stateless compute solvers
app.post('/api/solve/:name', (req: Request, res: Response) => {
  try {
    const input = (req.body ?? {}) as Record<string, unknown>;
    const { status, body } = dispatchSolve(req.params.name, input);
    res.status(status).json(body);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/codes/paradox-piano — fixed Paradox note/piano order
app.get('/api/codes/paradox-piano', (_req: Request, res: Response) => {
  res.status(200).json(paradoxPiano);
});

// GET /api/codes/:map — fixed handle/piano codes for a given map slug
app.get('/api/codes/:map', (req: Request, res: Response) => {
  const codes = fixedCodesByMap[req.params.map];
  if (!codes) {
    res.status(404).json({
      error: `No fixed codes for map '${req.params.map}'.`,
      available: Object.keys(fixedCodesByMap),
    });
    return;
  }
  res.status(200).json(codes);
});

// ─── Static SPA ──────────────────────────────────────────────────────────────
// Mirrors vercel.json: /api/* handled above, everything else -> dist/index.html.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

app.use(express.static(distDir));

// SPA fallback: any non-API GET that didn't match a static asset returns index.html.
app.get(/^(?!\/api\/).*/, (_req: Request, res: Response) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

const port = Number(process.env.PORT) || 3200;
app.listen(port, '0.0.0.0', () => {
  console.log(`round-zero listening on :${port}`);
});
