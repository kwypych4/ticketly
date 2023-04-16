import express from 'express';

import { authRouter } from './auth';
import { ticketsRouter } from './tickets';
import { usersRouter } from './users';

const router = express.Router();

router.use('/tickets', ticketsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export const routes = router;
