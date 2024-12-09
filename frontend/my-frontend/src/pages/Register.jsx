import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userApi'; // Import the registerUser API function

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the registerUser API function
      const userData = { name, email, password };
      const response = await registerUser(userData);

      // If registration is successful, navigate to login page or home
      setSuccessMessage('User registered successfully!');
      setErrorMessage('');
      console.log(response.data);
      
      // You can navigate to the login page after successful registration
      navigate('/'); // You can redirect the user to the login page or home page
    } catch (error) {
      // If an error occurs (like user already exists), display an error message
      setErrorMessage(error.response?.data?.message || 'Something went wrong!');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          {/* Email */}
          <div className="form-group mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Password */}
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>

        {/* Success or Error message */}
        {successMessage && <div className="mt-3 text-success">{successMessage}</div>}
        {errorMessage && <div className="mt-3 text-danger">{errorMessage}</div>}

        {/* Link to login page */}
        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
