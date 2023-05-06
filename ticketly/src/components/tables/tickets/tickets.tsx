import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { NavLink } from 'react-router-dom';

import { TicketsListTypes, TicketsTableProps } from '.';

export const columns: ColumnsType<TicketsListTypes> = [
  {
    title: 'Reporting user',
    dataIndex: 'ownerName',
    key: 'ownerName',
  },
  {
    title: 'Problem',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => <NavLink to={record.id}>{text}</NavLink>,
  },
  {
    title: 'Assigned To',
    dataIndex: 'engineer',
    key: 'engineer',
  },
  {
    title: 'Time spent',
    dataIndex: 'timeSpent',
    key: 'timeSpent',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

export const TicketsTable = ({ setOptions, data, pagination }: TicketsTableProps) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey='id'
      pagination={{
        defaultPageSize: 25,
        total: pagination?.totalElements,
      }}
      onChange={setOptions}
      showSorterTooltip={false}
    />
  );
};
