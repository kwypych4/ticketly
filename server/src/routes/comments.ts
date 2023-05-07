import { comments } from 'controllers';
import express from 'express';
import { uploadFile } from 'middlewares';
import { verifyRole } from 'middlewares/verify-role';

const router = express.Router();

router.get('/:ticketId', comments.getComments);
router.post('/:ticketId', uploadFile({ apiKeyName: 'attachments' }), comments.createComment);
router.patch('/:id', comments.updateComment);
router.delete('/:id', verifyRole(['admin']), comments.deleteComment);

export const commentsRouter = router;
