import { Rule } from 'antd/es/form';

import { FormInputs } from './add-comment-form.types';

type ValidationSchema = {
  [key: string]: Rule[];
};
type InitialValues = {
  [key: string]: string | number;
};

export const validationSchema: ValidationSchema = {
  [FormInputs.content]: [{ required: true, message: 'You need provide comment content' }],
  [FormInputs.timeSpent]: [{ required: true, message: 'You need provide time' }],
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

export const initialValues: InitialValues = {
  [FormInputs.timeSpent]: 1,
};
