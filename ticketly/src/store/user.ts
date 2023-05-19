import { UserRoles } from 'types';
import { create } from 'zustand';

type UserStateType = {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRoles | '';
};

export const useUserStore = create<UserStateType>(() => ({
  userId: '',
  username: '',
  firstName: '',
  lastName: '',
  role: '',
}));
