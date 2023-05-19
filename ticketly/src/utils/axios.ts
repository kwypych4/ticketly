import { refreshAccessToken } from 'api/auth';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore, useUserStore } from 'store';
import { RequestParamsType } from 'types';

import { decodeToken } from './token-decode';

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'true',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<{ error: string }>) => {
    const { accessToken } = useAuthStore.getState();

    try {
      if (
        error?.response?.status === 401 &&
        (!accessToken || error.response?.data.error === 'Unauthorized - the access token has expired!')
      ) {
        try {
          const accessTokenQuery = await refreshAccessToken();
          useAuthStore.setState({ accessToken: accessTokenQuery.accessToken });

          const { firstName, lastName, role, userId, username } = decodeToken(accessTokenQuery.accessToken);

          useUserStore.setState({ firstName, lastName, role, userId, username });
        } catch (error) {
          useAuthStore.setState({ isLogged: false, accessToken: '' });
          useUserStore.setState({ userId: '', username: '', firstName: '', lastName: '', role: '' });
        }
      }
    } catch (error) {
      Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export const request = <T, Y>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  params?: RequestParamsType,
  data?: RequestParamsType,
  withAttachments?: boolean
): Promise<AxiosResponse<T, Y>> => {
  const { accessToken } = useAuthStore.getState();

  return axiosInstance({
    method,
    url,
    params,
    data,
    headers: {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...(withAttachments && { 'Content-Type': 'multipart/form-data' }),
    },
    formSerializer: { indexes: null },
  });
};
