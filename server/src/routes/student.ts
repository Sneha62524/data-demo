import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getProfile, updateProfile, getAllStudents } from '../controllers/studentController';

const router = express.Router();

router.get('/profile', authenticate, authorize('student'), getProfile);
router.put('/profile', authenticate, authorize('student'), updateProfile);
router.get('/all', authenticate, authorize('admin', 'company'), getAllStudents);

export default router;
