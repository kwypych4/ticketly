import { Rule } from 'antd/es/form';

import { FormInputs } from './modify-comment-form.types';

type ValidationSchema = {
  [key: string]: Rule[];
};

export const validationSchema: ValidationSchema = {
  [FormInputs.content]: [{ required: true, message: 'You need modify comment content' }],
};
