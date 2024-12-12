import React, { useState, useEffect } from "react";
import { getTalks, addTalk, deleteTalk } from "../api/userApi"; // Import API calls for talks

const ConferenceTalks = () => {
  const [talks, setTalks] = useState([]); // State to store talks
  const [newTalk, setNewTalk] = useState({ title: "", description: "", videoUrl: "" }); // State for new talk
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch talks from the database when the component mounts
  useEffect(() => {
    const fetchTalks = async () => {
      try {
        const fetchedTalks = await getTalks(); // Fetch talks using API
        setTalks(fetchedTalks);
      } catch (error) {
        console.error("Error fetching talks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTalks();
  }, []);

  // Handle input changes for new talk
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTalk({ ...newTalk, [name]: value });
  };

  // Handle form submission to add a new talk
  const handleAddTalk = async (e) => {
    e.preventDefault();
    try {
      const addedTalk = await addTalk(newTalk); // Add talk to the database via API
      setTalks([...talks, addedTalk]); // Update the state with the new talk
      setNewTalk({ title: "", description: "", videoUrl: "" }); // Reset form fields
    } catch (error) {
      console.error("Error adding talk:", error);
    }
  };

  // Handle delete talk
  const handleDeleteTalk = async (talkId) => {
    try {
      await deleteTalk(talkId); // Delete talk via API
      setTalks(talks.filter((talk) => talk._id !== talkId)); // Remove the deleted talk from the state
    } catch (error) {
      console.error("Error deleting talk:", error);
    }
  };

  if (loading) {
    return <div>Loading talks...</div>; // Show loading indicator
  }

  return (
    <div className="container conference-talks">
      <h2 className="text-center mb-4">Conference Talks and Presentations</h2>

      {/* Form to Add New Talk */}
      <form className="mb-4" onSubmit={handleAddTalk}>
        <div className="row">
          <div className="col-md-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Talk Title"
              name="title"
              value={newTalk.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              name="description"
              value={newTalk.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="url"
              className="form-control"
              placeholder="Video URL"
              name="videoUrl"
              value={newTalk.videoUrl}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-2 mb-2">
            <button type="submit" className="btn btn-primary w-100">
              Add Talk
            </button>
          </div>
        </div>
      </form>

      {/* List of Talks */}
      <div className="row">
        {talks.map((talk) => (
          <div className="col-md-4 mb-4" key={talk._id}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{talk.title}</h5>
                <p className="card-text">{talk.description}</p>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src={talk.videoUrl}
                    allowFullScreen
                    title={talk.title}
                  ></iframe>
                </div>
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => handleDeleteTalk(talk._id)}
                >
                  Delete Talk
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConferenceTalks;
