import React, { useState } from 'react';

const Teaching = () => {
  const [courses, setCourses] = useState([
    { title: 'Introduction to Programming', syllabus: '' }
  ]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { title: '', syllabus: '' }
    ]);
  };

  const handleChange = (index, e) => {
    const updatedCourses = [...courses];
    updatedCourses[index][e.target.name] = e.target.value;
    setCourses(updatedCourses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(courses);
    // Send data to the server or save locally
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Teaching Portfolio</h2>
      <form onSubmit={handleSubmit}>
        {courses.map((course, index) => (
          <div key={index} className="card mb-3 p-3">
            <div className="form-group mb-3">
              <label>Course Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={course.title}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Syllabus</label>
              <textarea
                className="form-control"
                name="syllabus"
                value={course.syllabus}
                onChange={(e) => handleChange(index, e)}
                rows="4"
              ></textarea>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addCourse}>Add Course</button>
        <button type="submit" className="btn btn-primary w-100 mt-3">Save Courses</button>
      </form>
    </div>
  );
};

export default Teaching;
