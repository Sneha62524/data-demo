import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Student from '../models/Student';
import User from '../models/User';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const student = await Student.findOne({ userId: req.user?.userId });
    if (!student) {
      res.status(404).json({ message: 'Student profile not found' });
      return;
    }

    const user = await User.findById(req.user?.userId).select('-password');
    
    res.json({
      user,
      profile: student
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const student = await Student.findOneAndUpdate(
      { userId: req.user?.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!student) {
      res.status(404).json({ message: 'Student profile not found' });
      return;
    }

    res.json({
      message: 'Profile updated successfully',
      profile: student
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllStudents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const students = await Student.find().populate('userId', 'email');
    res.json(students);
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
