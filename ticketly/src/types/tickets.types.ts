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

type AttachmentType = { type: string; path: string; title: string }[];

export type TicketDetailsTypes = {
  owner: string;
  categoryId: string;
  engineerId: string;
  ownerName: string;
  engineerName: string;
  priority: number;
  title: string;
  description: string;
  estTime: number;
  created?: number;
  updated?: number;
  finished?: number;
  timeSpent?: number;
  status: string;
  attachments?: AttachmentType;
};

export type TicketFiltersTypes = {
  statuses: {
    label: string;
    value: string;
  }[];
  engineers: {
    label: string;
    value: string;
  }[];
};
