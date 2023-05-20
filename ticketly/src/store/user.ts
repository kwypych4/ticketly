import { UserRoles } from 'types';
import { create } from 'zustand';

type UserStateType = {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRoles | '';
  isThemeDark: boolean;
  changeTheme: () => void;
};

export const useUserStore = create<UserStateType>((set) => ({
  userId: '',
  username: '',
  firstName: '',
  lastName: '',
  role: '',
  isThemeDark: false,
  changeTheme: () => set((state) => ({ isThemeDark: !state.isThemeDark })),
}));
