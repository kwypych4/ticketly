import jwt_decode from 'jwt-decode';
import { AccessTokenType } from 'types';

export const decodeToken = (token: string) => {
  const decodedToken: AccessTokenType = jwt_decode(token);

  return decodedToken;
};
