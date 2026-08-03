import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

function getPrisma() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const prisma = getPrisma();

  try {
    // GET /api/runs — fetch all runs, newest first
    if (req.method === 'GET') {
      const runs = await prisma.runLog.findMany({ orderBy: { date: 'desc' } });
      return res.status(200).json(runs);
    }

    // POST /api/runs — create a new run
    if (req.method === 'POST') {
      const run = await prisma.runLog.create({ data: req.body });
      return res.status(201).json(run);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
