import { Dispatch, SetStateAction } from 'react';
import { TableProps, UserRoles } from 'types';

export type UsersListTypes = {
  id: string;
  department: string;
  firstName: string;
  lastName: string;
  position: string;
  role: UserRoles;
  username: string;
};

export type UsersTableProps = {
  selectedRow: UsersListTypes | undefined;
  setSelectedRow: Dispatch<SetStateAction<UsersListTypes | undefined>>;
} & TableProps<UsersListTypes>;

export type UsersFiltersTypes = {
  roles: {
    label: string;
    value: string;
  }[];
};

export type CreateUserRequestTypes = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  role: UserRoles;
};
export type CreateUserResponseTypes = {
  id: string;
  accessToken: string;
  refreshToken: string;
};

export type DeleteUserResponseType = {
  success: boolean;
};

export type UpdateUserResponseType = {
  success: boolean;
};
