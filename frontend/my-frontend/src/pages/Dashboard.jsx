import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        <h1 className="text-center display-4 text-primary mb-5">Welcome to Your Dashboard</h1>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-lg h-100 transform-hover">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-folder-plus text-success me-3 fs-2"></i>
                  <h5 className="card-title mb-0 text-dark">Your Projects</h5>
                </div>
                <p className="card-text text-muted flex-grow-1">
                  Comprehensive project management with advanced tracking and insights.
                </p>
                <a href="/projects" className="btn btn-success mt-auto">
                  View Projects
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-lg h-100 transform-hover">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-plus-circle text-primary me-3 fs-2"></i>
                  <h5 className="card-title mb-0 text-dark">Create New Project</h5>
                </div>
                <p className="card-text text-muted flex-grow-1">
                  Streamline your workflow by adding and tracking new projects effortlessly.
                </p>
                <a href="/projects/new" className="btn btn-primary mt-auto">
                  Add Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .transform-hover {
          transition: transform 0.3s ease-in-out;
        }
        .transform-hover:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;