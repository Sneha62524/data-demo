import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Job from '../models/Job';
import Company from '../models/Company';

export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOne({ userId: req.user?.userId });
    if (!company) {
      res.status(404).json({ message: 'Company profile not found' });
      return;
    }

    const job = new Job({
      companyId: company._id,
      ...req.body
    });

    await job.save();

    res.status(201).json({
      message: 'Job posted successfully',
      job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, jobType, department } = req.query;
    
    const filter: any = { isActive: true };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (jobType) {
      filter.jobType = jobType;
    }
    
    if (department) {
      filter['eligibility.departments'] = department;
    }

    const jobs = await Job.find(filter)
      .populate('companyId', 'companyName location industry')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJobById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('companyId', 'companyName location industry website description');

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCompanyJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOne({ userId: req.user?.userId });
    if (!company) {
      res.status(404).json({ message: 'Company profile not found' });
      return;
    }

    const jobs = await Job.find({ companyId: company._id }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error('Get company jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOne({ userId: req.user?.userId });
    if (!company) {
      res.status(404).json({ message: 'Company profile not found' });
      return;
    }

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, companyId: company._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    res.json({
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOne({ userId: req.user?.userId });
    if (!company) {
      res.status(404).json({ message: 'Company profile not found' });
      return;
    }

    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      companyId: company._id
    });

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
