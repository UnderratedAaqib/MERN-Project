import React from 'react';

const ProjectList = () => {
  const projects = [
    { id: 1, name: 'Portfolio Website', description: 'A website to showcase my portfolio.' },
    { id: 2, name: 'Task Manager', description: 'An app to manage daily tasks.' },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Projects</h2>
      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4 mb-4" key={project.id}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.description}</p>
                <a href={`/projects/${project.id}/edit`} className="btn btn-warning">
                  Edit
                </a>
                <button className="btn btn-danger ms-2">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
