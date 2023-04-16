import { Role } from './role.types';

export type UserType = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  role: Role['name'];
};
