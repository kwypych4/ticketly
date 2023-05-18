import { Rule } from 'antd/es/form';

import { FormInputs } from './ticket-form.types';

type ValidationSchema = {
  [key: string]: Rule[];
};

export const validationSchema: ValidationSchema = {
  [FormInputs.title]: [{ required: true, message: 'You need provide ticket title' }],
  [FormInputs.description]: [{ required: true, message: 'You need provide ticket description' }],
  [FormInputs.attachments]: [
    {
      required: false,
      validator: (_, value) => {
        if (!value) return Promise.resolve();
        return value.some((file: File) => file.size > 4 * 1024 * 1024) ? Promise.reject() : Promise.resolve();
      },
      message: 'File size cannot exceed 4MB!',
    },
  ],
};
