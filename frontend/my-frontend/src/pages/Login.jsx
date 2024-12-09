import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi';  // Import the loginUser API function
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle the form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the loginUser API function
      const userData = { email, password };
      const response = await loginUser(userData);

      // If login is successful, store the JWT token and navigate to the dashboard
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      setErrorMessage(''); // Clear any previous error messages
      navigate('/profile'); // Navigate to the dashboard or other route after login
    } catch (error) {
      // If login fails (e.g., incorrect credentials), display an error message
      setErrorMessage(error.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Lock className="h-12 w-12 text-blue-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Sign in to continue to your dashboard
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600 transition duration-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-600 text-center mt-3">{errorMessage}</div>
            )}

            {/* Forgot Password Link */}
            <div className="text-right">
              <a 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
            >
              <span className="font-medium">Sign In</span>
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account? {' '}
            <a 
              href="/register" 
              className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
