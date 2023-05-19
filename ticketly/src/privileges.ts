import { UserRoles } from 'types';
import { appRoutes } from 'urls';

type PrivilegesTypes = {
  [key: string]: UserRoles[];
};
export const routesPrivileges: PrivilegesTypes = {
  [appRoutes.app.homepage]: ['admin', 'user', 'engineer'],
  [appRoutes.app.users]: ['admin', 'engineer'],
  [appRoutes.app.tickets.index]: ['admin', 'user', 'engineer'],
  [appRoutes.app.tickets.details]: ['admin', 'user', 'engineer'],
  [appRoutes.app.settings]: ['admin'],
};
