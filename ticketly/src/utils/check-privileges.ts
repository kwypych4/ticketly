import { useUserStore } from 'store';
import { UserRoles } from 'types';

export const checkPrivileges = (privilegedRoles: UserRoles[]) => {
  const { role } = useUserStore.getState();

  return Boolean(role && privilegedRoles.includes(role));
};
