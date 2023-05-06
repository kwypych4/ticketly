import { TicketsListTypes } from 'components/tables/tickets';
import { RequestParamsType } from 'types';
import { WithPaginationTableType } from 'types/table';
import { apiUrls } from 'urls';
import { request } from 'utils/axios';

type TicketListResponse = WithPaginationTableType<TicketsListTypes>;
type TicketListRequest = object;
type TicketListReturn = Promise<TicketListResponse>;

const fetchTicketsList = async (options?: RequestParamsType): TicketListReturn => {
  const { data } = await request<TicketListResponse, TicketListRequest>(apiUrls.tickets.index, 'GET', options);

  return data;
};

export const list = {
  fetch: fetchTicketsList,
};
