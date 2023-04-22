import { users } from 'controllers';
import express from 'express';

const router = express.Router();

router.get('/', users.getUsers);

router.get('/:id', users.getOneUser);

router.delete('/:id', users.deleteUser);

router.patch('/:id', users.updateUser);

export const usersRouter = router;
