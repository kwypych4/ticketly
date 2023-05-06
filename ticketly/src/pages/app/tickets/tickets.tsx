import { api } from 'api';
import { TableWrapper, TicketsTable } from 'components';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { PageContent, PageTitle, PageWrapper } from 'styles';
import { RequestParamsType } from 'types';

export const TicketsPage = () => {
  const [options, setOptions] = useState<RequestParamsType>();

  const { data } = useQuery(['tickets', options], () => api.tickets.list.fetch(options));

  return (
    <PageWrapper>
      <PageTitle>
        <h2>Tickets</h2>
      </PageTitle>
      <PageContent>
        <TableWrapper setOptions={setOptions} data={data}>
          <TicketsTable />
        </TableWrapper>
      </PageContent>
    </PageWrapper>
  );
};
