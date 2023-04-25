import { faBriefcase, faGear, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { appRoutes } from 'urls';

export const menuElements = [
  {
    id: 0,
    title: 'Dashboard',
    path: appRoutes.app.homepage,
    icon: faHouse,
  },
  {
    id: 1,
    title: 'Tickets',
    path: appRoutes.app.tickets,
    icon: faBriefcase,
  },
  {
    id: 2,
    title: 'Users',
    path: appRoutes.app.users,
    icon: faUser,
  },
  {
    id: 3,
    title: 'Settings',
    path: appRoutes.app.settings,
    icon: faGear,
  },
];
