import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Job } from '../types';

const CompanyDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs/company');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeJobs = jobs.filter((j) => j.isActive).length;
  const totalApplications = 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
        <Link to="/company/jobs/new" className="btn-primary">
          Post New Job
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Jobs</h3>
          <p className="text-4xl font-bold text-primary-600">{jobs.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Jobs</h3>
          <p className="text-4xl font-bold text-green-600">{activeJobs}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Applications</h3>
          <p className="text-4xl font-bold text-blue-600">{totalApplications}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Job Postings</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>
            <Link to="/company/jobs/new" className="btn-primary">
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Type:</span> {job.jobType}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {job.location}
                      </div>
                      <div>
                        <span className="font-medium">Deadline:</span>{' '}
                        {new Date(job.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link
                      to={`/company/jobs/${job._id}/applications`}
                      className="btn-secondary text-sm"
                    >
                      View Applications
                    </Link>
                    <Link
                      to={`/company/jobs/${job._id}/edit`}
                      className="btn-primary text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
