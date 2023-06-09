import { environment } from 'config';
import { HttpError } from 'error';
import jwt from 'jsonwebtoken';
import { RefreshTokenSchema } from 'models';
import { JwtType, UserIdType, UserRoles } from 'types';

export const createAccessToken = ({
  userId,
  role,
  username,
  firstName,
  lastName,
  isThemeDark,
}: {
  userId: UserIdType;
  role: UserRoles;
  username: string;
  firstName: string;
  lastName: string;
  isThemeDark: boolean;
}) => {
  const accessTokenSecret = environment.secretAccessToken;

  const jwtPayload: JwtType = {
    userId,
    role,
    username,
    firstName,
    lastName,
    isThemeDark,
  };
  return jwt.sign(jwtPayload, accessTokenSecret, {
    expiresIn: environment.accessTokenExpTime,
  });
};
export const createRefreshToken = (userId: UserIdType, refreshTokenId: string) => {
  const refreshTokenSecret = environment.secretRefreshToken;

  return jwt.sign(
    {
      userId,
      tokenId: refreshTokenId,
    },
    refreshTokenSecret,
    {
      expiresIn: environment.refreshTokenExpTime,
    }
  );
};

export const validateRefreshToken = async (token: string): Promise<JwtType | null> => {
  const decodeToken = () => {
    try {
      return jwt.verify(token, environment.secretRefreshToken) as JwtType;
    } catch (error) {
      throw new HttpError(401, 'Unauthorized');
    }
  };

  const decodedToken = decodeToken();

  const isToken = await RefreshTokenSchema.exists({ _id: decodedToken?.tokenId });

  if (isToken) return decodedToken;
  throw new HttpError(401, 'Unauthorized');
};
