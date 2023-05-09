import { Request } from 'express';

export const cookiesParser = (request: Request) => {
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return {};

  const cookiesArray = cookieHeader.split(`;`).map((cookie) => {
    const [name, rest] = cookie.split(`=`);

    return {
      cookie: name.trim(),
      value: rest,
    };
  });

  if (!cookiesArray) return {};
  return cookiesArray.reduce((o, key) => ({ ...o, [key.cookie]: key.value }), {});
};
