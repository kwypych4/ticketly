import { JwtPayload } from 'jsonwebtoken';
import { Schema } from 'mongoose';

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
} & JwtPayload;
