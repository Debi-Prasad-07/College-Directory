// authService.js

import axiosInstance from './axiosConfig';

// Define the key where the JWT token will be stored in local storage
const TOKEN_KEY = 'auth_token';

// Login function - authenticate the user and store the token
const login = async (username, password, role) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
      role,
    });

    if (response.data.token) {
      // Store the JWT token in local storage
      localStorage.setItem(TOKEN_KEY, response.data.token);
      return response.data;
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Logout function - remove the token from local storage
const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Check if the user is authenticated by checking if the token exists
const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;  // Returns true if token exists, false otherwise
};

// Get the token from local storage
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Register function - create a new user (for admins adding users)
const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Function to handle API request with the token in the headers
const getAuthHeader = () => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

export default {
  login,
  logout,
  isAuthenticated,
  getToken,
  register,
  getAuthHeader,
};
