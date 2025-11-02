import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types';

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'company', 'admin'],
    required: true
  },
  isApproved: {
    type: Boolean,
    default: function() {
      return this.role === 'student' || this.role === 'admin';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IUserDocument>('User', UserSchema);
