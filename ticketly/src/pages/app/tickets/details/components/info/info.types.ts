import { TicketUpdateResponse } from 'api/tickets';
import { UseMutationResult } from 'react-query';
import { TicketDetailsTypes, TicketFiltersTypes } from 'types';

export type InfoProps = {
  data: TicketDetailsTypes;
  filters: TicketFiltersTypes;
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
