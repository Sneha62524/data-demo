import mongoose, { Schema, Document } from 'mongoose';
import { ICompany } from '../types';

export interface ICompanyDocument extends ICompany, Document {}

const CompanySchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  }
});

export default mongoose.model<ICompanyDocument>('Company', CompanySchema);
