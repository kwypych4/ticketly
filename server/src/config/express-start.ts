import bodyParser from 'body-parser';
import express, { Express } from 'express';
import fileUpload from 'express-fileupload';
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
      secret: environment.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // cookie: if not appearing
        maxAge: 1000 * 60 * 60 * 24 * 365,
      },
    })
  );
  app.use(bodyParser.json());

  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );

  app.listen(port, () => {
    logger.info(`Server started on port ${port}`);
  });

  return app;
};
