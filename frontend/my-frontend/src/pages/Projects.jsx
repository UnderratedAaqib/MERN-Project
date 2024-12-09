import React, { useState } from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([
    { name: 'AI for Healthcare', description: 'Research on AI applications in healthcare' },
  ]);

  const addProject = () => {
    setProjects([
      ...projects,
      { name: '', description: '' }
    ]);
  };

  const handleChange = (index, e) => {
    const updatedProjects = [...projects];
    updatedProjects[index][e.target.name] = e.target.value;
    setProjects(updatedProjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(projects);
    // Send data to the server or save locally
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Projects & Research Collaborations</h2>
      <form onSubmit={handleSubmit}>
        {projects.map((project, index) => (
          <div key={index} className="card project-card mb-3 p-4">
            <div className="form-group mb-3">
              <label>Project Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={project.name}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                rows="4"
                required
              ></textarea>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-between mb-3">
          <button type="button" className="btn btn-secondary" onClick={addProject}>
            Add Project
          </button>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save Projects
          </button>
        </div>
      </form>
    </div>
  );
};

export default Projects;
