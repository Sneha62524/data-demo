import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Student Placement Portal
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Connecting talented students with leading companies
          </p>

          {!isAuthenticated ? (
            <div className="flex justify-center gap-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-3">
                Get Started
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-3">
                Sign In
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link
                to={
                  user?.role === 'student'
                    ? '/student/dashboard'
                    : user?.role === 'company'
                    ? '/company/dashboard'
                    : '/admin/dashboard'
                }
                className="btn-primary text-lg px-8 py-3"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">For Students</h3>
            <p className="text-gray-600 mb-4">
              Create your profile, showcase your skills, and apply to exciting job opportunities
              from top companies.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Build comprehensive profile</li>
              <li>✓ Browse job listings</li>
              <li>✓ Track applications</li>
              <li>✓ Get hired by top companies</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">For Companies</h3>
            <p className="text-gray-600 mb-4">
              Post job openings, review applications, and find the perfect candidates for your
              organization.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Post job opportunities</li>
              <li>✓ Review student profiles</li>
              <li>✓ Manage applications</li>
              <li>✓ Hire talented students</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">For Administrators</h3>
            <p className="text-gray-600 mb-4">
              Manage the entire placement process, approve companies, and monitor placement
              statistics.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Approve company registrations</li>
              <li>✓ Manage users</li>
              <li>✓ View statistics</li>
              <li>✓ Oversee placements</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">1000+</div>
              <p className="text-gray-600">Students Registered</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <p className="text-gray-600">Companies</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">2000+</div>
              <p className="text-gray-600">Job Postings</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
