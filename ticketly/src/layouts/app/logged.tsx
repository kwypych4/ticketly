import { ProtectedRoute } from 'components/protected-route/protected-route';
import { Outlet } from 'react-router-dom';

import { SideMenu } from './components';
import { Wrapper } from './logged.styled';

export const LoggedLayout = () => {
  return (
    <ProtectedRoute>
      <Wrapper>
        <SideMenu />
        <Outlet />
      </Wrapper>
    </ProtectedRoute>
  );
};
