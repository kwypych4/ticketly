import { roles } from 'data';
import { model, Schema } from 'mongoose';
import { UserType } from 'types';

const user = new Schema<UserType>({
  username: {
    type: String,
    unique: true,
    required: true,
    index: 'text',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  firstName: {
    type: String,
    required: true,
    index: 'text',
  },
  lastName: {
    type: String,
    required: true,
    index: 'text',
  },
  department: {
    type: String,
    required: true,
    index: 'text',
  },
  position: {
    type: String,
    required: true,
    index: 'text',
  },
  role: {
    type: String,
    enum: roles,
    required: true,
    index: 'text',
  },
  isThemeDark: {
    type: Boolean,
    required: false,
    default: true,
  },
});

export const UserSchema = model<UserType>('User', user);
