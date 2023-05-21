import { FormInstance } from 'antd';

export enum FormInputs {
  theme = 'theme',
}

export type FormTypes = {
  [FormInputs.theme]: boolean;
};

export type SettingsFormProps = {
  form: FormInstance<any>;
};
