import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { api } from 'api';
import { useCustomMutation } from 'hooks/use-custom-mutation';

import { FormInputs, ModifyCommentFormProps, validationSchema } from '.';

export const ModifyCommentForm = ({ form, comment, setShowModal }: ModifyCommentFormProps) => {
  const mutateUpdateComment = useCustomMutation(api.comments.modify.patch, {
    invalidateQueryKey: ['ticketComments', 'ticketDetails', 'ticketFilters'],
    message: {
      onSuccess: 'Comment has been modified!',
      onError: 'Occured an error while modifying a comment!',
    },
  });

  const handleFinish = () => {
    const payload = {
      commentId: comment.id,
      content: form.getFieldValue(FormInputs.content),
    };
    mutateUpdateComment.mutateAsync({ ...payload });
    setShowModal(false);
  };

  return (
    <Form form={form} requiredMark={false} onFinish={handleFinish}>
      <Form.Item name={FormInputs.content} rules={validationSchema[FormInputs.content]} label='Content'>
        <TextArea maxLength={999} rows={10} defaultValue={comment.content} />
      </Form.Item>
    </Form>
  );
};
