import { CommentsListTypes } from 'types';
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
