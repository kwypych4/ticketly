import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import { menuElements, MenuList, Wrapper } from '.';
import { Logo, UserSection } from './components';

export const SideMenu = () => {
  return (
    <Wrapper>
      <Logo />

      <MenuList>
        {menuElements.map(({ id, title, path, icon }) => (
          <li key={id}>
            <NavLink to={path}>
              <FontAwesomeIcon icon={icon} />
              {title}
            </NavLink>
          </li>
        ))}
      </MenuList>

      <UserSection />
    </Wrapper>
  );
};
