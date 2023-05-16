import express from 'express';
import { verifyAccessToken, verifySession } from 'middlewares';
import { verifyRole } from 'middlewares/verify-role';

import { authRouter } from './auth';
import { commentsRouter } from './comments';
import { ticketsRouter } from './tickets';
import { usersRouter } from './users';

const router = express.Router();
// TODO: set proper middlewares
// router.use('/tickets', verifySession, ticketsRouter);
router.use('/tickets', verifySession, verifyAccessToken, verifyRole(['user', 'engineer', 'admin']), ticketsRouter);
// router.use('/comments', verifySession, verifyAccessToken, commentsRouter);
router.use('/comments', commentsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export const routes = router;
