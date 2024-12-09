import React from 'react';
import { Link } from 'react-router-dom';  // Make sure you're using Link from react-router-dom

const Navbar = () => {
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
              <Link className="nav-link" to="/mediacoverage">Media Coverage</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/photogallery">Photo Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactnetworking">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/analyticsdashboard">Analytics</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
