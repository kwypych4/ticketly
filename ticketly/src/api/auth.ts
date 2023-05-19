import { apiUrls } from 'urls';
import { request } from 'utils/axios';

type LoginResponse = { accessToken: string };
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

type LogoutResponse = { success: boolean };
type LogoutRequest = object;
type LogoutReturn = Promise<LogoutResponse>;
type LogoutProps = {
  logoutFromAllDevices?: boolean;
} & LogoutRequest;

export const logout = async ({ logoutFromAllDevices }: LogoutProps): LogoutReturn => {
  const url = logoutFromAllDevices ? apiUrls.auth.logoutAll() : apiUrls.auth.logout();
  const { data } = await request<LogoutResponse, LogoutRequest>(url, 'GET');

  return data;
};

export const checkLogin = async (): LoginReturn => {
  const { data } = await request<LoginResponse, LoginRequest>(apiUrls.auth.login(), 'GET');

  return data;
};

type AccessTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
type AccessTokenRequest = object;
type AccessTokenReturn = Promise<AccessTokenResponse>;

export const refreshAccessToken = async (): AccessTokenReturn => {
  const { data } = await request<AccessTokenResponse, AccessTokenRequest>(apiUrls.auth.accessToken(), 'GET');

  return data;
};
