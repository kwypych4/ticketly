import { AttachmentType } from './attachment.types';
import { UserIdType } from './refresh-token.types';

export type CommentType = {
  owner: UserIdType;
  ticket: UserIdType;
  content: string;
  created?: number;
  updated?: number;
  attachments?: AttachmentType;
};
