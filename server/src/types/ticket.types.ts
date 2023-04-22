import { AttachmentType } from './attachment.types';
import { UserIdType } from './refresh-token.types';

export type StatusType = 'new' | 'in progress' | 'blocked' | 'finished';

export type TicketType = {
  owner: UserIdType;
  categoryId: string;
  engineerId: string;
  priority: number;
  title: string;
  estTime: number;
  created?: number;
  updated?: number;
  finished?: number;
  timeSpent?: number;
  status: StatusType;
  attachments?: AttachmentType;
};
