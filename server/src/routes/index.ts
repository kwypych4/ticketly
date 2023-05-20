import express from 'express';
import { verifyAccessToken, verifySession } from 'middlewares';

import { attachmentsRouter } from './attachments';
import { authRouter } from './auth';
import { commentsRouter } from './comments';
import { ticketsRouter } from './tickets';
import { usersRouter } from './users';

const router = express.Router();
router.use('/tickets', verifySession, verifyAccessToken, ticketsRouter);
router.use('/comments', verifySession, verifyAccessToken, commentsRouter);
router.use('/users', verifySession, verifyAccessToken, usersRouter);
router.use('/auth', authRouter);
router.use('/attachments', attachmentsRouter);

export const routes = router;
