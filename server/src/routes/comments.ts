import { comments } from 'controllers';
import express from 'express';

const router = express.Router();

router.patch('/:id', comments.updateComment);
router.delete('/:id', comments.deleteComment);

export const commentsRouter = router;
