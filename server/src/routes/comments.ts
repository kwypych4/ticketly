import { comments } from 'controllers';
import express from 'express';
import { uploadFile } from 'middlewares';
import { verifyRole } from 'middlewares/verify-role';

const router = express.Router();

router.get('/:ticketId', verifyRole(['user', 'engineer', 'admin']), comments.getComments);
router.post(
  '/:ticketId',
  verifyRole(['engineer', 'admin']),
  uploadFile({ apiKeyName: 'attachments' }),
  comments.createComment
);
router.patch('/:id', verifyRole(['engineer', 'admin']), comments.updateComment);
router.delete('/:id', verifyRole(['admin']), comments.deleteComment);

export const commentsRouter = router;
