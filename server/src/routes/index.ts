import express from 'express';
import { verifyAccessToken, verifySession } from 'middlewares';

import { authRouter } from './auth';
import { ticketsRouter } from './tickets';
import { usersRouter } from './users';

const router = express.Router();

router.use('/tickets', verifySession, verifyAccessToken, ticketsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export const routes = router;
