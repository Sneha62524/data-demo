import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  createJob,
  getAllJobs,
  getJobById,
  getCompanyJobs,
  updateJob,
  deleteJob
} from '../controllers/jobController';

const router = express.Router();

router.post('/', authenticate, authorize('company'), createJob);
router.get('/', authenticate, getAllJobs);
router.get('/company', authenticate, authorize('company'), getCompanyJobs);
router.get('/:id', authenticate, getJobById);
router.put('/:id', authenticate, authorize('company'), updateJob);
router.delete('/:id', authenticate, authorize('company'), deleteJob);

export default router;
