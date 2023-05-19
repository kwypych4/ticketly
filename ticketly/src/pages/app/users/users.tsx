import { faUserCog, faUserEdit, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Modal } from 'antd';
import { api } from 'api';
import { TableWrapper, TicketsTable, UsersTable } from 'components';
import { useCustomMutation } from 'hooks/use-custom-mutation';
import { useCustomQuery } from 'hooks/use-custom-query';
import { useState } from 'react';
import { PageContent, PageTitle, PageWrapper } from 'styles';
import { RequestParamsType } from 'types';

import { AddUserForm } from './components';
import { ButtonsWrapper } from './users.styled';

export const UsersPage = () => {
  const [options, setOptions] = useState<RequestParamsType>({ page: 1, limit: 13 });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();

  const usersListQuery = useCustomQuery(['usersList', options], () => api.users.list.fetch(options));
  const deleteUserMutation = useCustomMutation(api.users.modify.delete, {
    invalidateQueryKey: ['usersList'],
    message: {
      onSuccess: 'User has been deleted!',
      useResponseErrorMessage: true,
    },
  });

  const handleDeleteUser = () =>
    selectedRowKeys && deleteUserMutation.mutateAsync({ userId: String(selectedRowKeys[0]) });

  const [form] = Form.useForm();
  return (
    <PageWrapper>
      <PageTitle>
        <h2>Users</h2>
        <ButtonsWrapper>
          <button onClick={() => setShowCreateModal(true)}>
            <FontAwesomeIcon icon={faUserPlus} />
            Add new user
          </button>
          {selectedRowKeys && (
            <>
              <button onClick={handleDeleteUser}>
                <FontAwesomeIcon icon={faUserMinus} />
                Delete selected user
              </button>
              <button>
                <FontAwesomeIcon icon={faUserEdit} />
                Edit selected user
              </button>
            </>
          )}
        </ButtonsWrapper>
      </PageTitle>
      <PageContent>
        <TableWrapper setOptions={setOptions} data={usersListQuery.data}>
          <UsersTable selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />
        </TableWrapper>
      </PageContent>
      <Modal
        title='Create new ticket'
        open={showCreateModal}
        onOk={() => form.submit()}
        onCancel={() => setShowCreateModal(false)}
      >
        <AddUserForm setShowModal={setShowCreateModal} form={form} />
      </Modal>
    </PageWrapper>
  );
};
