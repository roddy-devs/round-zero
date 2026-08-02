import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET /api/runs — fetch all runs, newest first
  if (req.method === 'GET') {
    try {
      const runs = await prisma.runLog.findMany({
        orderBy: { date: 'desc' },
      });
      return res.status(200).json(runs);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch runs' });
    }
  }

  // POST /api/runs — create a new run
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const run = await prisma.runLog.create({ data });
      return res.status(201).json(run);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create run' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
