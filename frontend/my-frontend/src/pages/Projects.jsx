import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';
import { getProjects, addProject, deleteProject } from '../api/userApi'; // Import API calls

const Projects = () => {
  const [projects, setProjects] = useState([]); // State for projects
  const [newProject, setNewProject] = useState({ name: '', affiliation: '', description: '' }); // State for a new project
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch projects associated with the current user on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userProjects = await getProjects();
        setProjects(userProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle adding a new project
  const handleAddProject = async () => {
    if (!newProject.name.trim() || !newProject.affiliation.trim() || !newProject.description.trim()) {
      console.error('All fields are required.');
      return;
    }

    try {
      const addedProject = await addProject(newProject); // API call to add project
      setProjects([...projects, addedProject]); // Add new project to the state
      setNewProject({ name: '', affiliation: '', description: '' }); // Reset new project fields
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  // Handle deleting a project
  const handleDeleteProject = async (projectId, index) => {
    try {
      await deleteProject(projectId); // API call to delete project
      const updatedProjects = projects.filter((_, idx) => idx !== index);
      setProjects(updatedProjects); // Update the state
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div>Loading projects...</div>; // Show a loading message while fetching projects
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Projects & Research Collaborations</h2>

      {/* Display existing projects */}
      {projects.map((project, index) => (
        <div key={project._id} className="card project-card mb-3 p-4">
          <div className="form-group mb-3">
            <label>Project Name</label>
            <input
              type="text"
              className="form-control"
              value={project.name}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <label>Affiliation</label>
            <input
              type="text"
              className="form-control"
              value={project.affiliation}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              value={project.description}
              readOnly
              rows="4"
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => handleDeleteProject(project._id, index)}
          >
            Delete Project
          </button>
        </div>
      ))}

      {/* Form to add a new project */}
      <div className="card project-card mb-3 p-4">
        <div className="form-group mb-3">
          <label>Project Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter project name"
            value={newProject.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Affiliation</label>
          <input
            type="text"
            className="form-control"
            name="affiliation"
            placeholder="Enter affiliation"
            value={newProject.affiliation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            placeholder="Enter project description"
            value={newProject.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary mt-2"
          onClick={handleAddProject}
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default Projects;
