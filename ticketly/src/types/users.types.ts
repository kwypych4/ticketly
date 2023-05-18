import { TableProps } from 'types';

export type UsersListTypes = {
  id: string;
  department: string;
  name: string;
  position: string;
  role: string;
  username: string;
};

export type UsersTableProps = TableProps<UsersListTypes>;
