import { FormInstance } from 'antd';
import { Dispatch, SetStateAction } from 'react';

export enum FormInputs {
  password = 'password',
  repeatPassword = 'repeatPassword',
}

export type FormTypes = {
  [FormInputs.password]: string;
  [FormInputs.repeatPassword]: string;
};

export type ChangePasswordFormProps = {
  form: FormInstance<any>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
