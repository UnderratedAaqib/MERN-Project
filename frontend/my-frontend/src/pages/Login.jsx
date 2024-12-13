import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi';  // Import the loginUser API function
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import '../styles/Login.css';  // Import the CSS file for styling

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
    <div className="app-container">

      <div className="main-content">
        <div className="card">
          <div className="logo-container">
            <Lock className="logo" />
          </div>

          <h2 className="heading">Welcome Back</h2>
          <p className="subheading">Sign in to continue to your dashboard</p>

          <form onSubmit={handleSubmit} className="form">
            {/* Email Input */}
            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            {/* Forgot Password Link */}
            <div className="forgot-password">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              <span>Sign In</span>
            </button>
          </form>

          {/* Register Link */}
          <p className="register-link">
            Don't have an account? {' '}
            <a href="/register">Create an account</a>
          </p>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
