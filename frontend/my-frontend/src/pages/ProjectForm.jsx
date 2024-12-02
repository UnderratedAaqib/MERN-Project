import React, { useState } from 'react';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ name, description });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add/Edit Project</h2>
      <div className="card p-4 shadow">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Project Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success">
            Save Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
