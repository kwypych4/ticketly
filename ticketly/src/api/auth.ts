import { apiUrls } from 'urls';
import { request } from 'utils/axios';

type LoginResponse = { username: string; uid: string; accessToken: string; refreshToken: string };
type LoginRequest = object;
type LoginReturn = Promise<LoginResponse>;
type LoginProps = {
  username: string;
  password: string;
} & LoginRequest;

export const login = async ({ username, password }: LoginProps): LoginReturn => {
  const body = {
    username,
    password,
  };

  const { data } = await request<LoginResponse, LoginRequest>(apiUrls.auth.login(), 'POST', {}, body);

  return data;
};

export const checkLogin = async (): LoginReturn => {
  const { data } = await request<LoginResponse, LoginRequest>(apiUrls.auth.login(), 'GET');

  return data;
};

type AccessTokenResponse = {
  uid: string;
  accessToken: string;
  refreshToken: string;
};
type AccessTokenRequest = object;
type AccessTokenReturn = Promise<AccessTokenResponse>;

export const refreshAccessToken = async (): AccessTokenReturn => {
  const { data } = await request<AccessTokenResponse, AccessTokenRequest>(apiUrls.auth.accessToken(), 'GET');

  return data;
};
