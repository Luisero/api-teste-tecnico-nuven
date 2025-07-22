import { Router } from 'express';
import { authenticateToken } from '../../middlewares/auth.middleware';
import upload from '../../config/multer';
import datasetsController from './datasets.controller';
import recordsController from '../records/records.controller'; 


const logRequestDetails = (req: any, res: any, next: any) => {
  console.log('--- INCOMING REQUEST DETAILS ---');
  console.log('METHOD:', req.method);
  console.log('URL:', req.originalUrl);
  console.log('HEADERS:', req.headers);
  console.log('------------------------------');
  next();
};
const router = Router();
router.get('/', authenticateToken, datasetsController.listUserDatasets);

router.get('/:id/records', authenticateToken, recordsController.listFromDataset);

router.post(
  '/upload',
  logRequestDetails, // <-- Nosso "espião" vem primeiro
  authenticateToken,
  upload.single('file'),
  datasetsController.uploadDataset
);
export default router;