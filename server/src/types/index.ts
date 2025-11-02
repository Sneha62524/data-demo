export interface IUser {
  email: string;
  password: string;
  role: 'student' | 'company' | 'admin';
  isApproved: boolean;
  createdAt?: Date;
}

export interface IStudent {
  userId: string;
  fullName: string;
  phone: string;
  rollNumber: string;
  department: string;
  graduationYear: number;
  cgpa: number;
  skills: string[];
  resume?: string;
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: number;
    percentage: number;
  }[];
}

export interface ICompany {
  userId: string;
  companyName: string;
  industry: string;
  website: string;
  description: string;
  location: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}

export interface IJob {
  companyId: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Internship';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  skills: string[];
  eligibility: {
    minCGPA: number;
    graduationYears: number[];
    departments: string[];
  };
  deadline: Date;
  isActive: boolean;
  createdAt?: Date;
}

export interface IApplication {
  jobId: string;
  studentId: string;
  coverLetter: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt?: Date;
  updatedAt?: Date;
}
