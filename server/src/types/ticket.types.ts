import { UserIdType } from './refresh-token.types';

export type TicketType = {
  owner: UserIdType;
  categoryId: string;
  engineerId: string;
  priority: number;
  title: string;
  estTime: number;
  startDate?: number;
  endDate: number;
  // attachments: Attachment[];
};
