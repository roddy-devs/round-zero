import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid id' });
  }

  // DELETE /api/runs/[id]
  if (req.method === 'DELETE') {
    try {
      await prisma.runLog.delete({ where: { id } });
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete run' });
    }
  }

  // PATCH /api/runs/[id] — update a run
  if (req.method === 'PATCH') {
    try {
      const run = await prisma.runLog.update({
        where: { id },
        data: req.body,
      });
      return res.status(200).json(run);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update run' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
