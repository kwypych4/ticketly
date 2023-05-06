import { TableProps } from 'types';

export type TicketsListTypes = {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  engineerId: string;
  engineer: string;
  timeSpent: number | undefined;
  status: number;
  created: number | undefined;
  updated: number | undefined;
  finished: number | undefined;
};

export type TicketsTableProps = TableProps<TicketsListTypes>;

export type TicketDetailsTypes = {
  id: string;
};
