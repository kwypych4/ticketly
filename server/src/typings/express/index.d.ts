import 'express-session';

import { UserIdType } from 'types/refresh-token.types';

declare global {
  namespace Express {
    interface Request {
      userId: UserIdType;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userId: UserIdType;
  }
}
