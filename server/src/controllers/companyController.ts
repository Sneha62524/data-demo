import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Company from '../models/Company';
import User from '../models/User';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOne({ userId: req.user?.userId });
    if (!company) {
      res.status(404).json({ message: 'Company profile not found' });
      return;
    }

    const user = await User.findById(req.user?.userId).select('-password');
    
    res.json({
      user,
      profile: company
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOneAndUpdate(
      { userId: req.user?.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!company) {
      res.status(404).json({ message: 'Company profile not found' });
      return;
    }

    res.json({
      message: 'Profile updated successfully',
      profile: company
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllCompanies = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const companies = await Company.find().populate('userId', 'email isApproved');
    res.json(companies);
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
