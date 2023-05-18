import { roles } from 'data';
import { HttpError } from 'error';
import { Request } from 'express';
import { RefreshTokenSchema, UserSchema } from 'models';
import moment from 'moment';
import { ResponseWithPagination, UserRoles, UserType } from 'types';
import { errorHandler, hashPassword } from 'utils';

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
  name: string;
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
    name: { $concat: ['$firstName', ' ', '$lastName'] },
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

type DeleteUserRequest = Request;

type DeleteUserResponse = { success: boolean };

const deleteUser = errorHandler<DeleteUserRequest, DeleteUserResponse>(async (req, _) => {
  await UserSchema.deleteOne({ _id: req.params.id });
  await RefreshTokenSchema.deleteMany({ owner: req.params.id });

  delete req.session.userId;

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

  if (!roles.includes(req.body?.role))
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
      ...(newPassword && { newPassword }),
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
  deleteUser,
  updateUser,
};
