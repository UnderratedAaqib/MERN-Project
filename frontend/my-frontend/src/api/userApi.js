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


  //for teaching portfolio
  // API call to add a course (protected route)
export const addCourse = (courseData) => {
  const token = getAuthToken();
  console.log('Sending data:', courseData);  // Log data being sent
    console.log('Using token:', token); 
  return API.post('/courses', courseData, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  });
};

// API call to delete a course (protected route)
export const deleteCourse = (courseId) => {
  const token = getAuthToken();
  return API.delete(`/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  });
};

// You can add more API functions here as needed


// Assuming you have a getAuthToken function that retrieves the stored token
export const getCourses = () => {
  const token = getAuthToken();  // Retrieve the authentication token
  return API.get('/courses', {
    headers: {
      Authorization: `Bearer ${token}`  // Attach the token in Authorization header
    }
  })
  .then(response => response.data)
  .catch(error => {
      console.error('Failed to fetch courses:', error);
      throw error;
  });
};


//project 
// API call for projects (newly added)
// API call to add a project (protected route)
export const addProject = (projectData) => {
  const token = getAuthToken();
  console.log('Adding project:', projectData);
  return API.post('/projects', projectData, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  })
    .then((response) => {
      console.log('Project added:', response.data);
      return response.data;
    })
    .catch((err) => {
      console.error('Error adding project:', err);
      throw err;
    });
};

// API call to fetch all projects for the logged-in user
export const getProjects = () => {
  const token = getAuthToken();
  return API.get('/projects', {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Failed to fetch projects:', error);
      throw error;
    });
};

// API call to delete a project (protected route)
export const deleteProject = (projectId) => {
  const token = getAuthToken();
  return API.delete(`/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  })
    .then((response) => {
      console.log('Project deleted:', response.data);
      return response.data;
    })
    .catch((err) => {
      console.error('Error deleting project:', err);
      throw err;
    });
};


// Talks
// API call to add a talk (protected route)
export const addTalk = (talkData) => {
  const token = getAuthToken();
  console.log('Adding talk:', talkData);
  return API.post('/talks', talkData, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  })
    .then((response) => {
      console.log('Talk added:', response.data);
      return response.data;
    })
    .catch((err) => {
      console.error('Error adding talk:', err);
      throw err;
    });
};

// API call to fetch all talks for the logged-in user
export const getTalks = () => {
  const token = getAuthToken();
  return API.get('/talks', {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Failed to fetch talks:', error);
      throw error;
    });
};

// API call to delete a talk (protected route)
export const deleteTalk = (talkId) => {
  const token = getAuthToken();
  return API.delete(`/talks/${talkId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  })
    .then((response) => {
      console.log('Talk deleted:', response.data);
      return response.data;
    })
    .catch((err) => {
      console.error('Error deleting talk:', err);
      throw err;
    });
};

//for media coverage
export const addMediaArticle = (mediaData) => {
  const token = getAuthToken();
  return API.post('/media', mediaData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getMediaArticles = () => {
  const token = getAuthToken();
  return API.get('/media', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteMediaArticle = (articleId) => {
  const token = getAuthToken();
  return API.delete(`/media/${articleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
//for contact details
// API call to get social details (LinkedIn and GitHub) for the logged-in user
export const getSocialDetails = () => {
  const token = getAuthToken();
  return API.get('/social', {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Failed to fetch social details:', error);
      throw error;
    });
};

// API call to update social details (LinkedIn and GitHub) for the logged-in user
export const updateSocialDetails = (socialData) => {
  const token = getAuthToken();
  console.log("Sending social data to API:", socialData); // Debugging log
  return API.put('/social', socialData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Failed to update social details:', error);
      throw error;
    });
};


// API call to fetch all user-related data (protected route)
export const getAllUserData = () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No token found in localStorage');
  }

  return API.get('/all-data', {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to the Authorization header
    },
  })
    .then((response) => {
      console.log('All user data fetched successfully:', response.data); // Log response
      return response.data; // Return the fetched data
    })
    .catch((error) => {
      console.error('Error fetching all user data:', error); // Log any error
      throw error; // Rethrow error for handling in calling code
    });
};
