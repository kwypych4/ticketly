import bodyParser from 'body-parser';
import express, { Express } from 'express';
import session from 'express-session';
import { logger } from 'logger';

import { environment } from './environment';

export const expressStart = () => {
  const app: Express = express();

  const port = environment.serverPort as string;

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(
    session({
      name: 'ticketly.sid',
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(bodyParser.json());
  app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  });

  return app;
};
