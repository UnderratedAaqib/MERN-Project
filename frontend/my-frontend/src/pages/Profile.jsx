import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    position: '',
    university: '',
    email: '',
    bio: ''
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
    // Save or send data to server
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={profile.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>University</label>
          <input
            type="text"
            className="form-control"
            name="university"
            value={profile.university}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Bio</label>
          <textarea
            className="form-control"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
