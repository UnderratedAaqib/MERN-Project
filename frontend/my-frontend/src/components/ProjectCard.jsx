import React from 'react';
import './styles/ProjectCard.css';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="card project-card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{project.name}</h5>
        <p className="card-text">{project.description}</p>
        <button className="btn btn-warning me-2" onClick={() => onEdit(project.id)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(project.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
