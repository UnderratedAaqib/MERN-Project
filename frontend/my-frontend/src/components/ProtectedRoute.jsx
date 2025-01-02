import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for the JWT token
  
  if (!token) {
    // If no token is found, display "Access Denied" or redirect to login
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Access Denied</h1>
        <p>You must be logged in to access this page.</p>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go to Login
        </a>
      </div>
    );
  }
  
  return children; // Render the child component if authenticated
};

export default ProtectedRoute;
