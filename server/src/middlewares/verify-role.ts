import { HttpError } from 'error';
import { NextFunction, Request, Response } from 'express';
import { UserRoles } from 'types';

export const verifyRole = (role: UserRoles) => (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== role) throw new HttpError(401, 'Unauthorized - no permissions');

  next();
};
