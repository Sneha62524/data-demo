import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Application from '../models/Application';
import Student from '../models/Student';
import Job from '../models/Job';
import Company from '../models/Company';

export const applyForJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const student = await Student.findOne({ userId: req.user?.userId });
    if (!student) {
      res.status(404).json({ message: 'Student profile not found' });
      return;
    }

    const job = await Job.findById(req.body.jobId);
    if (!job || !job.isActive) {
      res.status(404).json({ message: 'Job not found or inactive' });
      return;
    }

    const existingApplication = await Application.findOne({
      jobId: req.body.jobId,
      studentId: student._id
    });

    if (existingApplication) {
      res.status(400).json({ message: 'Already applied to this job' });
      return;
    }

    const application = new Application({
      jobId: req.body.jobId,
      studentId: student._id,
      coverLetter: req.body.coverLetter
    });

    await application.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStudentApplications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const student = await Student.findOne({ userId: req.user?.userId });
    if (!student) {
      res.status(404).json({ message: 'Student profile not found' });
      return;
    }

    const applications = await Application.find({ studentId: student._id })
      .populate({
        path: 'jobId',
        populate: {
          path: 'companyId',
          select: 'companyName location'
        }
      })
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get student applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJobApplications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOne({ userId: req.user?.userId });
    if (!company) {
      res.status(404).json({ message: 'Company profile not found' });
      return;
    }

    const job = await Job.findOne({ _id: req.params.jobId, companyId: company._id });
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('studentId')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateApplicationStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    res.json({
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllApplications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const applications = await Application.find()
      .populate('studentId')
      .populate({
        path: 'jobId',
        populate: {
          path: 'companyId',
          select: 'companyName'
        }
      })
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
