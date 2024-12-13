import React, { useState, useEffect } from 'react';
import { Lock, User, Mail, Briefcase, University } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../api/userApi';  // Correct import path
import { useNavigate } from 'react-router-dom';  // For navigation after successful submission
import '../styles/Profile.css';  // Import the Profile CSS

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    position: '',
    university: '',
    email: '',
    bio: ''
  });

  const [loading, setLoading] = useState(true);  // Loading state for fetching profile
  const [error, setError] = useState('');  // Error state for displaying any errors
  const navigate = useNavigate();  // Use navigate from React Router v6

  // Check if user is logged in (token exists)
  const token = localStorage.getItem('token');

  // Redirect to login page if no token is found
  useEffect(() => {
    if (!token) {
      navigate('/login');  // Redirect to login if not logged in
    } else {
      const fetchProfile = async () => {
        try {
          const response = await getUserProfile();  // Call the API to fetch user data
          setProfile({
            name: response.user.name || '',
            position: response.user.position || '',
            university: response.user.university || '',
            email: response.user.email || '',
            bio: response.user.bio || ''
          });
        } catch (err) {
          setError('Failed to fetch profile');
        } finally {
          setLoading(false);  // Stop loading when the fetch is done
        }
      };

      fetchProfile();  // Fetch user profile on component mount
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(profile);  // Call API to update profile data
      navigate('/publications');  // Redirect after success (or any other page you prefer)
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;  // Optionally, you can add a spinner or loading indicator here
  }

  return (
    <div className="profile-container">
      <div className="profile-main">
        <div className="card">
          <h2 className="heading">Create Your Profile</h2>

          {error && <p className="error-message">{error}</p>}  {/* Display error message */}

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="form-group">
              <div className="icon-wrapper">
                <User className="icon" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Position Input */}
            <div className="form-group">
              <div className="icon-wrapper">
                <Briefcase className="icon" />
              </div>
              <input
                type="text"
                placeholder="Position"
                name="position"
                value={profile.position || ''}
                onChange={handleChange}
                required
              />
            </div>

            {/* University Input */}
            <div className="form-group">
              <div className="icon-wrapper">
                <University className="icon" />
              </div>
              <input
                type="text"
                placeholder="University"
                name="university"
                value={profile.university || ''}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-group">
              <div className="icon-wrapper">
                <Mail className="icon" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                disabled
              />
            </div>

            {/* Bio Textarea */}
            <div className="form-group">
              <textarea
                placeholder="Tell us about yourself"
                name="bio"
                value={profile.bio || ''}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn" disabled={loading}>
              <Lock className="icon" />
              <span>{loading ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </form>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
