import express from 'express';
import { verifyAccessToken, verifySession } from 'middlewares';

import { authRouter } from './auth';
import { commentsRouter } from './comments';
import { ticketsRouter } from './tickets';
import { usersRouter } from './users';

const router = express.Router();

router.use('/tickets', ticketsRouter);
router.use('/comments', verifySession, verifyAccessToken, commentsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export const routes = router;
