import { environment } from 'config';
import { roles } from 'data';
import { HttpError } from 'error';
import { Request } from 'express';
import { RefreshTokenSchema, UserSchema } from 'models';
import { Schema } from 'mongoose';
import { RefreshTokenType, UserIdType, UserType } from 'types';
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  errorHandler,
  hashPassword,
  validateRefreshToken,
} from 'utils';
import { cookiesParser } from 'utils/cookies-parser';

type RegisterRequest = { body: UserType };

type RegisterResponse = {
  id: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
  accessToken: string;
  refreshToken: string;
};

const register = errorHandler<RegisterRequest, RegisterResponse>(async (req, _) => {
  if (!roles.includes(req.body?.role))
    throw new HttpError(500, `User can only have 'admin' or 'user' or 'engineer' role.`);

  const userDocument = new UserSchema<UserType>({
    username: req.body?.username,
    password: await hashPassword(req.body?.password),
    firstName: req.body?.firstName,
    lastName: req.body?.lastName,
    department: req.body?.department,
    position: req.body?.position,
    role: req.body?.role,
  });

  const refreshTokenDocument = new RefreshTokenSchema<RefreshTokenType>({
    owner: userDocument.id,
  });

  const accessToken = createAccessToken({
    userId: userDocument.id,
    role: req.body.role,
    isThemeDark: req.body?.isThemeDark || true,
  });
  const refreshToken = createRefreshToken(userDocument.id, refreshTokenDocument.id);

  await userDocument.save();
  await refreshTokenDocument.save();

  return {
    id: userDocument.id,
    accessToken,
    refreshToken,
  };
});

type LoginRequest = {
  body: {
    password: string;
    username: string;
  };
} & Request;

type LoginResponse = {
  username: string;
  uid: string;
  accessToken: string;
  refreshToken: string;
};

const login = errorHandler<LoginRequest, LoginResponse>(async (req, res) => {
  // TODO: Improve login and check login
  const userParams = req.body?.username ? { username: req.body.username } : { _id: req.session.userId };

  const userDocument = await UserSchema.findOne({
    ...userParams,
  }).select('+password');

  const isLoginSuccess = userDocument && (await comparePassword(req.body?.password || '', userDocument.password));
  const isUserLogged = userDocument && Boolean(req.session.userId);

  if (!isUserLogged && (!req.body?.username || !req.body?.password)) throw new HttpError(403, 'You are not logged in!');

  if (!isLoginSuccess && !isUserLogged) {
    throw new HttpError(401, 'Wrong username or password');
  }

  const refreshTokenDocument = new RefreshTokenSchema<RefreshTokenType>({
    owner: userDocument.id,
  });

  await refreshTokenDocument.save();

  const accessToken = createAccessToken({
    userId: userDocument.id,
    role: userDocument.role,
    isThemeDark: userDocument.isThemeDark || true,
  });
  const refreshToken = createRefreshToken(userDocument.id, refreshTokenDocument.id);

  req.session.userId = userDocument.id;
  const refreshTokenExpDate = Number((environment.refreshTokenExpTime as string).split(/(\d+)/)[1]);

  res.cookie('jwt', refreshToken, {
    httpOnly: false,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * refreshTokenExpDate,
  });
  return {
    username: userDocument?.username,
    uid: userDocument?.id,
    accessToken,
    refreshToken,
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

const logout = errorHandler<LogoutRequest, LogoutResponse>(async (req, _) => {
  const refreshToken = await validateRefreshToken(req.body?.refreshToken);
  if (!refreshToken) throw new HttpError(401, 'Unauthorized');
  await RefreshTokenSchema.deleteOne({ _id: refreshToken.tokenId });
  delete req.session.userId;
  return { success: true };
});

const logoutAll = errorHandler<LogoutRequest, LogoutResponse>(async (req, _) => {
  const refreshToken = await validateRefreshToken(req.body?.refreshToken);
  if (!refreshToken) throw new HttpError(401, 'Unauthorized');
  await RefreshTokenSchema.deleteMany({ owner: refreshToken.userId });

  return { success: true };
});

type TokenRequest = {
  body: {
    refreshToken: string;
  };
} & Request;

type TokenResponse = {
  uid: UserIdType;
  accessToken: string;
  refreshToken: string;
};

const newRefreshToken = errorHandler<TokenRequest, TokenResponse>(async (req, _) => {
  const currentRefreshToken = await validateRefreshToken(req.body?.refreshToken);

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
    userId: currentRefreshToken.userId,
    role: userDocument.role,
    isThemeDark: userDocument.isThemeDark || true,
  });
  return {
    uid: currentRefreshToken.userId,
    accessToken,
    refreshToken,
  };
});

type NewTokenRequest = Request;

type NewTokenResponse = {
  uid: UserIdType;
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
    userId: refreshToken.userId,
    role: userDocument.role,
    isThemeDark: userDocument.isThemeDark || true,
  });

  return {
    uid: refreshToken.userId,
    accessToken,
    refreshToken: refreshTokenCookie as string,
  };
});

export const auth = {
  login,
  logout,
  logoutAll,
  register,
  newRefreshToken,
  newAccessToken,
};
