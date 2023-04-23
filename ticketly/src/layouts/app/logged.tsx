import { Outlet } from 'react-router-dom';

export const LoggedLayout = () => {
  return (
    <div>
      <h2>Logged layout</h2>
      <Outlet />
    </div>
  );
};
