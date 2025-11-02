import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              PlacementPortal
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'student' && (
                  <>
                    <Link to="/student/dashboard" className="text-gray-700 hover:text-primary-600">
                      Dashboard
                    </Link>
                    <Link to="/student/jobs" className="text-gray-700 hover:text-primary-600">
                      Jobs
                    </Link>
                    <Link to="/student/applications" className="text-gray-700 hover:text-primary-600">
                      Applications
                    </Link>
                  </>
                )}

                {user?.role === 'company' && (
                  <>
                    <Link to="/company/dashboard" className="text-gray-700 hover:text-primary-600">
                      Dashboard
                    </Link>
                    <Link to="/company/jobs" className="text-gray-700 hover:text-primary-600">
                      My Jobs
                    </Link>
                    <Link to="/company/applications" className="text-gray-700 hover:text-primary-600">
                      Applications
                    </Link>
                  </>
                )}

                {user?.role === 'admin' && (
                  <>
                    <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary-600">
                      Dashboard
                    </Link>
                    <Link to="/admin/users" className="text-gray-700 hover:text-primary-600">
                      Users
                    </Link>
                    <Link to="/admin/companies" className="text-gray-700 hover:text-primary-600">
                      Companies
                    </Link>
                  </>
                )}

                <span className="text-gray-600">{user?.email}</span>
                <button onClick={handleLogout} className="btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
