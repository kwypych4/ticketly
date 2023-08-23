import { TableProps } from 'types';

export type TicketsListTypes = {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  engineerId?: string;
  engineer?: string;
  timeSpent: number | undefined;
  status: string;
  created: string | undefined;
  updated: string | undefined;
  finished: string | undefined;
};

export type TicketsTableProps = TableProps<TicketsListTypes>;
export type BriefTicketsTableProps = TableProps<TicketsListTypes> & { assignedToEngineer?: boolean };

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
export type CreateTicketRequestTypes = {
  categoryId: string;
  priority: number;
  title: string;
  description: string;
  estTime: number;
  status: 'new';
  attachments?: File | File[];
};
export type CreateTicketResponseTypes = {
  success: boolean;
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
