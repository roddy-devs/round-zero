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
  const { id } = req.query;
  if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid id' });

  const prisma = getPrisma();

  try {
    // DELETE /api/runs/[id]
    if (req.method === 'DELETE') {
      await prisma.runLog.delete({ where: { id } });
      return res.status(204).end();
    }

    // PATCH /api/runs/[id]
    if (req.method === 'PATCH') {
      const run = await prisma.runLog.update({ where: { id }, data: req.body });
      return res.status(200).json(run);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
