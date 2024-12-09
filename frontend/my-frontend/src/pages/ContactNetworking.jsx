// ContactNetworking.js
import React, { useState } from 'react';

const ContactNetworking = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message Sent:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container contact-networking">
      <h2 className="text-center mb-4">Contact and Networking</h2>

      <div className="card p-4 shadow mb-4">
        <h5 className="mb-3">Professional Contact Details</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Email: <a href="mailto:your-email@example.com">your-email@example.com</a></li>
          <li className="list-group-item">LinkedIn: <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">linkedin.com/in/your-profile</a></li>
        </ul>
      </div>

      <div className="card p-4 shadow">
        <h5 className="mb-3">Send a Message</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Message</label>
            <textarea
              className="form-control"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Type your message here"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactNetworking;
