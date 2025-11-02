import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

const Register: React.FC = () => {
  const [role, setRole] = useState<'student' | 'company'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    fullName: '',
    phone: '',
    rollNumber: '',
    department: '',
    graduationYear: new Date().getFullYear(),
    cgpa: 0,
  });

  const [companyData, setCompanyData] = useState({
    companyName: '',
    industry: '',
    website: '',
    description: '',
    location: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const profileData = role === 'student' ? studentData : companyData;
      const response = await authService.register({
        email,
        password,
        role,
        profileData,
      });

      login(response.token, response.user);

      if (role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/company/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am registering as
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    role === 'student'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('company')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    role === 'company'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Company
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field mt-1"
                />
              </div>
            </div>

            {role === 'student' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={studentData.fullName}
                      onChange={(e) => setStudentData({ ...studentData, fullName: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      required
                      value={studentData.phone}
                      onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                    <input
                      type="text"
                      required
                      value={studentData.rollNumber}
                      onChange={(e) => setStudentData({ ...studentData, rollNumber: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <input
                      type="text"
                      required
                      value={studentData.department}
                      onChange={(e) => setStudentData({ ...studentData, department: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                    <input
                      type="number"
                      required
                      value={studentData.graduationYear}
                      onChange={(e) => setStudentData({ ...studentData, graduationYear: parseInt(e.target.value) })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      required
                      value={studentData.cgpa}
                      onChange={(e) => setStudentData({ ...studentData, cgpa: parseFloat(e.target.value) })}
                      className="input-field mt-1"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      required
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Industry</label>
                    <input
                      type="text"
                      required
                      value={companyData.industry}
                      onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <input
                      type="url"
                      required
                      value={companyData.website}
                      onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      required
                      value={companyData.location}
                      onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      required
                      value={companyData.description}
                      onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                      className="input-field mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                    <input
                      type="text"
                      required
                      value={companyData.contactPerson}
                      onChange={(e) => setCompanyData({ ...companyData, contactPerson: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                    <input
                      type="email"
                      required
                      value={companyData.contactEmail}
                      onChange={(e) => setCompanyData({ ...companyData, contactEmail: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={companyData.contactPhone}
                      onChange={(e) => setCompanyData({ ...companyData, contactPhone: e.target.value })}
                      className="input-field mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
