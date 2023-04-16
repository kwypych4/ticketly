import { environment } from 'config';
import { pino } from 'pino';

export const logger = pino({
  level: environment.logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
});
