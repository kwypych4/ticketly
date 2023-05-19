import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Image, Modal } from 'antd';
import { api } from 'api';
import { useCustomMutation } from 'hooks';
import moment from 'moment';
import { useState } from 'react';
import { apiUrls } from 'urls';

import { ModifyCommentForm } from '../../../modify-comment-form';
import { CommentAttachments, CommentButtons, CommentContent, CommentProps, CommentTitle, CommentWrapper } from '.';

export const Comment = ({ commentData }: CommentProps) => {
  const { id, content, ownerName, attachments, created, updated } = commentData;
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const deleteMutation = useCustomMutation(api.comments.modify.delete, {
    message: {
      onSuccess: 'Successfully deleted comment!',
      useResponseErrorMessage: true,
    },
    invalidateQueryKey: ['ticketComments'],
  });

  const handleCommentDelete = () => deleteMutation.mutateAsync({ commentId: id });

  return (
    <CommentWrapper>
      <CommentTitle>
        {ownerName}, {moment(created).format('DD.MM.YYYY HH:mm')}{' '}
        {updated && <span>(updated: {moment(updated).format('DD.MM.YYYY HH:mm')})</span>}
        <CommentButtons>
          <FontAwesomeIcon icon={faPen} onClick={() => setShowModal(true)} />
          <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleCommentDelete()} />
        </CommentButtons>
      </CommentTitle>
      <CommentContent>{content}</CommentContent>
      {attachments && (
        <CommentAttachments>
          {attachments.map((attachment) => (
            <Image key={attachment.title} width={50} src={apiUrls.attachments.index(attachment.path)} />
          ))}
        </CommentAttachments>
      )}
      <Modal title='Modify comment' open={showModal} onOk={() => form.submit()} onCancel={() => setShowModal(false)}>
        <ModifyCommentForm comment={commentData} form={form} setShowModal={setShowModal} />
      </Modal>
    </CommentWrapper>
  );
};
