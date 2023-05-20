import { Children } from 'react';
import { useUserStore } from 'store';
import { UserRoles } from 'types';

type PrivateWrapperProps = {
  children: JSX.Element | JSX.Element[];
  privilegedRoles: UserRoles[];
};

export const PrivateWrapper = ({ children, privilegedRoles }: PrivateWrapperProps) => {
  const role = useUserStore((state) => state.role);

  const getChildren = () => {
    const childrenArray = Children.toArray(children);

    return childrenArray.map((children) => children);
  };

  if (role && privilegedRoles.includes(role)) return <>{getChildren()}</>;

  return null;
};
