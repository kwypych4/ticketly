import { Request } from 'express';
import { JwtType } from 'types';

type PropsWithRefreshTokenType = { req: Request; refreshToken: JwtType | null; userId?: never };
type PropsWithUserIdType = { req: Request; refreshToken?: never; userId: string };

type FnProps = PropsWithRefreshTokenType | PropsWithUserIdType;

export const removeAllUserSessions = ({ req, refreshToken, userId }: FnProps) =>
  req.sessionStore.all?.((_, sessions) =>
    [sessions]?.forEach((session) => {
      if (refreshToken && session) {
        Object.entries(session).forEach(([key, value]) => {
          if (value.userId === refreshToken.userId) req.sessionStore.destroy(key);
        });
      }
      if (userId && session) {
        Object.entries(session).forEach(([key, value]) => {
          if (String(value.userId) === userId) req.sessionStore.destroy(key);
        });
      }
    })
  );
