import { routesPrivileges } from 'privileges';
import { useLocation, useParams } from 'react-router-dom';
import { useUserStore } from 'store';

export const useAccess = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const role = useUserStore((state) => state.role);

  const getPathWithoutParams = () => {
    const paramKeys = Object.keys(params);
    const pathArr = pathname.split('/').slice(0, paramKeys.length * -1);
    paramKeys.forEach((key) => pathArr.push(`:${key}`));
    return pathArr.join('/');
  };

  const privilegesList = routesPrivileges[pathname] || routesPrivileges[getPathWithoutParams()];
  const hasAccess = role !== '' && privilegesList ? privilegesList.includes(role) : true;

  return {
    hasAccess,
    privilegesList,
  };
};
