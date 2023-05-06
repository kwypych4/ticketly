import { UserIdType } from './refresh-token.types';

export type UserRoles = 'admin' | 'engineer' | 'user';

export type UserType = {
  _id?: UserIdType;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  role: UserRoles;
  isThemeDark?: boolean;
};
