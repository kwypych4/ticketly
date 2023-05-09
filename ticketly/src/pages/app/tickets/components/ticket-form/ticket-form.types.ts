import { FormInstance } from 'antd';

export enum FormInputs {
  title = 'title',
  description = 'description',
  attachments = 'attachments',
}

export type FormTypes = {
  [FormInputs.title]: string;
  [FormInputs.description]: string;
  [FormInputs.attachments]: any;
};

export type TicketFormProps = {
  form: FormInstance<any>;
};
