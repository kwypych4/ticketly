import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { UsersListTypes, UsersTableProps } from 'types';
import { checkPrivileges } from 'utils';

const columns: ColumnsType<UsersListTypes> = [
  {
    title: 'Name',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (_, record) => {
      return `${record.firstName} ${record.lastName}`;
    },
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

export const UsersTable = ({ setOptions, data, pagination, setSelectedRow }: UsersTableProps) => {
  const handleOnSelect = (record: UsersListTypes) => {
    setSelectedRow(record);
  };

  const rowSelection: TableRowSelection<UsersListTypes> = {
    onSelect: handleOnSelect,
    type: 'radio',
  };

  const getRowSelection = () => {
    return checkPrivileges(['admin']) ? rowSelection : undefined;
  };

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
      rowSelection={getRowSelection()}
    />
  );
};
