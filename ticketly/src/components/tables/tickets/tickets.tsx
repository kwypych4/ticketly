import { Table } from 'antd';
import { TicketsTableProps } from 'types';

import { columns } from './tickets.data';

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
