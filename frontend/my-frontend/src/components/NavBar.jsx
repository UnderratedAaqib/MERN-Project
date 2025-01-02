import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { logout } from '../api/authApi'; // Import the logout function

const Navbar = () => {
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    logout(); // Clear token and session-related data
    navigate('/'); // Redirect to the login page after logging out
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">Portfolio Helper</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link> {/* Add link to Profile */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/publications">Publications</Link> {/* Add link to Publications */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teaching">Teaching</Link> {/* Add link to Teaching */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/conferencetalks">Conference Talks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/photogallery">Photo Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactnetworking">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pdf">Download as PDF</Link>
            </li>
            <li className="nav-item">
              {/* Change Logout from Link to a Button */}
              <button 
                className="nav-link btn btn-link" 
                onClick={handleLogout} 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
