import { AddCommentResponseType, CommentsListTypes, DeleteCommentResponseType, UpdateCommentResponseType } from 'types';
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
  attachments?: File | File[];
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

type DeleteCommentResponse = DeleteCommentResponseType;
type DeleteCommentRequest = object;
type DeleteCommentReturn = Promise<DeleteCommentResponse>;
type DeleteCommentProps = { commentId: string };

const deleteComment = async ({ commentId }: DeleteCommentProps): DeleteCommentReturn => {
  const { data } = await request<DeleteCommentResponse, DeleteCommentRequest>(
    apiUrls.comments.index(commentId),
    'DELETE'
  );

  return data;
};
type UpdateCommentResponse = UpdateCommentResponseType;
type UpdateCommentRequest = {
  content: string;
};
type UpdateCommentReturn = Promise<UpdateCommentResponse>;
type UpdateCommentProps = { commentId: string } & UpdateCommentRequest;

const updateComment = async ({ commentId, content }: UpdateCommentProps): UpdateCommentReturn => {
  const body = {
    content,
  };

  const { data } = await request<UpdateCommentResponse, UpdateCommentRequest>(
    apiUrls.comments.index(commentId),
    'PATCH',
    {},
    body
  );

  return data;
};

export const modify = {
  post: addComment,
  delete: deleteComment,
  patch: updateComment,
};
