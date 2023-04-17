import { HttpError } from 'error';
import { NextFunction, Request, Response } from 'express';
import { UserSchema } from 'models';
import { errorHandler } from 'utils';

export const verifySession = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId) throw new HttpError(403, 'You are not logged in!');

  try {
    const user = await UserSchema.findOne({ _id: req.session.userId });
    if (!user) throw new HttpError(401, 'Unauthorized');
    req.userId = user.id;
    next();
  } catch (error) {
    throw new HttpError(401, 'Unauthorized');
  }
});
