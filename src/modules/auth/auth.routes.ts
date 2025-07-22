import { Router } from 'express';
import authController from './auth.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/me', authenticateToken, authController.me);

export default router;