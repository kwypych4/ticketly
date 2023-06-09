import { auth } from 'controllers';
import express from 'express';

const router = express.Router();

router.get('/login', auth.checkLogin);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/logout_all', auth.logoutAll);
router.get('/access_token', auth.newAccessToken);
router.post('/refresh_token', auth.newRefreshToken);

export const authRouter = router;
