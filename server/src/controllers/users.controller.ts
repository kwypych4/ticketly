import { roles } from 'data';
import { HttpError } from 'error';
import { Request } from 'express';
import { RefreshTokenSchema, UserSchema } from 'models';
import moment from 'moment';
import { ResponseWithPagination, UserRoles, UserType } from 'types';
import { errorHandler, hashPassword, removeAllUserSessions } from 'utils';

type UsersRequest = {
  query: {
    department: string;
    first_name: string;
    last_name: string;
    position: string;
    role: UserRoles;
    username: string;
  };
} & Request;

type UsersResponseObjType = {
  id: string;
  department: string;
  firstName: string;
  lastName: string;
  position: string;
  role: string;
  username: string;
};
type UsersResponse = ResponseWithPagination<UsersResponseObjType[]>;

const getUsers = errorHandler<UsersRequest, UsersResponse>(async (req, _) => {
  const totalElements = await UserSchema.countDocuments({});

  const limit = Number(req.query.limit) || 25;
  const page = Number(req.query.page) || 1;

  const { department, first_name: firstName, last_name: lastName, position, role, username } = req.query;

  const queryCondition = {
    ...(department && { $text: { $search: department } }),
    ...(firstName && { $text: { $search: firstName } }),
    ...(lastName && { $text: { $search: lastName } }),
    ...(position && { $text: { $search: position } }),
    ...(role && { $text: { $search: role } }),
    ...(username && { $text: { $search: username } }),
  };

  const users = await UserSchema.find<UsersResponseObjType>(queryCondition, {
    _id: 0,
    id: '$_id',
    department: 1,
    firstName: 1,
    lastName: 1,
    position: 1,
    role: 1,
    username: 1,
  })
    .limit(limit)
    .skip((page - 1) * limit);

  if (!users) throw new HttpError(400, 'Users not found');
  return {
    pagination: {
      totalElements,
      limit,
      page,
    },
    data: users,
  };
});

type OneUserRequest = Request;

type OneUserResponse = Omit<UserType, 'password'>;

const getOneUser = errorHandler<OneUserRequest, OneUserResponse>(async (req, _) => {
  const user = await UserSchema.findOne<UserType>({ _id: req.params.id });

  if (!user) throw new HttpError(400, 'User not found');
  return user;
});

type UsersFiltersRequest = Request;

type UsersFiltersResponse = {
  roles: {
    label: string;
    value: string;
  }[];
};

const getUsersFilters = errorHandler<UsersFiltersRequest, UsersFiltersResponse>(async (_, __) => {
  const rolesList = roles.map((role) => ({
    label: role[0].toLocaleUpperCase() + role.slice(1),
    value: role,
  }));
  return {
    roles: rolesList,
  };
});

type CreateUserRequest = { body: UserType };

type CreateUserResponse = {
  success: boolean;
};

const createUser = errorHandler<CreateUserRequest, CreateUserResponse>(async (req, _) => {
  if (!roles.includes(req.body?.role))
    throw new HttpError(500, `User can only have 'admin' or 'user' or 'engineer' role.`);

  const existingUser = await UserSchema.find({ username: req.body?.username }).limit(1);

  if (existingUser.length > 0) throw new HttpError(409, 'User with provided username already exists.');

  const userDocument = new UserSchema<UserType>({
    username: req.body?.username,
    password: await hashPassword(req.body?.password),
    firstName: req.body?.firstName,
    lastName: req.body?.lastName,
    department: req.body?.department,
    position: req.body?.position,
    role: req.body?.role,
  });

  await userDocument.save();

  return {
    success: true,
  };
});

type DeleteUserRequest = Request;

type DeleteUserResponse = { success: boolean };

const deleteUser = errorHandler<DeleteUserRequest, DeleteUserResponse>(async (req, _) => {
  await UserSchema.deleteOne({ _id: req.params.id });
  await RefreshTokenSchema.deleteMany({ owner: req.params.id });

  removeAllUserSessions({ req, userId: req.params.id });

  return {
    success: true,
  };
});

type UpdateUserRequest = {
  body: Omit<UserType, 'username'>;
} & Request;

type UpdateUserResponse = { success: boolean };

const updateUser = errorHandler<UpdateUserRequest, UpdateUserResponse>(async (req, _) => {
  const { department, firstName, lastName, position, role, password, isThemeDark } = req.body;

  const newPassword = password ? await hashPassword(password) : undefined;

  if (role && !roles.includes(req.body?.role))
    throw new HttpError(500, `User can only have 'admin' or 'user' or 'engineer' role.`);

  const updateParams = {
    $set: {
      updated: moment().toISOString(),
      ...(department && { department }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(position && { position }),
      ...(role && { role }),
      ...(isThemeDark && { isThemeDark }),
      ...(newPassword && { password: newPassword }),
    },
  };

  const ticket = await UserSchema.updateOne<UserType>({ _id: req.params.id }, updateParams);

  if (!ticket) throw new HttpError(400, 'User not found');

  return {
    success: true,
  };
});

export const users = {
  getUsers,
  getOneUser,
  getUsersFilters,
  createUser,
  deleteUser,
  updateUser,
};
