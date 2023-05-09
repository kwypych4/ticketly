import { api } from 'api';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from 'store';
import { appRoutes } from 'urls';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLogged = useAuthStore((state) => state.isLogged);

  const isLoggedQuery = useQuery(['checkLogin'], () => api.auth.checkLogin(), {
    onSuccess: ({ accessToken }) => {
      useAuthStore.setState({ isLogged: true, accessToken });
    },
    onError: () => {
      useAuthStore.setState({ isLogged: false, accessToken: '' });
    },
    staleTime: Infinity,
    retry: false,
  });

  if (isLoggedQuery.isLoading) return <div>Loading</div>;

  return isLogged ? children : <Navigate to={appRoutes.auth.login} />;
};
