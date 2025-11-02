import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  applyForJob,
  getStudentApplications,
  getJobApplications,
  updateApplicationStatus,
  getAllApplications
} from '../controllers/applicationController';

const router = express.Router();

router.post('/', authenticate, authorize('student'), applyForJob);
router.get('/student', authenticate, authorize('student'), getStudentApplications);
router.get('/job/:jobId', authenticate, authorize('company'), getJobApplications);
router.put('/:id/status', authenticate, authorize('company', 'admin'), updateApplicationStatus);
router.get('/all', authenticate, authorize('admin'), getAllApplications);

export default router;
