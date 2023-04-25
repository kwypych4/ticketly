import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Dropdown } from 'antd';

import { Container, items } from '.';

export const UserSection = () => {
  return (
    <Container>
      <Dropdown trigger={['click']} menu={{ items }}>
        <div>
          <Avatar>KW</Avatar>
          Kamil Wypych
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Dropdown>
    </Container>
  );
};
