import { ProtectedRoute } from 'components/protected-route/protected-route';
import { useAccess } from 'hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { appRoutes } from 'urls';

import { SideMenu } from './components';
import { Wrapper } from './logged.styled';

export const LoggedLayout = () => {
  const { hasAccess } = useAccess();

  return hasAccess ? (
    <ProtectedRoute>
      <Wrapper>
        <SideMenu />
        <Outlet />
      </Wrapper>
    </ProtectedRoute>
  ) : (
    <Navigate to={appRoutes.error.forbidden} />
  );
};
