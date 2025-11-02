import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Statistics } from '../types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await api.get('/admin/statistics');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-primary-600">{stats?.totalStudents || 0}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Companies</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.totalCompanies || 0}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Active Jobs</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.activeJobs || 0}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-purple-600">{stats?.totalApplications || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending</span>
              <span className="text-xl font-bold text-yellow-600">
                {stats?.pendingApplications || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Accepted</span>
              <span className="text-xl font-bold text-green-600">
                {stats?.acceptedApplications || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Approvals</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Approval</span>
              <span className="text-xl font-bold text-orange-600">
                {stats?.pendingCompanies || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Jobs Posted</span>
              <span className="text-xl font-bold text-blue-600">{stats?.totalJobs || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Users</h3>
          <p className="text-gray-600 mb-4">View and manage all registered users</p>
          <a href="/admin/users" className="text-primary-600 hover:text-primary-700 font-medium">
            Go to Users →
          </a>
        </div>

        <div className="card hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Approve Companies</h3>
          <p className="text-gray-600 mb-4">Review and approve company registrations</p>
          <a href="/admin/companies" className="text-primary-600 hover:text-primary-700 font-medium">
            Go to Companies →
          </a>
        </div>

        <div className="card hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">View Applications</h3>
          <p className="text-gray-600 mb-4">Monitor all job applications</p>
          <a href="/admin/applications" className="text-primary-600 hover:text-primary-700 font-medium">
            Go to Applications →
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
