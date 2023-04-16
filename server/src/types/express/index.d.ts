import { UserIdType } from 'types/refresh-token.types';

declare global {
  namespace Express {
    interface Request {
      userId: UserIdType;
    }
  }
}
