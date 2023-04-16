import { AttachmentType } from './attachment.types';

export type Ticket = {
  userId: string;
  categoryId: string;
  engineerId: string;
  priority: number;
  title: string;
  estTime: number;
  startDate?: number;
  endDate: number;
  // attachments: Attachment[];
};
