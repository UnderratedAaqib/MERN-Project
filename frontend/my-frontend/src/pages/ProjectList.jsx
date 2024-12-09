import React from 'react';

const ProjectList = () => {
  const projects = [
    { id: 1, name: 'Portfolio Website', description: 'A website to showcase my portfolio.' },
    { id: 2, name: 'Task Manager', description: 'An app to manage daily tasks.' },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>Your Projects</h2>
      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4 mb-4" key={project.id}>
            <div className="card shadow-lg border-light" style={cardStyle}>
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
                  {project.name}
                </h5>
                <p className="card-text" style={{ fontSize: '1rem', color: '#555' }}>
                  {project.description}
                </p>
                <div className="d-flex justify-content-between">
                  <a href={`/projects/${project.id}/edit`} 
                     className="btn btn-warning" 
                     style={buttonStyle}>
                    Edit
                  </a>
                  <button className="btn btn-danger" 
                          style={deleteButtonStyle}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles for cards and buttons
const cardStyle = {
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: '8px',
  overflow: 'hidden',
};

const buttonStyle = {
  padding: '0.375rem 1.25rem',
  fontSize: '1rem',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

const deleteButtonStyle = {
  padding: '0.375rem 1.25rem',
  fontSize: '1rem',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
  marginLeft: '0.5rem',
};

export default ProjectList;
