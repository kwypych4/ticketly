import jwt_decode from 'jwt-decode';
import { UserRoles } from 'types';

export const decodeToken = (token: string) => {
  const decodedToken: {
    userId: string;
    role: UserRoles;
    username: string;
    firstName: string;
    lastName: string;
    isThemeDark: boolean;
  } = jwt_decode(token);

  return decodedToken;
};
