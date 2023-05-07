type AttachmentType = { type: string; path: string; title: string }[];

export type CommentsListTypes = {
  id: string;
  ownerId: string;
  ownerName: string;
  ticket: string;
  content: string;
  created?: number;
  updated?: number;
  attachments?: AttachmentType;
};