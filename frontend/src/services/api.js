import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../constants';

// Create shared axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Function to get token from localStorage
const getToken = () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Function to save token to localStorage
const saveToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

// Function to remove token from localStorage
const removeToken = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
};

// Automatically add token to header if available
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// === AUTH API ===

// Check if server is running
export const checkHealth = async() => {
    const response = await api.get('/health');
    return response.data;
};

// GOVAA Authentication 
export const govaaAuth = async(email, password) => {
    const response = await api.post('/api/auth/govaa', { email, password });

    // If response has token (user already has account) then save it
    if (response.data.success && response.data.token) {
        saveToken(response.data.token);
        if (response.data.data && response.data.data.user) {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.data.user));
        }
    }

    return response.data;
};

// Register new user
export const registerUser = async(userData) => {
    const response = await api.post('/api/auth/register', userData);

    // Automatically save token if registration successful
    if (response.data.success && response.data.token) {
        saveToken(response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.data.user));
    }

    return response.data;
};

// Login
export const loginUser = async(email, password) => {
    const response = await api.post('/api/auth/login', { email, password });

    // Automatically save token if login successful
    if (response.data.success && response.data.token) {
        saveToken(response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.data.user));
    }

    return response.data;
};

// Logout
export const logoutUser = async() => {
    try {
        await api.post('/api/auth/logout');
    } finally {
        // Remove token regardless of errors
        removeToken();
    }
};

// Check authentication status
export const checkAuthStatus = async() => {
    const response = await api.get('/api/auth/status');
    return response.data;
};

// === USER API ===

// Get list of agencies
export const getAgencies = async() => {
    const response = await api.get('/api/user/agencies');
    return response.data;
};

// Get user profile
export const getUserProfile = async() => {
    const response = await api.get('/api/user/profile');
    return response.data;
};

// Export helper functions
export { getToken, saveToken, removeToken };