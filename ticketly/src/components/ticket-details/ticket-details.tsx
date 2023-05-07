import { TicketUpdateResponse } from 'api/tickets';
import { UseMutationResult } from 'react-query';
import { CommentsListTypes, TicketDetailsTypes, TicketFiltersTypes } from 'types';

import { Info, Wrapper } from '.';
import { Comments } from './components/comments';

type Props = {
  info: TicketDetailsTypes;
  filters: TicketFiltersTypes;
  comments: CommentsListTypes[];
  mutateTicket: UseMutationResult<
    TicketUpdateResponse,
    unknown,
    {
      engineer?: string | undefined;
      status?: string | undefined;
      timeSpent?: number | undefined;
    },
    unknown
  >;
};
export const TicketDetails = ({ info, filters, mutateTicket, comments }: Props) => {
  return (
    <Wrapper>
      <Comments comments={comments} />
      <Info data={info} filters={filters} mutateTicket={mutateTicket} />
    </Wrapper>
  );
};
