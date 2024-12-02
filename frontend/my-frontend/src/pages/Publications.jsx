import React, { useState } from 'react';

const Publications = () => {
  const [publications, setPublications] = useState([
    // Example publication data
    { title: 'Research on AI', year: 2022, link: 'http://example.com' }
  ]);

  const addPublication = () => {
    setPublications([
      ...publications,
      { title: '', year: '', link: '' }
    ]);
  };

  const handleChange = (index, e) => {
    const updatedPublications = [...publications];
    updatedPublications[index][e.target.name] = e.target.value;
    setPublications(updatedPublications);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(publications);
    // Send data to the server or save locally
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Manage Publications</h2>
      <form onSubmit={handleSubmit}>
        {publications.map((publication, index) => (
          <div key={index} className="card mb-3 p-3">
            <div className="form-group mb-3">
              <label>Publication Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={publication.title}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Year</label>
              <input
                type="number"
                className="form-control"
                name="year"
                value={publication.year}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Link</label>
              <input
                type="url"
                className="form-control"
                name="link"
                value={publication.link}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addPublication}>Add Publication</button>
        <button type="submit" className="btn btn-primary w-100 mt-3">Save Publications</button>
      </form>
    </div>
  );
};

export default Publications;
