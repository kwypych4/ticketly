import { App } from 'antd';
import { AxiosError } from 'axios';
import { QueryFunction, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from 'react-query';
import { useAuthStore } from 'store';
import { QueryKeys } from 'types';
import { MessagesTypes } from 'types/query-message.types';

type TCustomQueryOptions = {
  message?: MessagesTypes;
  invalidateQueryKey?: Array<QueryKeys>;
  mutationKey?: TQueryKey;
};
type TQueryKey = [QueryKeys, any?] | QueryKeys;
type TQueryFunction<T> = QueryFunction<T, TQueryKey>;
type TQueryError = AxiosError<{ error: string }>;
type TQueryOptions<T> = UseQueryOptions<T, TQueryError, T, TQueryKey> & TCustomQueryOptions;
type TQueryResult<T> = UseQueryResult<T, TQueryError>;

export const useCustomQuery = <QueryReturnType>(
  queryKey: TQueryKey,
  queryFn: TQueryFunction<QueryReturnType>,
  options?: TQueryOptions<QueryReturnType>
): TQueryResult<QueryReturnType> => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  return useQuery(queryKey, queryFn, {
    onSuccess: (success) => {
      if (options?.onSuccess) {
        options?.onSuccess(success);
      }
      if (options?.invalidateQueryKey) {
        queryClient.invalidateQueries({ queryKey: options?.invalidateQueryKey });
      }
      if (options?.message?.onSuccess) {
        notification.success({ message: options.message.onSuccess });
      }
    },
    onError: (error) => {
      if (error.response?.status === 401 && error.response?.data.error === 'You are not logged in!') {
        useAuthStore.setState({ isLogged: false, accessToken: '' });
        notification.warning({ message: error.response.data?.error });
      } else if (
        error.response?.data.error !== 'Unauthorized - the access token has expired!' &&
        error.response?.data
      ) {
        notification.error({ message: error.response.data?.error });
      }

      if (options?.onError) {
        options?.onError(error);
      }
      if (options?.invalidateQueryKey) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueryKey });
      }
      if (options?.message?.onError) {
        notification.error({ message: options.message.onError });
      }
      if (options?.message?.useResponseErrorMessage) {
        notification.error({ message: error.response?.data.error });
      }
    },
    retry: false,
  });
};
