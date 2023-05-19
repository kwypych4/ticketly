import { FormInstance } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { UsersListTypes } from 'types';

export enum FormInputs {
  password = 'password',
  firstName = 'firstName',
  lastName = 'lastName',
  department = 'department',
  position = 'position',
  role = 'role',
}

export type FormTypes = {
  [FormInputs.password]: string;
  [FormInputs.firstName]: string;
  [FormInputs.lastName]: string;
  [FormInputs.department]: string;
  [FormInputs.position]: string;
  [FormInputs.role]: string;
};

export type EditUserFormProps = {
  form: FormInstance<any>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  currentData: UsersListTypes | undefined;
};
