import { useParams } from 'react-router-dom';
import { PageContent, PageTitle, PageWrapper } from 'styles';

export const TicketsDetailsPage = () => {
  // const [options, setOptions] = useState<RequestParamsType>();

  // const { data } = useQuery(['tickets', options], () => api.tickets.list.fetch(options));
  const { ticketId } = useParams();
  return (
    <PageWrapper>
      <PageTitle>
        <h2>Ticket details, {ticketId}</h2>
      </PageTitle>
      <PageContent />
    </PageWrapper>
  );
};
