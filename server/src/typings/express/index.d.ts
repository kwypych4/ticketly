import 'express-session';

import { UserRoles } from 'types';
import { UserIdType } from 'types/refresh-token.types';

declare global {
  namespace Express {
    interface Request {
      userId: UserIdType;
      role: UserRoles;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userId: UserIdType;
  }
}
