import { Image } from 'antd';
import moment from 'moment';
import { CommentsListTypes } from 'types';

import { CommentAttachments, CommentContent, CommentTitle, CommentWrapper } from '.';

type CommentProps = {
  commentData: CommentsListTypes;
};
export const Comment = ({ commentData }: CommentProps) => {
  const { content, ownerName, attachments, created, updated } = commentData;
  return (
    <CommentWrapper>
      <CommentTitle>
        {ownerName}, {moment(created).format('DD.MM.YYYY HH:MM')}{' '}
        {updated !== created || <span>(updated: {moment(updated).format('DD.MM.YYYY HH:MM')})</span>}
      </CommentTitle>
      <CommentContent>{content}</CommentContent>
      {attachments && (
        <CommentAttachments>
          {attachments.map((attachment) => (
            <Image
              key={attachment.title}
              width={50}
              src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            />
          ))}
        </CommentAttachments>
      )}
    </CommentWrapper>
  );
};
