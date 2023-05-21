import { environment } from 'config';
import { HttpError } from 'error';
import { Request } from 'express';
import { logger } from 'logger';
import { RefreshTokenSchema, UserSchema } from 'models';
import { RefreshTokenType } from 'types';
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  errorHandler,
  removeAllUserSessions,
  validateRefreshToken,
} from 'utils';
import { cookiesParser } from 'utils/cookies-parser';

type LoginRequest = {
  body: {
    password: string;
    username: string;
  };
} & Request;

type LoginResponse = {
  accessToken: string;
};

const login = errorHandler<LoginRequest, LoginResponse>(async (req, res) => {
  const userDocument = await UserSchema.findOne({
    username: req.body.username,
  }).select('+password');

  const isLoginSuccess = userDocument && (await comparePassword(req.body?.password || '', userDocument.password));

  if (!isLoginSuccess) {
    throw new HttpError(403, 'Wrong username or password!');
  }

  const refreshTokenDocument = new RefreshTokenSchema<RefreshTokenType>({
    owner: userDocument.id,
  });

  await refreshTokenDocument.save();

  const accessToken = createAccessToken({
    userId: userDocument.id,
    role: userDocument.role,
    username: userDocument?.username,
    firstName: userDocument.firstName,
    lastName: userDocument.lastName,
    isThemeDark: userDocument.isThemeDark,
  });

  const refreshToken = createRefreshToken(userDocument.id, refreshTokenDocument.id);

  req.session.userId = userDocument.id;
  const refreshTokenExpDate = Number((environment.refreshTokenExpTime as string).split(/(\d+)/)[1]);

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * refreshTokenExpDate,
  });
  return {
    accessToken,
  };
});

const checkLogin = errorHandler<LoginRequest, LoginResponse>(async (req, res) => {
  const cookies = cookiesParser(req);
  const userDocument = await UserSchema.findOne({
    _id: req.session.userId,
  });

  const isUserLogged = userDocument && Boolean(req.session.userId);

  if (!isUserLogged) {
    if (cookies)
      Object.keys(cookies).map((cookie) => {
        res.clearCookie(cookie);
        return true;
      });
    throw new HttpError(403, 'Your session has expired!');
  }

  const accessToken = createAccessToken({
    userId: userDocument.id,
    role: userDocument.role,
    firstName: userDocument.firstName,
    username: userDocument?.username,
    lastName: userDocument.lastName,
    isThemeDark: userDocument.isThemeDark,
  });

  return {
    accessToken,
  };
});

type LogoutRequest = {
  body: {
    refreshToken: string;
  };
} & Request;

type LogoutResponse = {
  success: boolean;
};

const logout = errorHandler<LogoutRequest, LogoutResponse>(async (req, res) => {
  const cookies = cookiesParser(req);
  const refreshTokenCookie = 'jwt' in cookies ? cookies.jwt : '';

  const refreshToken = await validateRefreshToken(refreshTokenCookie as string);
  if (refreshToken) await RefreshTokenSchema.deleteOne({ _id: refreshToken.tokenId });

  if (cookies)
    Object.keys(cookies).map((cookie) => {
      res.clearCookie(cookie);
      return true;
    });

  req.session.destroy((error) => {
    if (error) logger.error(error);
  });

  return { success: true };
});

const logoutAll = errorHandler<LogoutRequest, LogoutResponse>(async (req, res) => {
  const cookies = cookiesParser(req);
  const refreshTokenCookie = 'jwt' in cookies ? cookies.jwt : '';

  const refreshToken = await validateRefreshToken(refreshTokenCookie as string);

  removeAllUserSessions({ req, refreshToken });

  if (refreshToken) await RefreshTokenSchema.deleteMany({ owner: refreshToken.userId });

  if (cookies)
    Object.keys(cookies).map((cookie) => {
      res.clearCookie(cookie);
      return true;
    });

  req.session.destroy((error) => {
    if (error) logger.error(error);
  });

  return { success: true };
});

type TokenRequest = {
  body: {
    refreshToken: string;
  };
} & Request;

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

const newRefreshToken = errorHandler<TokenRequest, TokenResponse>(async (req, _) => {
  const cookies = cookiesParser(req);
  const refreshTokenCookie = 'jwt' in cookies ? cookies.jwt : '';

  const currentRefreshToken = await validateRefreshToken(refreshTokenCookie as string);

  if (!currentRefreshToken) throw new HttpError(401, 'Unauthorized');

  const refreshTokenDocument = new RefreshTokenSchema<RefreshTokenType>({
    owner: currentRefreshToken.userId,
  });
  const userDocument = await UserSchema.findOne({
    _id: currentRefreshToken.userId,
  });

  if (!userDocument) throw new HttpError(401, 'Unauthorized');

  await refreshTokenDocument.save();
  await RefreshTokenSchema.deleteOne({ _id: currentRefreshToken.tokenId });

  const refreshToken = createRefreshToken(currentRefreshToken.userId, refreshTokenDocument.id);

  const accessToken = createAccessToken({
    userId: userDocument.id,
    role: userDocument.role,
    firstName: userDocument.firstName,
    username: userDocument.username,
    lastName: userDocument.lastName,
    isThemeDark: userDocument.isThemeDark,
  });

  return {
    accessToken,
    refreshToken,
  };
});

type NewTokenRequest = Request;

type NewTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

const newAccessToken = errorHandler<NewTokenRequest, NewTokenResponse>(async (req) => {
  const cookies = cookiesParser(req);
  const refreshTokenCookie = 'jwt' in cookies ? cookies.jwt : '';

  const refreshToken = await validateRefreshToken(refreshTokenCookie as string);
  if (!refreshToken) throw new HttpError(401, 'Unauthorized');

  const userDocument = await UserSchema.findOne({
    _id: refreshToken.userId,
  });

  if (!userDocument) throw new HttpError(401, 'Unauthorized');

  const accessToken = createAccessToken({
    userId: userDocument.id,
    role: userDocument.role,
    firstName: userDocument.firstName,
    username: userDocument.username,
    lastName: userDocument.lastName,
    isThemeDark: userDocument.isThemeDark,
  });

  return {
    accessToken,
    refreshToken: refreshTokenCookie as string,
  };
});

export const auth = {
  login,
  checkLogin,
  logout,
  logoutAll,
  newRefreshToken,
  newAccessToken,
};
