import { environment } from 'config';
import { UserSchema } from 'models';
import { UserType } from 'types';

import { hashPassword } from './hash-password';

export const initialUserCreator = async () => {
  const existingUser = await UserSchema.find({ username: environment.mongoDbUser }).limit(1);

  if (existingUser.length > 0) return;

  const userDocument = new UserSchema<UserType>({
    username: environment.mongoDbUser,
    password: await hashPassword(environment.mongoDbPassword),
    firstName: 'Administrative',
    lastName: 'User',
    department: '-',
    position: '-',
    role: 'admin',
    isThemeDark: true,
  });

  await userDocument.save();
};
