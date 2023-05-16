import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { App, Avatar, Dropdown } from 'antd';
import { api } from 'api';
import { useMutation } from 'react-query';
import { useAuthStore } from 'store';

import { Container } from '.';

export const UserSection = () => {
  const { notification } = App.useApp();
  const logoutMutation = useMutation('logout', () => api.auth.logout({ logoutFromAllDevices: false }), {
    onSuccess: () => {
      useAuthStore.setState({ isLogged: false, accessToken: '' });
      notification.success({ message: 'You have been successfully logged out!' });
    },
    onError: (error) => {
      notification.success({
        message: `Something went wrong! Please, contact with out IT support and give them this error message: ${error}`,
      });
    },
  });
  const logoutAllMutation = useMutation('logoutAll', () => api.auth.logout({ logoutFromAllDevices: true }), {
    onSuccess: () => {
      useAuthStore.setState({ isLogged: false, accessToken: '' });
      notification.success({ message: 'You have been successfully logged out from all devices!' });
    },
    onError: (error) => {
      notification.success({
        message: `Something went wrong! Please, contact with out IT support and give them this error message: ${error}`,
      });
    },
  });

  return (
    <Container>
      <Dropdown
        trigger={['click']}
        menu={{
          items: [
            {
              label: 'Logout',
              key: '0',
              onClick: () => logoutMutation.mutateAsync(),
            },
            {
              label: 'Logout from all devices',
              key: '1',
              onClick: () => logoutAllMutation.mutateAsync(),
            },
          ],
        }}
      >
        <div>
          <Avatar>KW</Avatar>
          Kamil Wypych
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Dropdown>
    </Container>
  );
};
