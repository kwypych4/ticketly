import { Image, Select } from 'antd';
import moment from 'moment';

import { InfoProps, InfoWrapper } from '.';

export const Info = ({ data, filters, mutateTicket }: InfoProps) => {
  const handleEngineerChange = (value: string) => {
    mutateTicket.mutateAsync({ engineer: value });
  };
  const handleStatusChange = (value: string) => {
    mutateTicket.mutateAsync({ status: value });
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
        <p>{moment(data.created).format('DD.MM.YYYY HH:MM')}</p>
      </div>
      {data.status === 'finished' && (
        <div>
          <span>Finished:</span>
          <p>{data.finished}</p>
        </div>
      )}
      <div>
        <span>Ticket owner:</span>
        <p>{data.ownerName}</p>
      </div>
      <div>
        <span>Time spent:</span>
        <p>{data.timeSpent}m</p>
      </div>
      <div>
        <span>Assigned engineer:</span>

        <Select
          defaultValue={data.engineerId}
          style={{ width: 220 }}
          onChange={handleEngineerChange}
          options={filters.engineers}
        />
      </div>
      <div>
        <span>Status:</span>
        <Select
          defaultValue={data.status}
          style={{ width: 220 }}
          onChange={handleStatusChange}
          options={filters.statuses}
        />
      </div>
      <div>
        <span>Attachments:</span>
        {data.attachments?.map((attachment) => (
          <Image
            key={attachment.title}
            width={100}
            src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          />
        ))}
      </div>
    </InfoWrapper>
  );
};
