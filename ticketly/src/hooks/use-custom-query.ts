import { App } from 'antd';
import { AxiosError } from 'axios';
import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useAuthStore } from 'store';

export const useCustomQuery = <QueryReturnType>(
  queryKey: QueryKey,
  queryFn: QueryFunction<QueryReturnType, QueryKey>,
  options?: UseQueryOptions<QueryReturnType, AxiosError<{ error: string }>>
): UseQueryResult<QueryReturnType, AxiosError> => {
  const { notification } = App.useApp();

  return useQuery(queryKey, queryFn, {
    onSuccess: (success) => {
      if (options?.onSuccess) {
        options?.onSuccess(success);
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
    },
    retry: false,

    ...options,
  });
};
