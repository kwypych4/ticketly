import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { FormInputs, TicketFormProps, validationSchema } from '.';

export const TicketForm = ({ form }: TicketFormProps) => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleFinish = () => {
    console.log(form.getFieldValue(FormInputs.attachments));
    console.log('ok');
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
