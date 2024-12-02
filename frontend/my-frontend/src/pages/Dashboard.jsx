import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to Your Dashboard</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Your Projects</h5>
              <p className="card-text">View and manage all your projects in one place.</p>
              <a href="/projects" className="btn btn-primary">
                View Projects
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Create New Project</h5>
              <p className="card-text">Easily add and track your new projects.</p>
              <a href="/projects/new" className="btn btn-success">
                Add Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
