import { AttachmentType } from './attachment.types';
import { UserIdType } from './refresh-token.types';

export type CommentType = {
  _id?: UserIdType;
  ownerId: UserIdType;
  ownerName: string;
  ticket: UserIdType;
  content: string;
  created?: number;
  updated?: number;
  attachments?: AttachmentType;
};
