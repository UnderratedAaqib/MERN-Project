import React, { useState, useEffect } from 'react';
import { Lock, User, Mail, Briefcase, University } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../api/userApi';  // Correct import path
import { useNavigate } from 'react-router-dom';  // For navigation after successful submission

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
    return <div className="text-center">Loading...</div>;  // Optionally, you can add a spinner or loading indicator here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8 bg-white">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Your Profile
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}  {/* Display error message */}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Position Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Position"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                name="position"
                value={profile.position || ''}
                onChange={handleChange}
                required
              />
            </div>

            {/* University Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <University className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="University"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                name="university"
                value={profile.university || ''}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                disabled
              />
            </div>

            {/* Bio Textarea */}
            <div className="relative">
              <textarea
                placeholder="Tell us about yourself"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 h-32 resize-none"
                name="bio"
                value={profile.bio || ''}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
              disabled={loading}
            >
              <Lock className="h-5 w-5" />
              <span>{loading ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
