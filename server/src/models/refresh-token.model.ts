import { model, Schema } from 'mongoose';
import { RefreshTokenType } from 'types';

const refreshToken = new Schema<RefreshTokenType>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const RefreshTokenSchema = model<RefreshTokenType>('RefreshToken', refreshToken);
