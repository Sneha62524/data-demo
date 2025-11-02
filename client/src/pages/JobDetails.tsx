import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { Job } from '../types';

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setApplying(true);

    try {
      await api.post('/applications', {
        jobId: id,
        coverLetter,
      });
      setSuccess('Application submitted successfully!');
      setTimeout(() => navigate('/student/applications'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xl text-gray-600">Job not found</p>
      </div>
    );
  }

  const company = typeof job.companyId === 'object' ? job.companyId : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-primary-600 hover:text-primary-700"
      >
        ← Back to Jobs
      </button>

      <div className="card mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-xl text-gray-600">{company?.companyName || 'N/A'}</p>
          </div>
          <span className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-medium">
            {job.jobType}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Location</p>
            <p className="text-lg font-medium">{job.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Salary Range</p>
            <p className="text-lg font-medium">
              {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Application Deadline</p>
            <p className="text-lg font-medium">{new Date(job.deadline).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Requirements</h2>
          <ul className="list-disc list-inside space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Eligibility Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Minimum CGPA</p>
              <p className="text-lg font-medium">{job.eligibility.minCGPA}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Eligible Graduation Years</p>
              <p className="text-lg font-medium">{job.eligibility.graduationYears.join(', ')}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Eligible Departments</p>
              <p className="text-lg font-medium">{job.eligibility.departments.join(', ')}</p>
            </div>
          </div>
        </div>

        {company && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3">About the Company</h2>
            <p className="text-gray-700 mb-2">{company.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              <p className="text-sm">
                <span className="text-gray-600">Industry:</span>{' '}
                <span className="font-medium">{company.industry}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Website:</span>{' '}
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  {company.website}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply for this Position</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleApply}>
          <div className="mb-4">
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              required
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="input-field"
              rows={6}
              placeholder="Explain why you're a good fit for this position..."
            />
          </div>

          <button
            type="submit"
            disabled={applying}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {applying ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
