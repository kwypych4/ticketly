import { FormInstance } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { CommentsListTypes } from 'types';

export enum FormInputs {
  content = 'content',
}

export type FormTypes = {
  [FormInputs.content]: string;
};

export type ModifyCommentFormProps = {
  form: FormInstance<any>;
  comment: CommentsListTypes;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
