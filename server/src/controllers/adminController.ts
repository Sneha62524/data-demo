import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';
import Student from '../models/Student';
import Company from '../models/Company';
import Job from '../models/Job';
import Application from '../models/Application';

export const approveCompany = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isApproved: true },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      message: 'Company approved successfully',
      user
    });
  } catch (error) {
    console.error('Approve company error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const rejectCompany = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isApproved: false },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      message: 'Company rejected',
      user
    });
  } catch (error) {
    console.error('Reject company error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStatistics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ isActive: true });
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: 'pending' });
    const acceptedApplications = await Application.countDocuments({ status: 'accepted' });
    const pendingCompanies = await User.countDocuments({ role: 'company', isApproved: false });

    res.json({
      totalStudents,
      totalCompanies,
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
      acceptedApplications,
      pendingCompanies
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.role === 'student') {
      await Student.deleteOne({ userId: user._id });
    } else if (user.role === 'company') {
      await Company.deleteOne({ userId: user._id });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
