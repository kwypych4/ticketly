import { NextFunction, Response } from 'express';

export const errorHandler =
  <T, U>(fn: (req: T, res: Response, next: NextFunction) => Promise<U>) =>
  async (req: T, res: Response, next: NextFunction) => {
    try {
      let nextCalled = false;
      const result = await fn(req, res, (payload) => {
        nextCalled = true;
        next(payload);
      });

      if (!nextCalled && !res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      next(error);
    }
  };
