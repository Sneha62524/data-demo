import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type { Student, Application } from '../types';

const StudentDashboard: React.FC = () => {
  const [profile, setProfile] = useState<Student | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, applicationsRes] = await Promise.all([
        api.get('/students/profile'),
        api.get('/applications/student'),
      ]);
      setProfile(profileRes.data.profile);
      setApplications(applicationsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Applications</h3>
          <p className="text-4xl font-bold text-primary-600">{applications.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending</h3>
          <p className="text-4xl font-bold text-yellow-600">
            {applications.filter((a) => a.status === 'pending').length}
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Shortlisted</h3>
          <p className="text-4xl font-bold text-green-600">
            {applications.filter((a) => a.status === 'shortlisted').length}
          </p>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Information</h2>
        {profile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="text-lg font-medium">{profile.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Roll Number</p>
              <p className="text-lg font-medium">{profile.rollNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Department</p>
              <p className="text-lg font-medium">{profile.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">CGPA</p>
              <p className="text-lg font-medium">{profile.cgpa}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Graduation Year</p>
              <p className="text-lg font-medium">{profile.graduationYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-lg font-medium">{profile.phone}</p>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Applications</h2>
        {applications.length === 0 ? (
          <p className="text-gray-600">No applications yet. Start applying to jobs!</p>
        ) : (
          <div className="space-y-4">
            {applications.slice(0, 5).map((application) => {
              const job = typeof application.jobId === 'object' ? application.jobId : null;
              const company = job && typeof job.companyId === 'object' ? job.companyId : null;
              
              return (
                <div key={application._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{job?.title || 'N/A'}</h3>
                      <p className="text-gray-600">{company?.companyName || 'N/A'}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Applied: {new Date(application.appliedAt || '').toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        application.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : application.status === 'shortlisted'
                          ? 'bg-green-100 text-green-800'
                          : application.status === 'accepted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
