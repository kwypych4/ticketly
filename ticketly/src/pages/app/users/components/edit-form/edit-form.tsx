import { faUnlockKeyhole, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input, Select } from 'antd';
import { api } from 'api';
import { useCustomMutation, useCustomQuery } from 'hooks';
import { MouseEvent, useEffect, useState } from 'react';

import { validationSchema } from './edit-form.schema';
import { EditUserFormProps, FormInputs } from './edit-form.types';

export const EditUserForm = ({ form, setShowModal, currentData }: EditUserFormProps) => {
  const [changePassword, setChangePassword] = useState(false);

  const filtersQuery = useCustomQuery(['userFilters'], api.users.filters.fetch);

  const editUserMutation = useCustomMutation(api.users.modify.patch, {
    invalidateQueryKey: ['usersList'],
    onSuccess: () => {
      setShowModal(false);
    },
    message: {
      onSuccess: 'User data has been modified!',
      useResponseErrorMessage: true,
    },
  });

  const handleFinish = () => {
    const payload = {
      ...(form.getFieldValue(FormInputs.password) && { password: form.getFieldValue(FormInputs.password) }),
      ...(form.getFieldValue(FormInputs.role) !== currentData?.role && { role: form.getFieldValue(FormInputs.role) }),
      ...(form.getFieldValue(FormInputs.firstName) !== currentData?.firstName && {
        firstName: form.getFieldValue(FormInputs.firstName),
      }),
      ...(form.getFieldValue(FormInputs.lastName) !== currentData?.lastName && {
        lastName: form.getFieldValue(FormInputs.lastName),
      }),
      ...(form.getFieldValue(FormInputs.department) !== currentData?.department && {
        department: form.getFieldValue(FormInputs.department),
      }),
      ...(form.getFieldValue(FormInputs.position) !== currentData?.position && {
        position: form.getFieldValue(FormInputs.position),
      }),
    };

    if (Object.keys(payload).length) editUserMutation.mutateAsync({ userId: currentData?.id, ...payload });
  };

  const handleEnablePasswordInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.resetFields([[FormInputs.password]]);
    setChangePassword((prevState) => !prevState);
  };

  const getChangePasswordButton = () => {
    const icon = changePassword ? faXmark : faUnlockKeyhole;
    const text = changePassword ? 'Cancel' : 'Change';
    return (
      <button onClick={handleEnablePasswordInput}>
        <FontAwesomeIcon icon={icon} /> {text}
      </button>
    );
  };

  useEffect(() => {
    form.setFieldsValue({
      [FormInputs.firstName]: currentData?.firstName,
      [FormInputs.lastName]: currentData?.lastName,
      [FormInputs.department]: currentData?.department,
      [FormInputs.position]: currentData?.position,
      [FormInputs.password]: null,
      [FormInputs.role]: currentData?.role,
    });
  }, [form, currentData]);

  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
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
      <Form.Item>
        <Form.Item
          name={FormInputs.password}
          rules={[{ required: changePassword, message: '' }, ...validationSchema[FormInputs.password]]}
          label='Password'
        >
          <Input.Password disabled={!changePassword} />
        </Form.Item>
        <Form.Item>{getChangePasswordButton()}</Form.Item>
      </Form.Item>
    </Form>
  );
};
