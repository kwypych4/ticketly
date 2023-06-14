import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Dropdown, Form, Modal } from 'antd';
import { api } from 'api';
import { useCustomMutation } from 'hooks';
import { useState } from 'react';
import { useAuthStore, useUserStore } from 'store';

import { ChangePasswordForm, Container } from '.';

export const UserSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const logoutMutation = useCustomMutation(api.auth.logout, {
    mutationKey: 'logout',
    message: {
      onError: 'Something went wrong! Please, contact with out IT support.',
      onSuccess: 'You have been successfully logged out!',
    },
    onSuccess: () => {
      useAuthStore.setState({ isLogged: false, accessToken: '' });
      useUserStore.setState({ userId: '', username: '', firstName: '', lastName: '', role: '' });
    },
  });
  const logoutAllMutation = useCustomMutation(() => api.auth.logout({ logoutFromAllDevices: true }), {
    mutationKey: 'logoutAll',
    message: {
      onError: 'Something went wrong! Please, contact with out IT support.',
      onSuccess: 'You have been successfully logged out from all devices!!',
    },
    onSuccess: () => {
      useAuthStore.setState({ isLogged: false, accessToken: '' });
      useUserStore.setState({ userId: '', username: '', firstName: '', lastName: '', role: '' });
    },
  });
  const userData = useUserStore((state) => state);

  return (
    <Container>
      <Dropdown
        trigger={['click']}
        menu={{
          items: [
            {
              label: 'Logout',
              key: '0',
              onClick: () => logoutMutation.mutateAsync({ logoutFromAllDevices: false }),
            },
            {
              label: 'Logout from all devices',
              key: '1',
              onClick: () => logoutAllMutation.mutateAsync(),
            },
            {
              label: 'Change password',
              key: '2',
              onClick: () => setShowModal(true),
            },
          ],
        }}
      >
        <div>
          <Avatar>
            {userData.firstName[0]}
            {userData.lastName[0]}
          </Avatar>
          {userData.firstName} {userData.lastName}
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Dropdown>
      <Modal title='Change password' open={showModal} onOk={() => form.submit()} onCancel={() => setShowModal(false)}>
        <ChangePasswordForm setShowModal={setShowModal} form={form} />
      </Modal>
    </Container>
  );
};
