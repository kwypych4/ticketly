import { api } from 'api';
import { useCustomQuery } from 'hooks/use-custom-query';
import { Navigate } from 'react-router-dom';
import { useAuthStore, useUserStore } from 'store';
import { appRoutes } from 'urls';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLogged = useAuthStore((state) => state.isLogged);

  const isLoggedQuery = useCustomQuery(['checkLogin'], () => api.auth.checkLogin(), {
    onSuccess: ({ accessToken, uid, username }) => {
      useAuthStore.setState({ isLogged: true, accessToken });
      useUserStore.setState({ userId: uid, username });
    },
    onError: () => {
      useAuthStore.setState({ isLogged: false, accessToken: '' });
      useUserStore.setState({ userId: '', username: '' });
    },
    staleTime: Infinity,
    retry: false,
    enabled: !isLogged,
  });

  if (isLoggedQuery.isLoading) return <div>Loading</div>;

  return isLogged ? children : <Navigate to={appRoutes.auth.login} />;
};
