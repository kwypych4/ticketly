export type UserRoles = 'admin' | 'engineer' | 'user';

export type UserType = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  role: UserRoles;
  isThemeDark?: boolean;
};
