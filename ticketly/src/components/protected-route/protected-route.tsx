import { api } from 'api';
import { LoadingSpinner } from 'components';
import { useCustomQuery } from 'hooks';
import { Navigate } from 'react-router-dom';
import { useAuthStore, useUserStore } from 'store';
import { appRoutes } from 'urls';
import { decodeToken } from 'utils';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLogged = useAuthStore((state) => state.isLogged);

  const isLoggedQuery = useCustomQuery(['checkLogin'], () => api.auth.checkLogin(), {
    onSuccess: ({ accessToken }) => {
      useAuthStore.setState({ isLogged: true, accessToken });
      const { firstName, lastName, role, userId, username, isThemeDark } = decodeToken(accessToken);

      useUserStore.setState({ firstName, lastName, role, userId, username, isThemeDark });
    },
    onError: () => {
      useAuthStore.setState({ isLogged: false, accessToken: '' });
      useUserStore.setState({ userId: '', username: '', firstName: '', lastName: '', role: '' });
    },
    staleTime: Infinity,
    retry: false,
    enabled: !isLogged,
  });

  if (isLoggedQuery.isLoading) return <LoadingSpinner />;

  return isLogged ? children : <Navigate to={appRoutes.auth.login} />;
};
