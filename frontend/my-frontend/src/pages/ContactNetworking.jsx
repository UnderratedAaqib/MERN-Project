import React, { useState, useEffect } from 'react';
import { getSocialDetails, updateSocialDetails } from '../api/userApi';

const ContactNetworking = () => {
  const [formData, setFormData] = useState({
    email: '',
    linkedIn: '',
    github: '',
  });

  useEffect(() => {
    // Fetch the social details when the component mounts
    const fetchSocialDetails = async () => {
      try {
        const data = await getSocialDetails();
        setFormData({
          email: data.email || '',
          linkedIn: data.linkedIn || '',
          github: data.github || '',
        });
      } catch (error) {
        console.error('Error fetching social details:', error);
      }
    };

    fetchSocialDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSocialDetails({
        linkedIn: formData.linkedIn,
        github: formData.github,
      });
      console.log('Social details updated successfully');
    } catch (error) {
      console.error('Error updating social details:', error);
    }
  };

  return (
    <div className="container contact-networking">
      <h2 className="text-center mb-4">Contact and Networking</h2>

      <div className="card p-4 shadow mb-4">
        <h5 className="mb-3">Professional Contact Details</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Email: <a href={`mailto:${formData.email}`}>{formData.email}</a>
          </li>
          <li className="list-group-item">
            LinkedIn: 
            <input
              type="text"
              className="form-control mt-2"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              placeholder="Enter your LinkedIn URL"
            />
          </li>
          <li className="list-group-item">
            GitHub: 
            <input
              type="text"
              className="form-control mt-2"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="Enter your GitHub URL"
            />
          </li>
        </ul>
      </div>

      <button 
        type="button" 
        className="btn btn-primary w-100" 
        onClick={handleSubmit}
      >
        Save Changes
      </button>
    </div>
  );
};

export default ContactNetworking;
