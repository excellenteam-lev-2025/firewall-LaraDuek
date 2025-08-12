import { Request, Response } from 'express';
import {RuleMode,isRuleMode} from '../utils/constants'; 


type RuleOperationFn<T> = (values: T[], mode: RuleMode) => Promise<any[]>;
export function createAddHandler<T>(
  type: 'ip' | 'url' | 'port',
  addFn: RuleOperationFn<T>
) {
  return async function handleAdd(req: Request, res: Response) {
    try {
      const { values, mode } = req.body;

      if (!values || !Array.isArray(values) || !mode) {
        return res.status(400).json({ error: 'Missing or invalid values/mode' });
      }

      const result = await addFn(values, mode);

      return res.status(201).json({
        type,
        mode,
        values: result,
        status: 'success',
      });
    } catch (err) {
      console.error(`Error in ${type} add handler:`, err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export function createDeleteHandler<T>(
  type: 'ip' | 'url' | 'port',
  deleteFn: RuleOperationFn<T>
) {
  return async function handleDelete(req: Request, res: Response) {
    try {
      const { values, mode } = req.body;

      if (!values || !Array.isArray(values) || !mode) {
        return res.status(400).json({ error: 'Missing or invalid values/mode' });
      }

      const result = await deleteFn(values, mode);

      return res.status(200).json({
        type,
        mode,
        values: result,
        status: 'success',
      });
    } catch (err) {
      console.error(`Error in ${type} delete handler:`, err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}