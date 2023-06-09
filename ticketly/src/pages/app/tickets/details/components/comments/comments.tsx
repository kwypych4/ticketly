import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Modal } from 'antd';
import { PrivateWrapper } from 'components';
import { useState } from 'react';
import { CommentsListTypes } from 'types';

import { AddCommentForm } from '../add-comment-form/add-comment-form';
import { CommentsContent, CommentsTitle, CommentsWrapper } from '.';
import { Comment } from './components/comment';

type CommentsProps = {
  comments: CommentsListTypes[];
};

export const Comments = ({ comments }: CommentsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  return (
    <CommentsWrapper>
      <CommentsTitle>
        <h2>Comments</h2>
        <PrivateWrapper privilegedRoles={['admin', 'engineer']}>
          <button onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
            Add comment
          </button>
        </PrivateWrapper>
      </CommentsTitle>
      <CommentsContent>
        {comments.map((comment) => (
          <Comment key={comment.id} commentData={comment} />
        ))}
      </CommentsContent>
      <Modal title='Add comment' open={showModal} onOk={() => form.submit()} onCancel={() => setShowModal(false)}>
        <AddCommentForm form={form} setShowModal={setShowModal} />
      </Modal>
    </CommentsWrapper>
  );
};
