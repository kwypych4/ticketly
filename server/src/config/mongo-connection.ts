import { logger } from 'logger';
import mongoose from 'mongoose';

import { environment } from './environment';

export const mongoConnect = () => {
  mongoose.connect(environment.mongoPath as string);

  const db: mongoose.Connection = mongoose.connection;

  db.on('error', (error) => logger.error(error));
  db.once('connected', () => logger.info('Connected to DB'));
};
