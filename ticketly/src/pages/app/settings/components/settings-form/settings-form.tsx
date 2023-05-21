import { Form } from 'antd';
import { api } from 'api';
import { useCustomMutation } from 'hooks';
import { useUserStore } from 'store';

import { CustomSwitch } from '..';
import { validationSchema } from './settings-form.schema';
import { FormInputs, SettingsFormProps } from './settings-form.types';

export const SettingsForm = ({ form }: SettingsFormProps) => {
  const isThemeDark = useUserStore((state) => state.isThemeDark);

  const editUserThemeMutation = useCustomMutation(api.users.modify.patch.theme, {
    invalidateQueryKey: ['usersList'],
    onSuccess: (success) => {
      useUserStore.setState({ isThemeDark: JSON.parse(success.isThemeDark) });
    },
    message: {
      onSuccess: 'Theme has been changed!',
      useResponseErrorMessage: true,
    },
  });

  const handleFinish = () => {
    editUserThemeMutation.mutateAsync({ isThemeDark: !isThemeDark });
  };

  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
      <Form.Item name={FormInputs.theme} rules={validationSchema[FormInputs.theme]} label='Theme'>
        <CustomSwitch disabledText='Dark' enabledText='Light' onChange={form.submit} checked={!isThemeDark} />
      </Form.Item>
    </Form>
  );
};
