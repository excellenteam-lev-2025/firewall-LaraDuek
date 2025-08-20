import { Request, Response, NextFunction } from 'express';

export function validateRequest(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing fields: ${missingFields.join(', ')}`,
      });
    }

    if ('values' in req.body && !Array.isArray(req.body.values)) {
      return res.status(400).json({
        error: `'values' must be an array`,
      });
    }

    next();
  };
}
