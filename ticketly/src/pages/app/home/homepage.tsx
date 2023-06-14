import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Modal } from 'antd';
import { api } from 'api';
import { PrivateWrapper, TableWrapper, TicketForm, TicketsBriefTable } from 'components';
import { useCustomQuery } from 'hooks';
import { useState } from 'react';
import { useUserStore } from 'store';
import { PageContent, PageItem, PageTitle, PageWrapper } from 'styles';
import { RequestParamsType } from 'types';

export const Homepage = () => {
  const { userId } = useUserStore.getState();
  const [options, setOptions] = useState<RequestParamsType>({ page: 1, limit: 13 });
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const ticketsListQuery = useCustomQuery(['ticketListOwner', options], () =>
    api.tickets.list.fetch({ options, owner: userId })
  );
  const assignedTicketsListQuery = useCustomQuery(['ticketListAssigned', options], () =>
    api.tickets.list.fetch({ options, engineer: userId })
  );

  return (
    <PageWrapper>
      <PageTitle>
        <h2>Dashboard</h2>
        <PrivateWrapper privilegedRoles={['user']}>
          <button onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
            Add new ticket
          </button>
        </PrivateWrapper>
      </PageTitle>
      <PageContent>
        <PrivateWrapper privilegedRoles={['admin', 'engineer']}>
          <PageItem>
            <h3>Tickets assigned to you</h3>
            <TableWrapper
              isLoading={assignedTicketsListQuery.isLoading}
              hasWrapper={false}
              setOptions={setOptions}
              data={assignedTicketsListQuery.data}
            >
              <TicketsBriefTable assignedToEngineer />
            </TableWrapper>
          </PageItem>
        </PrivateWrapper>
        <PageItem>
          <h3>Your tickets</h3>
          <TableWrapper
            isLoading={ticketsListQuery.isLoading}
            hasWrapper={false}
            setOptions={setOptions}
            data={ticketsListQuery.data}
          >
            <TicketsBriefTable />
          </TableWrapper>
        </PageItem>
      </PageContent>

      <Modal title='Create new ticket' open={showModal} onOk={() => form.submit()} onCancel={() => setShowModal(false)}>
        <TicketForm setShowModal={setShowModal} form={form} />
      </Modal>
    </PageWrapper>
  );
};
