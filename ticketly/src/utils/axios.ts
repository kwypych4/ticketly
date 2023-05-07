import axios, { AxiosResponse } from 'axios';
import { RequestParamsType } from 'types';

const baseURL = import.meta.env.DEV ? import.meta.env.VITE_APP_DEV_API_BASE : import.meta.env.VITE_APP_PROD_API_BASE;

export const axiosInstance = axios.create({
  baseURL,
});

export const request = <T, Y>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  params?: RequestParamsType,
  body?: RequestParamsType
): Promise<AxiosResponse<T, Y>> =>
  axiosInstance({
    method,
    url,
    params,
    data: {
      ...body,
    },
  });
