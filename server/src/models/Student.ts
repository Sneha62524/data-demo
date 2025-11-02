import mongoose, { Schema, Document } from 'mongoose';
import { IStudent } from '../types';

export interface IStudentDocument extends IStudent, Document {}

const StudentSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  graduationYear: {
    type: Number,
    required: true
  },
  cgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  skills: [{
    type: String
  }],
  resume: {
    type: String
  },
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String
  }],
  education: [{
    degree: String,
    institution: String,
    year: Number,
    percentage: Number
  }]
});

export default mongoose.model<IStudentDocument>('Student', StudentSchema);
