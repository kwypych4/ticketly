import { Dispatch, SetStateAction } from 'react';
import { TableProps } from 'types';

export type UsersListTypes = {
  id: string;
  department: string;
  name: string;
  position: string;
  role: string;
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
  role: string;
};
export type CreateUserResponseTypes = {
  id: string;
  accessToken: string;
  refreshToken: string;
};

export type DeleteUserResponseType = {
  success: boolean;
};
