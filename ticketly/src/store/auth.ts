import { create } from 'zustand';

type AuthStateType = {
  isLogged: boolean;
  accessToken: string;
};

export const useAuthStore = create<AuthStateType>(() => ({
  isLogged: false,
  accessToken: 'token',
}));
