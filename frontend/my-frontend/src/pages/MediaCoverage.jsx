// MediaCoverage.js
import React, { useState } from 'react';

const MediaCoverage = () => {
  const [media, setMedia] = useState([
    {
      title: "Feature Article: Innovations in AI",
      description: "Highlighted in the Tech Times Magazine.",
      link: "https://techtimes.com/article",
    },
    {
      title: "Interview: Breaking Barriers in Tech",
      description: "An exclusive interview with Innovators Weekly.",
      link: "https://innovatorsweekly.com/interview",
    },
    {
      title: "News Feature: Startup Success Stories",
      description: "Featured on National Business News.",
      link: "https://nationalbusinessnews.com/startups",
    },
  ]);

  const [newMedia, setNewMedia] = useState({ title: "", description: "", link: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedia({ ...newMedia, [name]: value });
  };

  const handleAddMedia = (e) => {
    e.preventDefault();
    setMedia([...media, newMedia]);
    setNewMedia({ title: "", description: "", link: "" });
  };

  return (
    <div className="container media-coverage">
      <h2 className="text-center mb-4">Media Coverage</h2>
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
      <div className="row">
        {media.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaCoverage;
