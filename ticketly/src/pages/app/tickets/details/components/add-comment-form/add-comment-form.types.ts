import { FormInstance } from 'antd';
import { Dispatch, SetStateAction } from 'react';

export enum FormInputs {
  content = 'content',
  timeSpent = 'timeSpent',
  attachments = 'attachments',
}

export type FormTypes = {
  [FormInputs.content]: string;
  [FormInputs.timeSpent]: number;
  [FormInputs.attachments]: any;
};

export type AddCommentFormProps = {
  form: FormInstance<any>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
