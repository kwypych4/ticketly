import { faUserEdit, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Modal } from 'antd';
import { api } from 'api';
import { TableWrapper, UsersTable } from 'components';
import { PrivateWrapper } from 'components/private-wrapper';
import { useCustomMutation, useCustomQuery } from 'hooks';
import { useState } from 'react';
import { PageContent, PageTitle, PageWrapper } from 'styles';
import { RequestParamsType, UsersListTypes } from 'types';

import { AddUserForm, EditUserForm } from './components';
import { ButtonsWrapper } from './users.styled';

export const UsersPage = () => {
  const [addUserForm] = Form.useForm();
  const [editUserForm] = Form.useForm();

  const [options, setOptions] = useState<RequestParamsType>({ page: 1, limit: 13 });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UsersListTypes>();

  const usersListQuery = useCustomQuery(['usersList', options], () => api.users.list.fetch(options));

  const deleteUserMutation = useCustomMutation(api.users.modify.delete, {
    invalidateQueryKey: ['usersList'],
    message: {
      onSuccess: 'User has been deleted!',
      useResponseErrorMessage: true,
    },
    onSuccess: () => {
      setSelectedRow(undefined);
    },
  });

  const handleDeleteUser = () => selectedRow && deleteUserMutation.mutateAsync({ userId: String(selectedRow.id) });

  return (
    <PageWrapper>
      <PageTitle>
        <h2>Users</h2>
        <PrivateWrapper privilegedRoles={['admin']}>
          <ButtonsWrapper>
            <button onClick={() => setShowCreateModal(true)}>
              <FontAwesomeIcon icon={faUserPlus} />
              Add new user
            </button>
            {selectedRow && (
              <>
                <button onClick={handleDeleteUser}>
                  <FontAwesomeIcon icon={faUserMinus} />
                  Delete selected user
                </button>
                <button onClick={() => setShowEditModal(true)}>
                  <FontAwesomeIcon icon={faUserEdit} />
                  Edit selected user
                </button>
              </>
            )}
          </ButtonsWrapper>
        </PrivateWrapper>
      </PageTitle>
      <PageContent>
        <TableWrapper setOptions={setOptions} data={usersListQuery.data}>
          <UsersTable setSelectedRow={setSelectedRow} />
        </TableWrapper>
      </PageContent>
      <Modal
        title='Add new user'
        open={showCreateModal}
        onOk={() => addUserForm.submit()}
        onCancel={() => setShowCreateModal(false)}
      >
        <AddUserForm setShowModal={setShowCreateModal} form={addUserForm} />
      </Modal>
      <Modal
        title='Edit user'
        open={showEditModal}
        onOk={() => editUserForm.submit()}
        onCancel={() => setShowEditModal(false)}
      >
        <EditUserForm setShowModal={setShowEditModal} form={editUserForm} currentData={selectedRow} />
      </Modal>
    </PageWrapper>
  );
};
