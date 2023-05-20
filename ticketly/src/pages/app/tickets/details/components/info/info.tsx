import { Image, Select } from 'antd';
import moment from 'moment';
import { apiUrls } from 'urls';
import { checkPrivileges, convertMinutes } from 'utils';

import { InfoProps, InfoWrapper } from '.';

export const Info = ({ data, filters, mutateTicket }: InfoProps) => {
  const handleEngineerChange = (value: string) => {
    mutateTicket.mutateAsync({ engineer: value });
  };
  const handleStatusChange = (value: string) => {
    mutateTicket.mutateAsync({ status: value });
  };

  const getDefaultEngineerValue = () => {
    if (filters.engineers.length > 0) return data.engineerId;
    if (data.engineerName) return data.engineerName;
    return 'Not assigned';
  };

  return (
    <InfoWrapper>
      <div>
        <span>Ticket title:</span>
        <h3>{data.title}</h3>
      </div>
      <div>
        <span>Ticket description:</span>
        <p>{data.description}</p>
      </div>
      <div>
        <span>Created:</span>
        <p>{moment(data.created).format('DD.MM.YYYY HH:mm')}</p>
      </div>
      {data.status === 'finished' && (
        <div>
          <span>Finished:</span>
          <p>{moment(data.finished).format('DD.MM.YYYY HH:mm')}</p>
        </div>
      )}
      <div>
        <span>Ticket owner:</span>
        <p>{data.ownerName}</p>
      </div>
      <div>
        <span>Time spent:</span>
        <p>{data.timeSpent ? convertMinutes(data.timeSpent) : '-'}</p>
      </div>
      <div>
        <span>Assigned engineer:</span>

        <Select
          defaultValue={getDefaultEngineerValue()}
          style={{ width: 220 }}
          onChange={handleEngineerChange}
          options={filters.engineers}
          disabled={!checkPrivileges(['admin', 'engineer'])}
        />
      </div>
      <div>
        <span>Status:</span>
        <Select
          defaultValue={data.status}
          style={{ width: 220 }}
          onChange={handleStatusChange}
          options={filters.statuses}
          disabled={!checkPrivileges(['admin', 'engineer'])}
        />
      </div>
      {data.attachments && (
        <div>
          <span>Attachments:</span>
          {data.attachments?.map((attachment) => (
            <Image key={attachment.title} width={100} src={apiUrls.attachments.index(attachment.path)} />
          ))}
        </div>
      )}
    </InfoWrapper>
  );
};
