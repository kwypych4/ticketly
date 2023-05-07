import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommentsListTypes } from 'types';

import { CommentsContent, CommentsTitle, CommentsWrapper } from '.';
import { Comment } from './components/comment';

type CommentsProps = {
  comments: CommentsListTypes[];
};

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <CommentsWrapper>
      <CommentsTitle>
        <h2>Comments</h2>
        <button>
          <FontAwesomeIcon icon={faPlus} />
          Add comment
        </button>
      </CommentsTitle>
      <CommentsContent>
        {comments.map((comment) => (
          <Comment key={comment.id} commentData={comment} />
        ))}
      </CommentsContent>
    </CommentsWrapper>
  );
};
