import { Table } from 'antd';
import { BriefTicketsTableProps } from 'types';

import { assignedToEngineerColumns, userTicketsColumns } from './tickets-brief.config';

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
