import { FormInstance } from 'antd';
import { Dispatch, SetStateAction } from 'react';

export enum FormInputs {
  username = 'username',
  password = 'password',
  firstName = 'firstName',
  lastName = 'lastName',
  department = 'department',
  position = 'position',
  role = 'role',
}

export type FormTypes = {
  [FormInputs.username]: string;
  [FormInputs.password]: string;
  [FormInputs.firstName]: string;
  [FormInputs.lastName]: string;
  [FormInputs.department]: string;
  [FormInputs.position]: string;
  [FormInputs.role]: string;
};

export type AddUserFormProps = {
  form: FormInstance<any>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
