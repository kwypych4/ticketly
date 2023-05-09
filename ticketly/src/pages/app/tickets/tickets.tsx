import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Modal } from 'antd';
import { api } from 'api';
import { TableWrapper, TicketsTable } from 'components';
import { useCustomQuery } from 'hooks/use-custom-query';
import { useState } from 'react';
import { useAuthStore } from 'store';
import { PageContent, PageTitle, PageWrapper } from 'styles';
import { RequestParamsType } from 'types';

import { TicketForm } from './components';

export const TicketsPage = () => {
  const [options, setOptions] = useState<RequestParamsType>();
  const [showModal, setShowModal] = useState(false);
  const { data } = useCustomQuery(['tickets', options], () => api.tickets.list.fetch(options));
  const [form] = Form.useForm();
  const token = useAuthStore((state) => state.accessToken);
  return (
    <PageWrapper>
      <PageTitle>
        <h2>Tickets, {token}</h2>
        <button onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPlus} />
          Add new ticket
        </button>
      </PageTitle>
      <PageContent>
        <TableWrapper setOptions={setOptions} data={data}>
          <TicketsTable />
        </TableWrapper>
      </PageContent>
      <Modal title='Create new ticket' open={showModal} onOk={() => form.submit()} onCancel={() => setShowModal(false)}>
        <TicketForm form={form} />
      </Modal>
    </PageWrapper>
  );
};
