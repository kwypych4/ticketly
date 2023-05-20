import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Modal } from 'antd';
import { api } from 'api';
import { TableWrapper, TicketsTable } from 'components';
import { useCustomQuery } from 'hooks';
import { useState } from 'react';
import { PageContent, PageTitle, PageWrapper } from 'styles';
import { RequestParamsType } from 'types';

import { TicketForm } from './components';

export const TicketsPage = () => {
  const [options, setOptions] = useState<RequestParamsType>({ page: 1, limit: 13 });
  const [showModal, setShowModal] = useState(false);
  const ticketsListQuery = useCustomQuery(['ticketList', options], () => api.tickets.list.fetch({ options }));
  const [form] = Form.useForm();
  return (
    <PageWrapper>
      <PageTitle>
        <h2>Tickets</h2>
        <button onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPlus} />
          Add new ticket
        </button>
      </PageTitle>
      <PageContent>
        <TableWrapper setOptions={setOptions} data={ticketsListQuery.data}>
          <TicketsTable />
        </TableWrapper>
      </PageContent>
      <Modal title='Create new ticket' open={showModal} onOk={() => form.submit()} onCancel={() => setShowModal(false)}>
        <TicketForm setShowModal={setShowModal} form={form} />
      </Modal>
    </PageWrapper>
  );
};
