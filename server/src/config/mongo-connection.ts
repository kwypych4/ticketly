import { logger } from 'logger';
import mongoose from 'mongoose';
import { initialUserCreator } from 'utils';

import { environment } from './environment';

export const mongoConnect = () => {
  mongoose.connect(environment.mongoPath as string, {
    user: environment.mongoDbUser,
    pass: environment.mongoDbPassword,
    dbName: 'ticketly',
  });

  const db: mongoose.Connection = mongoose.connection;

  db.on('error', (error) => logger.error(error));
  db.once('connected', () => {
    logger.info('Connected to DB');
    initialUserCreator();
  });
};
