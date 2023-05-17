import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, InputNumber, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { api } from 'api';
import { useCustomMutation } from 'hooks/use-custom-mutation';
import { useParams } from 'react-router-dom';

import { FormInputs, TicketFormProps, validationSchema } from '.';

export const AddCommentForm = ({ form, setShowModal }: TicketFormProps) => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const { ticketId } = useParams();
  const mutateAddComment = useCustomMutation(api.comments.add.post, {
    invalidateQueryKey: ['ticketComments', 'ticketDetails', 'ticketFilters'],
    message: {
      onSuccess: 'Comment has been added!',
      onError: 'Occured an error while adding a comment!',
    },
  });

  const handleFinish = () => {
    const files = form.getFieldValue(FormInputs.attachments)?.map((file: any) => file.originFileObj);
    const payload = {
      content: form.getFieldValue(FormInputs.content),
      ...(files && { attachments: [...files] }),
      timeSpent: form.getFieldValue(FormInputs.timeSpent),
      ticketId: ticketId as string,
    };
    mutateAddComment.mutateAsync({ ...payload });
    setShowModal(false);
  };

  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
      <Form.Item name={FormInputs.content} rules={validationSchema[FormInputs.content]} label='Content'>
        <TextArea maxLength={999} rows={10} />
      </Form.Item>
      <Form.Item
        name={FormInputs.timeSpent}
        rules={validationSchema[FormInputs.timeSpent]}
        label='Time spent (minutes)'
      >
        <InputNumber min={1} defaultValue={1} />
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
