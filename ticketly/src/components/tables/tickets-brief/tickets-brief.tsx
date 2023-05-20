import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { NavLink } from 'react-router-dom';
import { BriefTicketsTableProps, TicketsListTypes } from 'types';
import { appRoutes } from 'urls';
import { convertMinutes } from 'utils';

const userTicketsColumns: ColumnsType<TicketsListTypes> = [
  {
    title: 'Problem',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => <NavLink to={`${appRoutes.app.tickets.index}/${record.id}`}>{text}</NavLink>,
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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      return `${String(text)[0].toLocaleUpperCase()}${String(text).slice(1)}`;
    },
  },
];

const assignedToEngineerColumns: ColumnsType<TicketsListTypes> = [
  {
    title: 'Problem',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => <NavLink to={record.id}>{text}</NavLink>,
  },
  {
    title: 'Reporting user',
    dataIndex: 'ownerName',
    key: 'ownerName',
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

export const TicketsBriefTable = ({
  setOptions,
  data,
  pagination,
  assignedToEngineer = false,
  isLoading,
}: BriefTicketsTableProps) => {
  return (
    <Table
      columns={assignedToEngineer ? assignedToEngineerColumns : userTicketsColumns}
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
