import { Request, Response } from 'express';
import { getAllRules, toggleMultipleRules } from '../services/rule.service';

export async function getAll(req: Request, res: Response) {
  try {
    const result = await getAllRules();
    res.status(200).json({
      status: 'success',
      rules: result,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function toggleRules(req: Request, res: Response) {
  try {
    const { ips, urls, ports } = req.body;

    const updated = await toggleMultipleRules({ ips, urls, ports });

    res.status(200).json({ updated });
  } catch (err) {
    console.error('Error toggling rules:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
