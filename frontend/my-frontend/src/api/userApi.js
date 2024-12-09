import axios from 'axios';

// Create an axios instance
const API = axios.create({ baseURL: 'http://localhost:5000/api/users' });

// Get token from localStorage (after user logs in)
const getAuthToken = () => {
    const token = localStorage.getItem('token');
    console.log('Token retrieved:', token); // Debugging line
    return token;
  };
  

// API call to register a user
export const registerUser = (userData) => {
  return API.post('/register', userData);
};

// API call to login a user
export const loginUser = (userData) => {
  return API.post('/login', userData);
};

// API call to get the user's profile (protected route)
export const getUserProfile = () => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No token found in localStorage');
    }
  
    return API.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the Authorization header
      },
    })
    .then((response) => {
      console.log('Profile data received:', response.data); // Log the response
      return response.data;
    })
    .catch((err) => {
      console.error('Error fetching profile:', err);
      throw err; // Rethrow error to be caught in calling code
    });
  };
  
  

// API call to update the user's profile (protected route)
export const updateUserProfile = (userData) => {
  const token = getAuthToken();
  return API.put('/profile', userData, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  });
};


export const addPublication = (publicationData) => {
    const token = getAuthToken();
    return API.post('/publications', publicationData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the Authorization header
      },
    })
      .then((response) => {
        console.log('Publication added:', response.data);
        return response.data;
      })
      .catch((err) => {
        console.error('Error adding publication:', err);
        throw err;
      });
  };
  
  // API call to get all publications of the user (protected route)
  export const getUserPublications = () => {
    const token = getAuthToken();
    console.log('Fetching publications with token:', token); // Log token to verify it's being set correctly
    
    return API.get('/publications', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the Authorization header
      },
    })
      .then((response) => {
        // Log the full response from the server
        console.log('Response from server:', response);
        
        // Log just the data from the response (if you only want to log the publications)
        console.log('Publications received:', response.data);
        
        return response.data;
      })
      .catch((err) => {
        // Log the error in case the request fails
        console.error('Error fetching publications:', err);
        
        throw err; // Rethrow the error if you need to handle it further down the chain
      });
  };
  
  // API call to update a publication (protected route)
  export const updatePublication = (publicationData) => {
    const token = getAuthToken();
    return API.put('/publications', publicationData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the Authorization header
      },
    })
      .then((response) => {
        console.log('Publication updated:', response.data);
        return response.data;
      })
      .catch((err) => {
        console.error('Error updating publication:', err);
        throw err;
      });
  };
  
  // API call to delete a publication (protected route)
  export const deletePublication = (publicationId) => {
    const token = getAuthToken();
    return API.delete(`/publications/${publicationId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to the Authorization header
      },
    })
      .then((response) => {
        console.log('Publication deleted:', response.data);
        return response.data;
      })
      .catch((err) => {
        console.error('Error deleting publication:', err);
        throw err;
      });
  };
// You can add more API functions here as needed
