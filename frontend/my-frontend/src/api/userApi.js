// src/api/userApi.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// API call to register a user
export const registerUser = (userData) => API.post('/users/register', userData);

// You can add more API functions here, such as getUserProfile, login, etc.
