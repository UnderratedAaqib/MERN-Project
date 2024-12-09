import React, { useState, useEffect } from 'react';
import { addPublication, getUserPublications, updatePublication, deletePublication } from '../api/userApi';

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user publications when component mounts
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await getUserPublications(); // Fetch the publications from the API
        console.log('Response from server:', response);
        setPublications(response.publications || []); // Access publications from response.data
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
    const publication = updatedPublications[index]; // Ensure we get the correct publication at this index

    if (publication) {
      publication[e.target.name] = e.target.value; // Update the value safely
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
      
      // Similar to add publication logic
      const updatedPublication = response.publication || response;

      setPublications(prevPublications =>
        prevPublications.map((pub, i) => 
          i === index 
            ? { 
                ...pub, 
                ...updatedPublication, // Spread the updated publication details
                _id: publication._id // Ensure _id remains consistent
              } 
            : pub
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
        console.log('Add publication response:', response); // Log the full response
  
        // Adjust this line based on your actual response structure
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
    return <div>Loading publications...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Manage Publications</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form>
        {publications.map((publication, index) => (
          <div key={index} className="card mb-3 p-3">
            <div className="form-group mb-3">
              <label>Publication Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={publication?.title || ''} // Default to empty string if title is undefined
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
                value={publication?.year || ''} // Default to empty string if year is undefined
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
                value={publication?.link || ''} // Default to empty string if link is undefined
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-warning"
              onClick={(e) => handleSubmit(e, index)}
            >
              {publication?._id ? 'Update Publication' : 'Add Publication'}
            </button>

            {/* Delete Button */}
            {publication?._id && (
              <button
                type="button"
                className="btn btn-danger ml-2"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            )}
          </div>
        ))}

        <button type="button" className="btn btn-secondary" onClick={addPublicationHandler}>
          Add Publication
        </button>
      </form>
    </div>
  );
};

export default Publications;
