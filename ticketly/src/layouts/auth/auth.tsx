import { Outlet } from 'react-router-dom';

import { AuthWrapper } from '.';

export const AuthLayout = () => {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
};
