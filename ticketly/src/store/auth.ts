import { create } from 'zustand';

type AuthStateType = {
  isLogged: boolean;
  accessToken: string;
  logout: () => void;
  login: (accessToken: string) => void;
};

export const useAuthStore = create<AuthStateType>((set) => ({
  isLogged: false,
  accessToken: 'token',
  logout: () => set(() => ({ isLogged: false, accessToken: '' })),
  login: (accessToken) => set(() => ({ isLogged: true, accessToken })),
}));
