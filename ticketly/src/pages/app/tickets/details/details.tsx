import { api } from 'api';
import { TicketDetails } from 'components/ticket-details';
import { useCustomMutation } from 'hooks/use-custom-mutation';
import { useCustomQuery } from 'hooks/use-custom-query';
import { useParams } from 'react-router-dom';
import { PageContent, PageItem, PageTitle, PageWrapper } from 'styles';

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
      invalidateQueryKey: ['ticketDetails'],
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
            <TicketDetails
              info={ticketInfoQuery.data}
              filters={filtersQuery.data}
              mutateTicket={mutateTicket}
              comments={commentsQuery.data}
            />
          )}
        </PageItem>
      </PageContent>
    </PageWrapper>
  );
};
