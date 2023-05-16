import { Outlet } from 'react-router-dom';

import { ErrorWrapper } from '.';

export const ErrorLayout = () => {
  return (
    <ErrorWrapper>
      <Outlet />
    </ErrorWrapper>
  );
};
