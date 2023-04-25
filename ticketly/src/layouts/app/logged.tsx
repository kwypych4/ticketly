import { Outlet } from 'react-router-dom';

import { SideMenu } from './components';
import { Wrapper } from './logged.styled';

export const LoggedLayout = () => {
  return (
    <Wrapper>
      <SideMenu />
      <Outlet />
    </Wrapper>
  );
};
