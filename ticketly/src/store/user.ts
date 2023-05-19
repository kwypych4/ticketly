import { create } from 'zustand';

type UserStateType = {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
};

export const useUserStore = create<UserStateType>(() => ({
  userId: '',
  username: '',
  firstName: '',
  lastName: '',
  role: '',
}));
