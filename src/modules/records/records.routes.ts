import { Router } from 'express';
import recordsController from './records.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/search', authenticateToken, recordsController.searchRecords);

export default router;