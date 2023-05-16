import { Request } from 'express';
import { JwtType } from 'types';

export const removeAllUserSessions = (req: Request, refreshToken: JwtType | null) =>
  req.sessionStore.all?.((_, sessions) =>
    [sessions]?.forEach((session) => {
      if (refreshToken && session) {
        Object.entries(session).forEach(([key, value]) => {
          if (value.userId === refreshToken.userId) req.sessionStore.destroy(key);
        });
      }
    })
  );
