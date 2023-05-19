import { useUserStore } from 'store';
import { UserRoles } from 'types';

type PrivateWrapperProps = {
  children: JSX.Element;
  privilegedRoles: UserRoles[];
};

export const PrivateWrapper = ({ children, privilegedRoles }: PrivateWrapperProps) => {
  const role = useUserStore((state) => state.role);

  if (role && privilegedRoles.includes(role)) return children;

  return null;
};
