import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  approveCompany,
  rejectCompany,
  getAllUsers,
  getStatistics,
  deleteUser
} from '../controllers/adminController';

const router = express.Router();

router.put('/approve/:userId', authenticate, authorize('admin'), approveCompany);
router.put('/reject/:userId', authenticate, authorize('admin'), rejectCompany);
router.get('/users', authenticate, authorize('admin'), getAllUsers);
router.get('/statistics', authenticate, authorize('admin'), getStatistics);
router.delete('/users/:userId', authenticate, authorize('admin'), deleteUser);

export default router;
