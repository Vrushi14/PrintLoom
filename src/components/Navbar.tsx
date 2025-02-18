import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Printer, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Printer className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">PrintLoom</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/prints" className="text-gray-700 hover:text-blue-600">Prints</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <User className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};