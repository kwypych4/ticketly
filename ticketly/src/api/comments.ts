import { AddCommentResponseType, CommentsListTypes } from 'types';
import { apiUrls } from 'urls';
import { request } from 'utils/axios';

type CommentsListResponse = CommentsListTypes[];
type CommentsListRequest = object;
type CommentsListReturn = Promise<CommentsListResponse>;
type CommentsListProps = { ticketId: string } & CommentsListRequest;
const fetchList = async ({ ticketId }: CommentsListProps): CommentsListReturn => {
  const { data } = await request<CommentsListResponse, CommentsListRequest>(apiUrls.comments.index(ticketId), 'GET');

  return data;
};

export const list = {
  fetch: fetchList,
};

type AddCommentResponse = AddCommentResponseType;
type AddCommentRequest = {
  timeSpent: number;
  content: string;
  attachments?: any;
};
type AddCommentReturn = Promise<AddCommentResponse>;
type AddCommentProps = { ticketId: string } & AddCommentRequest;

const addComment = async ({ ticketId, timeSpent, content, attachments }: AddCommentProps): AddCommentReturn => {
  const body = {
    timeSpent,
    content,
    ...(attachments && { attachments }),
  };

  const { data } = await request<AddCommentResponse, AddCommentRequest>(
    apiUrls.comments.index(ticketId),
    'POST',
    {},
    body,
    Boolean(attachments)
  );

  return data;
};

export const add = {
  post: addComment,
};
