import { expressStart, mongoConnect } from 'config';
import * as dotenv from 'dotenv';
import { HttpError } from 'error';
import { NextFunction, Request, Response } from 'express';
import { logger } from 'logger';
import { routes } from 'routes';

dotenv.config();

mongoConnect();
const app = expressStart();

app.use('/api', routes);

app.use((err: HttpError, req: Request, res: Response, _: NextFunction) => {
  logger.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message });
});
