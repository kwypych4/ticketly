import { users } from 'controllers';
import express from 'express';

const router = express.Router();

router.get('/', users.getUsers);

router.get('/filters', users.getUsersFilters);

router.get('/:id', users.getOneUser);

router.post('/', users.createUser);

router.delete('/:id', users.deleteUser);

router.patch('/:id', users.updateUser);

export const usersRouter = router;
