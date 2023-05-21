import {
  CreateUserRequestTypes,
  CreateUserResponseTypes,
  DeleteUserResponseType,
  RequestParamsType,
  UpdateUserResponseType,
  UpdateUserThemeResponseType,
  UserRoles,
  UsersFiltersTypes,
  UsersListTypes,
  WithPaginationTableType,
} from 'types';
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

type UsersFiltersResponse = UsersFiltersTypes;
type UsersFiltersRequest = object;
type UsersFiltersReturn = Promise<UsersFiltersTypes>;

const fetchFilters = async (): UsersFiltersReturn => {
  const { data } = await request<UsersFiltersResponse, UsersFiltersRequest>(apiUrls.users.filters(), 'GET');

  return data;
};

export const filters = {
  fetch: fetchFilters,
};

type CreateUserResponse = CreateUserResponseTypes;
type CreateUserRequest = CreateUserRequestTypes;
type CreateUserReturn = Promise<CreateUserResponse>;
type CreateUserProps = CreateUserRequest;

const createUser = async ({
  department,
  firstName,
  lastName,
  password,
  position,
  role,
  username,
}: CreateUserProps): CreateUserReturn => {
  const body: CreateUserRequest = {
    department,
    firstName,
    lastName,
    password,
    position,
    role,
    username,
  };

  const { data } = await request<CreateUserResponse, CreateUserRequest>(apiUrls.users.index(), 'POST', {}, body);

  return data;
};

type DeleteUserResponse = DeleteUserResponseType;
type DeleteUserRequest = object;
type DeleteUserReturn = Promise<DeleteUserResponse>;
type DeleteUserProps = { userId: string };

const deleteComment = async ({ userId }: DeleteUserProps): DeleteUserReturn => {
  const { data } = await request<DeleteUserResponse, DeleteUserRequest>(apiUrls.users.index(userId), 'DELETE');

  return data;
};

type UpdateUserResponse = UpdateUserResponseType;
type UpdateUserRequest = {
  department?: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  role?: UserRoles;
  password?: string;
};
type UpdateUserReturn = Promise<UpdateUserResponse>;
type UpdateUserProps = { userId: string } & UpdateUserRequest;

const updateUser = async ({
  userId,
  department,
  firstName,
  lastName,
  password,
  position,
  role,
}: UpdateUserProps): UpdateUserReturn => {
  const body = {
    ...(department && { department }),
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(position && { position }),
    ...(role && { role }),
    ...(password && { password }),
  };

  const { data } = await request<UpdateUserResponse, UpdateUserRequest>(apiUrls.users.index(userId), 'PATCH', {}, body);

  return data;
};

type UpdateUserThemeResponse = UpdateUserThemeResponseType;
type UpdateUserThemeRequest = {
  isThemeDark: boolean;
};
type UpdateUserThemeReturn = Promise<UpdateUserThemeResponse>;
type UpdateUserThemeProps = UpdateUserThemeRequest;

const updateUserTheme = async ({ isThemeDark }: UpdateUserThemeProps): UpdateUserThemeReturn => {
  const body = {
    isThemeDark,
  };

  const { data } = await request<UpdateUserThemeResponse, UpdateUserThemeRequest>(
    apiUrls.users.index(),
    'PATCH',
    {},
    body
  );

  return data;
};

export const modify = {
  post: createUser,
  delete: deleteComment,
  patch: {
    data: updateUser,
    theme: updateUserTheme,
  },
};
