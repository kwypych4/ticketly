import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { api } from 'api';
import { useCustomMutation } from 'hooks/use-custom-mutation';

import { FormInputs, TicketFormProps, validationSchema } from '.';

export const TicketForm = ({ form, setShowModal }: TicketFormProps) => {
  const createTicketMutation = useCustomMutation(api.tickets.modify.post, {
    invalidateQueryKey: ['ticketList'],
    message: {
      onSuccess: 'Ticket has been added!',
      useResponseErrorMessage: true,
    },
  });

  const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleFinish = () => {
    const files = form.getFieldValue(FormInputs.attachments)?.map((file: UploadFile) => file.originFileObj);
    const payload = {
      title: form.getFieldValue(FormInputs.title),
      description: form.getFieldValue(FormInputs.description),
      ...(files && { attachments: [...files] }),
    };
    createTicketMutation.mutateAsync({ ...payload });
    setShowModal(false);
  };

  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
      <Form.Item name={FormInputs.title} rules={validationSchema[FormInputs.title]} label='Title'>
        <Input />
      </Form.Item>
      <Form.Item name={FormInputs.description} rules={validationSchema[FormInputs.description]} label='Description'>
        <TextArea maxLength={999} rows={8} />
      </Form.Item>
      <Form.Item
        name={FormInputs.attachments}
        rules={validationSchema[FormInputs.attachments]}
        label='Attachments'
        valuePropName='fileList'
        getValueFromEvent={normFile}
      >
        <Upload name='logo' listType='picture' beforeUpload={() => false} maxCount={3}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};
