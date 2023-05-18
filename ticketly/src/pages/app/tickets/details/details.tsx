import { api } from 'api';
import { useCustomMutation } from 'hooks/use-custom-mutation';
import { useCustomQuery } from 'hooks/use-custom-query';
import { useParams } from 'react-router-dom';
import { PageContent, PageItem, PageTitle, PageWrapper } from 'styles';

import { Comments, Info } from './components';
import { Wrapper } from './details.styled';

export const TicketsDetailsPage = () => {
  const { ticketId } = useParams();

  const ticketInfoQuery = useCustomQuery(['ticketDetails', ticketId], () =>
    api.tickets.details.fetch({ ticketId: ticketId || '' })
  );

  const filtersQuery = useCustomQuery(['ticketFilters', { distinct: false }], () =>
    api.tickets.filters.fetch({ distinct: false })
  );

  const commentsQuery = useCustomQuery(['ticketComments', ticketId], () =>
    api.comments.list.fetch({ ticketId: ticketId || '' })
  );

  const mutateTicket = useCustomMutation(
    ({ engineer, status, timeSpent }: { engineer?: string; status?: string; timeSpent?: number }) =>
      api.tickets.details.patch({ ticketId: ticketId || '', engineer, status, timeSpent }),
    {
      invalidateQueryKey: ['ticketDetails', 'ticketList'],
    }
  );

  return (
    <PageWrapper>
      <PageTitle>
        <h2>Ticket details</h2>
      </PageTitle>
      <PageContent>
        <PageItem>
          {ticketInfoQuery.data && filtersQuery.data && commentsQuery.data && (
            <Wrapper>
              <Comments comments={commentsQuery.data} />
              <Info data={ticketInfoQuery.data} filters={filtersQuery.data} mutateTicket={mutateTicket} />
            </Wrapper>
          )}
        </PageItem>
      </PageContent>
    </PageWrapper>
  );
};
