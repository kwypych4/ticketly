import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { NavLink } from 'react-router-dom';
import { TicketsListTypes, TicketsTableProps } from 'types';
import { convertMinutes } from 'utils';

const columns: ColumnsType<TicketsListTypes> = [
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
    render: (text) => {
      if (text) return text;

      return 'Not assigned';
    },
  },
  {
    title: 'Time spent',
    dataIndex: 'timeSpent',
    key: 'timeSpent',
    render: (text) => convertMinutes(text),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      return `${String(text)[0].toLocaleUpperCase()}${String(text).slice(1)}`;
    },
  },
];

export const TicketsTable = ({ setOptions, data, pagination, isLoading }: TicketsTableProps) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey='id'
      pagination={{
        total: pagination?.totalElements,
        pageSize: pagination?.limit,
      }}
      onChange={setOptions}
      showSorterTooltip={false}
      loading={isLoading}
    />
  );
};
