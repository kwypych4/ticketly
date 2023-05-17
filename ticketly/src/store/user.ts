import { create } from 'zustand';

type UserStateType = {
  userId: string;
  username: string;
};

export const useUserStore = create<UserStateType>(() => ({
  userId: '',
  username: '',
}));
