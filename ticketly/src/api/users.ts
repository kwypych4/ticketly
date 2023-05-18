import { RequestParamsType, UsersListTypes, WithPaginationTableType } from 'types';
import { apiUrls } from 'urls';
import { request } from 'utils/axios';

type UsersListResponse = WithPaginationTableType<UsersListTypes>;
type UsersListRequest = object;
type UsersListReturn = Promise<UsersListResponse>;

const fetchList = async (options?: RequestParamsType): UsersListReturn => {
  const { data } = await request<UsersListResponse, UsersListRequest>(apiUrls.users.index(), 'GET', options);

  return data;
};

export const list = {
  fetch: fetchList,
};
