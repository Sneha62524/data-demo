export interface User {
  id: string;
  email: string;
  role: 'student' | 'company' | 'admin';
  isApproved: boolean;
}

export interface Student {
  _id?: string;
  userId: string;
  fullName: string;
  phone: string;
  rollNumber: string;
  department: string;
  graduationYear: number;
  cgpa: number;
  skills: string[];
  resume?: string;
  projects: Project[];
  education: Education[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
  percentage: number;
}

export interface Company {
  _id?: string;
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

export interface Job {
  _id?: string;
  companyId: string | Company;
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
  deadline: string;
  isActive: boolean;
  createdAt?: string;
}

export interface Application {
  _id?: string;
  jobId: string | Job;
  studentId: string | Student;
  coverLetter: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface Statistics {
  totalStudents: number;
  totalCompanies: number;
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  pendingCompanies: number;
}
