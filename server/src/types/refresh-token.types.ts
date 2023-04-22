import { JwtPayload } from 'jsonwebtoken';
import { Schema } from 'mongoose';

import { UserRoles } from './user.types';

export type RefreshTokenType = {
  owner: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
};

export type UserIdType = {
  type: Schema.Types.ObjectId;
  ref: string;
};
export type TokenIdType = {
  type: Schema.Types.ObjectId;
  ref: string;
};

export type JwtType = {
  userId: UserIdType;
  tokenId?: TokenIdType;
  role: UserRoles;
} & JwtPayload;
