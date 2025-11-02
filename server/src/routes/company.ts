import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getProfile, updateProfile, getAllCompanies } from '../controllers/companyController';

const router = express.Router();

router.get('/profile', authenticate, authorize('company'), getProfile);
router.put('/profile', authenticate, authorize('company'), updateProfile);
router.get('/all', authenticate, authorize('admin', 'student'), getAllCompanies);

export default router;
