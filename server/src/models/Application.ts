import mongoose, { Schema, Document } from 'mongoose';
import { IApplication } from '../types';

export interface IApplicationDocument extends IApplication, Document {}

const ApplicationSchema: Schema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'rejected', 'accepted'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ApplicationSchema.index({ jobId: 1, studentId: 1 }, { unique: true });

export default mongoose.model<IApplicationDocument>('Application', ApplicationSchema);
