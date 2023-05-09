import { environment } from 'config';
import { HttpError } from 'error';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtType } from 'types';
import { errorHandler } from 'utils';

export const verifyAccessToken = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  if (!token) throw new HttpError(401, 'Unauthorized');

  try {
    const decodedToken = jwt.verify(token, environment.secretAccessToken) as JwtType;
    req.userId = decodedToken.userId;
    req.role = decodedToken.role;
    next();
  } catch (error) {
    throw new HttpError(401, 'Unauthorized - the access token has expired!');
  }
});
