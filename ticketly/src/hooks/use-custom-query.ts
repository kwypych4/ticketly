import { AxiosError } from 'axios';
import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

export const useCustomQuery = <QueryReturnType>(
  queryKey: QueryKey,
  queryFn: QueryFunction<QueryReturnType, QueryKey>,
  options?: UseQueryOptions<QueryReturnType, AxiosError>
): UseQueryResult<QueryReturnType, AxiosError> => {
  return useQuery(queryKey, queryFn, {
    onSuccess: (success) => {
      if (options?.onSuccess) {
        options?.onSuccess(success);
      }
    },
    onError: (error) => {
      // TODO: upgrade error handling
      if (error.response?.status === 403) {
        // setIsLogged({ isLogged: false, accessToken: '' });
      }

      if (options?.onError) {
        options?.onError(error);
      }
    },

    ...options,
  });
};
