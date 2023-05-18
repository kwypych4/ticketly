import {
  CreateTicketRequestTypes,
  CreateTicketResponseTypes,
  RequestParamsType,
  TicketDetailsTypes,
  TicketFiltersTypes,
  TicketsListTypes,
  WithPaginationTableType,
} from 'types';
import { apiUrls } from 'urls';
import { request } from 'utils/axios';

type TicketListResponse = WithPaginationTableType<TicketsListTypes>;
type TicketListRequest = object;
type TicketListReturn = Promise<TicketListResponse>;

const fetchList = async (options?: RequestParamsType): TicketListReturn => {
  const { data } = await request<TicketListResponse, TicketListRequest>(apiUrls.tickets.index(), 'GET', options);

  return data;
};

export const list = {
  fetch: fetchList,
};

type TicketDetailsResponse = TicketDetailsTypes;
type TicketDetailsRequest = object;
type TicketDetailsReturn = Promise<TicketDetailsTypes>;
type TicketDetailsProps = { ticketId: string } & TicketDetailsRequest;

const fetchDetails = async ({ ticketId }: TicketDetailsProps): TicketDetailsReturn => {
  const { data } = await request<TicketDetailsResponse, TicketDetailsRequest>(apiUrls.tickets.details(ticketId), 'GET');

  return data;
};

export type TicketUpdateResponse = { success: boolean };
type TicketUpdateRequest = object;
type TicketUpdateReturn = Promise<TicketUpdateResponse>;
type TicketUpdateProps = {
  ticketId: string;
  timeSpent?: number;
  engineer?: string;
  status?: string;
} & TicketUpdateRequest;

const updateTicket = async ({ ticketId, timeSpent, engineer, status }: TicketUpdateProps): TicketUpdateReturn => {
  const body = {
    ...(timeSpent && { timeSpent }),
    ...(engineer && { engineer }),
    ...(status && { status }),
  };

  const { data } = await request<TicketUpdateResponse, TicketUpdateRequest>(
    apiUrls.tickets.details(ticketId),
    'PATCH',
    {},
    body
  );

  return data;
};

export const details = {
  fetch: fetchDetails,
  patch: updateTicket,
};

type TicketFiltersResponse = TicketFiltersTypes;
type TicketFiltersRequest = object;
type TicketFiltersReturn = Promise<TicketFiltersTypes>;
type TicketFiltersProps = { distinct: boolean } & TicketFiltersRequest;

const fetchFilters = async (distinct: TicketFiltersProps): TicketFiltersReturn => {
  const { data } = await request<TicketFiltersResponse, TicketFiltersRequest>(
    apiUrls.tickets.filters(),
    'GET',
    distinct
  );

  return data;
};

export const filters = {
  fetch: fetchFilters,
};

type CreateTicketResponse = CreateTicketResponseTypes;
type CreateTicketRequest = CreateTicketRequestTypes;
type CreateTicketReturn = Promise<CreateTicketResponse>;
type CreateTicketProps = Omit<CreateTicketRequest, 'estTime' | 'categoryId' | 'priority' | 'status'>;

const createTicket = async ({ title, description, attachments }: CreateTicketProps): CreateTicketReturn => {
  const body: CreateTicketRequest = {
    title,
    estTime: 0,
    categoryId: '1',
    priority: 1,
    status: 'new',
    description,
    ...(attachments && { attachments }),
  };

  const { data } = await request<CreateTicketResponse, CreateTicketRequest>(
    apiUrls.tickets.index(),
    'POST',
    {},
    body,
    Boolean(attachments)
  );

  return data;
};

export const modify = {
  post: createTicket,
};
