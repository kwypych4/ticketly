import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import { api } from 'api';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store';

import { validationSchema } from './login-form.schema';
import { FormInputs } from './login-form.types';

export const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const mutateLogin = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      api.auth.login({ username, password }),
    onSuccess: ({ accessToken }) => {
      useAuthStore.setState({ isLogged: true, accessToken });
      navigate('/');
    },
    onError: (error: AxiosError<{ error: string }>) => {
      console.log(error.response?.data.error);
    },
  });

  const handleFinish = () => {
    const payload = {
      username: form.getFieldValue(FormInputs.username),
      password: form.getFieldValue(FormInputs.password),
    };

    mutateLogin.mutateAsync({ ...payload });
  };

  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
      <Form.Item name={FormInputs.username} rules={validationSchema[FormInputs.username]} label='Username'>
        <Input />
      </Form.Item>
      <Form.Item name={FormInputs.password} rules={validationSchema[FormInputs.password]} label='Password'>
        <Input type='password' />
      </Form.Item>
      <button onClick={form.submit}>
        <FontAwesomeIcon icon={faUnlockKeyhole} />
        Login
      </button>
    </Form>
  );
};
