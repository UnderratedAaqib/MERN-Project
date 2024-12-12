import React, { useState, useEffect } from 'react';
import { addCourse, deleteCourse, getCourses } from '../api/userApi'; // Import getCourses

const Teaching = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });

  useEffect(() => {
    getCourses().then(data => {
      setCourses(data);  // Assume the data is the array of courses
    }).catch(error => {
      console.error('Error loading courses:', error);
    });
  }, []);  // Empty dependency array ensures this only runs once on mount

  const addNewCourse = () => {
    if (!newCourse.title.trim() || !newCourse.description.trim()) {
      console.error('Both title and description are required.');
      return;
    }
    addCourse(newCourse)
      .then(response => {
        setCourses([...courses, response.data]); // Assuming the response includes the course
        setNewCourse({ title: '', description: '' }); // Reset new course input
      })
      .catch(error => console.error('Error adding course:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (courseId, index) => {
    deleteCourse(courseId)
      .then(() => {
        const updatedCourses = courses.filter((_, idx) => idx !== index); // More reliable deletion
        setCourses(updatedCourses);
      })
      .catch(error => console.error('Failed to delete course:', error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Teaching Portfolio</h2>
      {courses.map((course, index) => (
        <div key={index} className="card mb-3 p-3">
          <h4>{course.title}</h4>
          <p>{course.description}</p>
          <button type="button" className="btn btn-danger" onClick={() => handleDelete(course._id, index)}>Delete Course</button>
        </div>
      ))}
      <div>
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="Enter course title"
          value={newCourse.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-control"
          name="description"
          placeholder="Enter course description"
          value={newCourse.description}
          onChange={handleChange}
          rows="4"
        ></textarea>
        <button type="button" className="btn btn-secondary" onClick={addNewCourse}>Add Course</button>
      </div>
    </div>
  );
};

export default Teaching;
