import { Rule } from 'antd/es/form';

import { FormInputs } from './edit-form.types';

type ValidationSchema = {
  [key: string]: Rule[];
};

export const validationSchema: ValidationSchema = {
  [FormInputs.password]: [
    {
      pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      message:
        'You need provide strong password! (min. 8 characters length, with special characters and capital letters.',
    },
  ],
  [FormInputs.firstName]: [
    {
      required: true,
      pattern: /^[A-ZĄ-Ż][a-zą-ż]{2,20}$/,
      message: "You need provide user's first name. First letter must be capital and name cannot contain numbers!",
    },
  ],
  [FormInputs.lastName]: [
    {
      required: true,
      pattern: /^[A-ZĄ-Ż][a-zą-ż]{2,30}$/,
      message: "You need provide user's last name. First letter must be capital and last name cannot contain numbers!",
    },
  ],
  [FormInputs.department]: [
    {
      required: true,
      message: "You need provide user's department.",
    },
  ],
  [FormInputs.position]: [
    {
      required: true,
      message: "You need provide user's position.",
    },
  ],
  [FormInputs.role]: [
    {
      required: true,
      message: "You need provide user's role.",
    },
  ],
};
