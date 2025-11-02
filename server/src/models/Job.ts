import mongoose, { Schema, Document } from 'mongoose';
import { IJob } from '../types';

export interface IJobDocument extends IJob, Document {}

const JobSchema: Schema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String
  }],
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship'],
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  skills: [{
    type: String
  }],
  eligibility: {
    minCGPA: {
      type: Number,
      default: 0
    },
    graduationYears: [Number],
    departments: [String]
  },
  deadline: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IJobDocument>('Job', JobSchema);
