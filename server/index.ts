import { fileURLToPath } from 'node:url';
import path from 'node:path';
import express, { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

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
