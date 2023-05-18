import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { NavLink } from 'react-router-dom';
import { UsersListTypes, UsersTableProps } from 'types';

const columns: ColumnsType<UsersListTypes> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <NavLink to={record.id}>{text}</NavLink>,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },

  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (text) => {
      return `${String(text)[0].toLocaleUpperCase()}${String(text).slice(1)}`;
    },
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
  },
];

export const UsersTable = ({ setOptions, data, pagination }: UsersTableProps) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey='id'
      pagination={{
        total: pagination?.totalElements,
      }}
      onChange={setOptions}
      showSorterTooltip={false}
    />
  );
};
