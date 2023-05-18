import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Modal } from 'antd';
import { api } from 'api';
import { TableWrapper, TicketsTable, UsersTable } from 'components';
import { useCustomQuery } from 'hooks/use-custom-query';
import { useState } from 'react';
import { PageContent, PageTitle, PageWrapper } from 'styles';
import { RequestParamsType } from 'types';

export const UsersPage = () => {
  const [options, setOptions] = useState<RequestParamsType>({ page: 1, limit: 13 });
  const [showModal, setShowModal] = useState(false);
  const usersListQuery = useCustomQuery(['usersList', options], () => api.users.list.fetch(options));
  const [form] = Form.useForm();
  return (
    <PageWrapper>
      <PageTitle>
        <h2>Users</h2>
        <button onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faUserPlus} />
          Add new user
        </button>
      </PageTitle>
      <PageContent>
        <TableWrapper setOptions={setOptions} data={usersListQuery.data}>
          <UsersTable />
        </TableWrapper>
      </PageContent>
      {/* <Modal title='Create new ticket' open={showModal} onOk={() => form.submit()} onCancel={() => setShowModal(false)}>
        <TicketForm setShowModal={setShowModal} form={form} />
      </Modal> */}
    </PageWrapper>
  );
};
