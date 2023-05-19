import { Form, Input } from 'antd';
import { api } from 'api';
import { useCustomMutation } from 'hooks';
import { useUserStore } from 'store';

import { getRepeatPasswordRules, validationSchema } from './password-form.schema';
import { ChangePasswordFormProps, FormInputs } from './password-form.types';

export const ChangePasswordForm = ({ form, setShowModal }: ChangePasswordFormProps) => {
  const { userId } = useUserStore.getState();

  const editUserMutation = useCustomMutation(api.users.modify.patch, {
    onSuccess: () => {
      setShowModal(false);
    },
    message: {
      onSuccess: 'Password has been changed!',
      useResponseErrorMessage: true,
    },
  });

  const handleFinish = () => {
    const payload = {
      userId,
      password: form.getFieldValue(FormInputs.password),
    };
    editUserMutation.mutateAsync({ ...payload });
  };

  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
      <Form.Item name={FormInputs.password} rules={validationSchema[FormInputs.password]} label='Password'>
        <Input.Password />
      </Form.Item>
      <Form.Item name={FormInputs.repeatPassword} rules={getRepeatPasswordRules(form)} label='Repeat password'>
        <Input.Password />
      </Form.Item>
    </Form>
  );
};
