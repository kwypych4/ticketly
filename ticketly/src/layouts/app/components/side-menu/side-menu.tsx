import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routesPrivileges } from 'privileges';
import { NavLink } from 'react-router-dom';
import { checkPrivileges } from 'utils';

import { menuElements, MenuList, Wrapper } from '.';
import { Logo, UserSection } from './components';

export const SideMenu = () => {
  return (
    <Wrapper>
      <Logo />

      <MenuList>
        {menuElements.map(({ id, title, path, icon }) => {
          const privilegedRoles = routesPrivileges[path];

          return checkPrivileges(privilegedRoles) ? (
            <li key={id}>
              <NavLink to={path}>
                <FontAwesomeIcon icon={icon} />
                {title}
              </NavLink>
            </li>
          ) : null;
        })}
      </MenuList>

      <UserSection />
    </Wrapper>
  );
};
