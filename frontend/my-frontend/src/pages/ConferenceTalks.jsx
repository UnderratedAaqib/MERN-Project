// ConferenceTalks.js
import React, { useState } from 'react';

const ConferenceTalks = () => {
  const [talks, setTalks] = useState([
    {
      title: "Keynote: The Future of Technology",
      description: "Delivered at the International Tech Conference 2024.",
      videoUrl: "https://www.youtube.com/embed/samplevideo1",
    },
    {
      title: "Workshop: Introduction to AI Ethics",
      description: "Presented at the Global AI Summit.",
      videoUrl: "https://www.youtube.com/embed/samplevideo2",
    },
    {
      title: "Panel Discussion: Women in Tech",
      description: "Participated at the Women Innovators Summit.",
      videoUrl: "https://www.youtube.com/embed/samplevideo3",
    },
  ]);

  const [newTalk, setNewTalk] = useState({ title: "", description: "", videoUrl: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTalk({ ...newTalk, [name]: value });
  };

  const handleAddTalk = (e) => {
    e.preventDefault();
    setTalks([...talks, newTalk]);
    setNewTalk({ title: "", description: "", videoUrl: "" });
  };

  return (
    <div className="container conference-talks">
      <h2 className="text-center mb-4">Conference Talks and Presentations</h2>
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
            <button type="submit" className="btn btn-primary w-100">Add Talk</button>
          </div>
        </div>
      </form>
      <div className="row">
        {talks.map((talk, index) => (
          <div className="col-md-4 mb-4" key={index}>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConferenceTalks;