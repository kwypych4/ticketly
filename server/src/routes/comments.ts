import { comments } from 'controllers';
import express from 'express';
import { verifyRole } from 'middlewares/verify-role';

const router = express.Router();

router.patch('/:id', comments.updateComment);
router.delete('/:id', verifyRole(['admin']), comments.deleteComment);

export const commentsRouter = router;
