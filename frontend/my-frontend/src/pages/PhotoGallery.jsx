// PhotoGallery.js
import React, { useState } from 'react';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([
    {
      category: "Research Activities",
      url: "https://via.placeholder.com/150",
    },
    {
      category: "Conferences",
      url: "https://via.placeholder.com/150",
    },
    {
      category: "Workshops",
      url: "https://via.placeholder.com/150",
    },
  ]);

  const [newPhoto, setNewPhoto] = useState({ category: "", file: null });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setNewPhoto({ ...newPhoto, file: files[0] });
    } else {
      setNewPhoto({ ...newPhoto, category: value });
    }
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (newPhoto.file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotos([
          ...photos,
          { category: newPhoto.category, url: event.target.result },
        ]);
        setNewPhoto({ category: "", file: null });
      };
      reader.readAsDataURL(newPhoto.file);
    }
  };

  return (
    <div className="container photo-gallery">
      <h2 className="text-center mb-4">Photo Gallery</h2>
      <form className="mb-4" onSubmit={handleAddPhoto}>
        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              name="category"
              value={newPhoto.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 mb-2">
            <input
              type="file"
              className="form-control"
              name="file"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-2 mb-2">
            <button type="submit" className="btn btn-primary w-100">Upload Photo</button>
          </div>
        </div>
      </form>
      <div className="row">
        {photos.map((photo, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow">
              <img
                src={photo.url}
                alt={photo.category}
                className="card-img-top"
              />
              <div className="card-body">
                <p className="card-text text-center">{photo.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
