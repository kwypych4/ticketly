import { users } from 'controllers';
import express from 'express';
import { verifyRole } from 'middlewares/verify-role';

const router = express.Router();

router.get('/', verifyRole(['engineer', 'admin']), users.getUsers);

router.get('/filters', verifyRole(['engineer', 'admin']), users.getUsersFilters);

router.get('/:id', verifyRole(['admin']), users.getOneUser);

router.post('/', verifyRole(['admin']), users.createUser);

router.delete('/:id', verifyRole(['admin']), users.deleteUser);

router.patch('/', verifyRole(['admin', 'engineer', 'user']), users.updateUserTheme);
router.patch('/:id', verifyRole(['admin']), users.updateUser);

export const usersRouter = router;
