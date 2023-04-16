import { HttpError } from 'error';
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

  const accessToken = createAccessToken(userDocument.id);
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
};

type LoginResponse = {
  username: string;
  uid: string;
  accessToken: string;
  refreshToken: string;
};

const login = errorHandler<LoginRequest, LoginResponse>(async (req, _) => {
  const userDocument = await UserSchema.findOne({
    username: req.body?.username,
  }).select('+password');

  const isLoginSuccess = userDocument && (await comparePassword(req.body?.password, userDocument.password));

  if (!isLoginSuccess) {
    throw new HttpError(401, 'Wrong username or password');
  }

  const refreshTokenDocument = new RefreshTokenSchema<RefreshTokenType>({
    owner: userDocument.id,
  });

  await refreshTokenDocument.save();

  const accessToken = createAccessToken(userDocument.id);
  const refreshToken = createRefreshToken(userDocument.id, refreshTokenDocument.id);

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
};

type LogoutResponse = {
  success: boolean;
};

const logout = errorHandler<LogoutRequest, LogoutResponse>(async (req, _) => {
  const refreshToken = await validateRefreshToken(req.body?.refreshToken);
  if (!refreshToken) throw new HttpError(401, 'Unauthorized');
  await RefreshTokenSchema.deleteOne({ _id: refreshToken.tokenId });

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
};

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

  await refreshTokenDocument.save();
  await RefreshTokenSchema.deleteOne({ _id: currentRefreshToken.tokenId });

  const refreshToken = createRefreshToken(currentRefreshToken.userId, refreshTokenDocument.id);
  const accessToken = createAccessToken(currentRefreshToken.userId);

  return {
    uid: currentRefreshToken.userId,
    accessToken,
    refreshToken,
  };
});

const newAccessToken = errorHandler<TokenRequest, TokenResponse>(async (req, _) => {
  const refreshToken = await validateRefreshToken(req.body?.refreshToken);
  if (!refreshToken) throw new HttpError(401, 'Unauthorized');
  const accessToken = createAccessToken(refreshToken.userId);
  return {
    uid: refreshToken.userId,
    accessToken,
    refreshToken: req.body.refreshToken,
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
