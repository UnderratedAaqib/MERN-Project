import React, { useState, useEffect } from 'react';
import { getMediaArticles, addMediaArticle, deleteMediaArticle } from '../api/userApi'; // Import API functions

const MediaCoverage = () => {
  const [media, setMedia] = useState([]); // State to store media articles
  const [newMedia, setNewMedia] = useState({ title: "", description: "", link: "" }); // State for new article
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch media articles from the backend when the component mounts
  useEffect(() => {
    const fetchMediaArticles = async () => {
      try {
        const fetchedMedia = await getMediaArticles(); // Fetch media articles from the API
        console.log("Fetched media articles:", fetchedMedia); // Debugging
        setMedia(Array.isArray(fetchedMedia) ? fetchedMedia : []); // Ensure media is an array
      } catch (error) {
        console.error("Error fetching media articles:", error);
        setError("Failed to load media articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMediaArticles();
  }, []);

  // Handle input changes for new media article
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedia({ ...newMedia, [name]: value });
  };

  // Handle form submission to add a new media article
  const handleAddMedia = async (e) => {
    e.preventDefault();
    try {
      const addedMedia = await addMediaArticle(newMedia); // Add media article via API
      setMedia([...media, addedMedia]); // Add the new article to the state
      setNewMedia({ title: "", description: "", link: "" }); // Reset form fields
    } catch (error) {
      console.error("Error adding media article:", error);
      setError("Failed to add media article. Please try again.");
    }
  };

  // Handle deleting a media article
  const handleDeleteMedia = async (articleId) => {
    try {
      await deleteMediaArticle(articleId); // Delete the article via API
      setMedia(media.filter((item) => item._id !== articleId)); // Update the state to remove the deleted article
    } catch (error) {
      console.error("Error deleting media article:", error);
      setError("Failed to delete media article. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading media articles...</div>; // Loading indicator
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>; // Error message
  }

  return (
    <div className="container media-coverage">
      <h2 className="text-center mb-4">Media Coverage</h2>

      {/* Form to Add New Media Article */}
      <form className="mb-4" onSubmit={handleAddMedia}>
        <div className="row">
          <div className="col-md-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              value={newMedia.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-5 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              name="description"
              value={newMedia.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="url"
              className="form-control"
              placeholder="Link"
              name="link"
              value={newMedia.link}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-1 mb-2">
            <button type="submit" className="btn btn-primary w-100">Add</button>
          </div>
        </div>
      </form>

      {/* List of Media Articles */}
      <div className="row">
        {Array.isArray(media) && media.map((item) => ( // Ensure media is an array
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link"
                >
                  Read More
                </a>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDeleteMedia(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaCoverage;
