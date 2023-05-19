import jwt_decode from 'jwt-decode';

export const decodeToken = (token: string) => {
  const decodedToken: {
    userId: string;
    role: string;
    username: string;
    firstName: string;
    lastName: string;
    isThemeDark: boolean;
  } = jwt_decode(token);

  return decodedToken;
};
