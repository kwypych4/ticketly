import { UserRoles } from './roles.types';

export type AccessTokenType = {
  userId: string;
  role: UserRoles;
  username: string;
  firstName: string;
  lastName: string;
  isThemeDark: boolean;
};
