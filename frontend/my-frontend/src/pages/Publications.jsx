import React, { useState, useEffect } from 'react';
import { addPublication, getUserPublications, updatePublication, deletePublication } from '../api/userApi';
import '../styles/Publications.css';  // Import the Publications CSS

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user publications when component mounts
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await getUserPublications(); // Fetch the publications from the API
        setPublications(response.publications || []);
      } catch (err) {
        setError('Error fetching publications');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  // Add a new publication (empty form)
  const addPublicationHandler = () => {
    setPublications(prevPublications => [
      ...prevPublications,
      { title: '', year: '', link: '', _id: null } // Empty but correctly structured publication
    ]);
  };

  // Handle input changes in the publication form
  const handleChange = (index, e) => {
    const updatedPublications = [...publications];
    const publication = updatedPublications[index]; 

    if (publication) {
      publication[e.target.name] = e.target.value;
      setPublications(updatedPublications);
    }
  };

  // Submit the updated or new publication
  const handleSubmit = async (e, index) => {
    e.preventDefault();

    const publication = publications[index];

    if (publication._id) {
      // Handle updating existing publication
      try {
        const updatedPublicationData = {
          publicationId: publication._id,
          title: publication.title,
          year: publication.year,
          link: publication.link,
        };
        const response = await updatePublication(updatedPublicationData);
        const updatedPublication = response.publication || response;

        setPublications(prevPublications =>
          prevPublications.map((pub, i) => 
            i === index ? { ...pub, ...updatedPublication, _id: publication._id } : pub
          )
        );
        alert('Publication updated successfully');
      } catch (err) {
        setError('Error updating publication');
      }
    } else {
      // Handle adding new publication
      try {
        const response = await addPublication(publication);
        const newlyAddedPublication = response.publication || response; 

        setPublications(prevPublications => 
          prevPublications.map(pub => 
            pub === publication ? newlyAddedPublication : pub
          )
        );
        alert('Publication added successfully');
      } catch (err) {
        setError('Error adding publication');
      }
    }
  };

  // Handle publication deletion
  const handleDelete = async (index) => {
    const publication = publications[index];

    try {
      await deletePublication(publication._id); // Delete the publication via API
      setPublications(prevPublications =>
        prevPublications.filter((pub, i) => i !== index) // Remove the publication from the state
      );
      alert('Publication deleted successfully');
    } catch (err) {
      setError('Error deleting publication');
    }
  };

  if (loading) {
    return <div className="loading">Loading publications...</div>;
  }

  return (
    <div className="publications-container">

      <div className="publications-main">
        {error && <div className="error-message">{error}</div>}

        <form className="publications-form">
          {publications.map((publication, index) => (
            <div key={index} className="publication-card">
              <div className="form-group">
                <label>Publication Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={publication?.title || ''}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  className="form-control"
                  name="year"
                  value={publication?.year || ''}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Link</label>
                <input
                  type="url"
                  className="form-control"
                  name="link"
                  value={publication?.link || ''}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>

              <div className="buttons">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(e, index)}
                >
                  {publication?._id ? 'Update Publication' : 'Add Publication'}
                </button>

                {publication?._id && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
          
          <button type="button" className="btn btn-secondary" onClick={addPublicationHandler}>
            Add Publication
          </button>
        </form>
      </div>

      
    </div>
  );
};

export default Publications;
