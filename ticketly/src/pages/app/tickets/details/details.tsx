import { api } from 'api';
import { TicketDetails } from 'components/ticket-details';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { PageContent, PageItem, PageTitle, PageWrapper } from 'styles';

export const TicketsDetailsPage = () => {
  const { ticketId } = useParams();
  const queryClient = useQueryClient();

  const ticketInfoQuery = useQuery(['ticketDetails', ticketId], () =>
    api.tickets.details.fetch({ ticketId: ticketId || '' })
  );

  const filtersQuery = useQuery(['ticketFilters', { distinct: false }], () =>
    api.tickets.filters.fetch({ distinct: false })
  );

  const commentsQuery = useQuery(['ticketComments', ticketId], () =>
    api.comments.list.fetch({ ticketId: ticketId || '' })
  );

  const mutateTicket = useMutation({
    mutationFn: ({ engineer, status, timeSpent }: { engineer?: string; status?: string; timeSpent?: number }) =>
      api.tickets.details.patch({ ticketId: ticketId || '', engineer, status, timeSpent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketDetails'] });
    },
  });

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
