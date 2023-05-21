import { Rule } from 'antd/es/form';

import { FormInputs } from './settings-form.types';

type ValidationSchema = {
  [key: string]: Rule[];
};

export const validationSchema: ValidationSchema = {
  [FormInputs.theme]: [{ required: true, message: 'You need to pick theme!' }],
};
