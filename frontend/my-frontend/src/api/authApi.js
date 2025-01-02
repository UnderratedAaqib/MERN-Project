// authApi.js
export const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
  
    // Optionally clear other session-related data
    sessionStorage.clear(); // If you're using sessionStorage
    // Or clear cookies if applicable
  
    // You can also redirect the user to the login page here
    console.log('User logged out successfully.');
  };
  