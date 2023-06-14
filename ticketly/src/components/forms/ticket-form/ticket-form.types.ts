import { FormInstance } from 'antd';
import { Dispatch, SetStateAction } from 'react';

export enum FormInputs {
  title = 'title',
  description = 'description',
  attachments = 'attachments',
}

export type FormTypes = {
  [FormInputs.title]: string;
  [FormInputs.description]: string;
  [FormInputs.attachments]: File | File[];
};

export type TicketFormProps = {
  form: FormInstance<any>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
