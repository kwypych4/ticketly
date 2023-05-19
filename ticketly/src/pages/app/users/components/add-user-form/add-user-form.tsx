import { Form, Input, Select } from 'antd';
import { api } from 'api';
import { useCustomMutation } from 'hooks/use-custom-mutation';
import { useCustomQuery } from 'hooks/use-custom-query';

import { validationSchema } from './add-user-form.schema';
import { AddUserFormProps, FormInputs } from './add-user-form.types';

export const AddUserForm = ({ form, setShowModal }: AddUserFormProps) => {
  const filtersQuery = useCustomQuery(['userFilters'], api.users.filters.fetch);

  const createUserMutation = useCustomMutation(api.users.modify.post, {
    invalidateQueryKey: ['usersList'],
    onSuccess: () => {
      setShowModal(false);
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        form.setFields([
          {
            name: FormInputs.username,
            errors: [error.response.data.error],
          },
        ]);
      }
    },
    message: {
      onSuccess: 'User has been added!',
      useResponseErrorMessage: true,
    },
  });

  const handleFinish = () => {
    const payload = {
      username: form.getFieldValue(FormInputs.username),
      password: form.getFieldValue(FormInputs.password),
      role: form.getFieldValue(FormInputs.role),
      firstName: form.getFieldValue(FormInputs.firstName),
      lastName: form.getFieldValue(FormInputs.lastName),
      department: form.getFieldValue(FormInputs.department),
      position: form.getFieldValue(FormInputs.position),
    };

    createUserMutation.mutateAsync({ ...payload });
  };

  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
      <Form.Item name={FormInputs.username} rules={validationSchema[FormInputs.username]} label='Username'>
        <Input />
      </Form.Item>
      <Form.Item name={FormInputs.password} rules={validationSchema[FormInputs.password]} label='Password'>
        <Input.Password />
      </Form.Item>
      <Form.Item name={FormInputs.firstName} rules={validationSchema[FormInputs.firstName]} label='First name'>
        <Input />
      </Form.Item>
      <Form.Item name={FormInputs.lastName} rules={validationSchema[FormInputs.lastName]} label='Last name'>
        <Input />
      </Form.Item>
      <Form.Item name={FormInputs.department} rules={validationSchema[FormInputs.department]} label='Department'>
        <Input />
      </Form.Item>
      <Form.Item name={FormInputs.position} rules={validationSchema[FormInputs.position]} label='Position'>
        <Input />
      </Form.Item>
      <Form.Item name={FormInputs.role} rules={validationSchema[FormInputs.role]} label='Role'>
        <Select options={filtersQuery.data?.roles} />
      </Form.Item>
    </Form>
  );
};
