import { AttachmentType } from './attachment.types';
import { UserIdType } from './refresh-token.types';

export type StatusType = 'new' | 'in progress' | 'blocked' | 'finished';

export type TicketType = {
  _id?: UserIdType;
  owner: UserIdType;
  categoryId: string;
  engineerId: UserIdType;
  priority: number;
  title: string;
  description: string;
  estTime: number;
  created?: number;
  updated?: number;
  finished?: number;
  timeSpent?: number;
  status: StatusType;
  attachments?: AttachmentType;
};
