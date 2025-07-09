// API Configuration
export const API_BASE_URL = 'http://localhost:3000';

// API Endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    HEALTH: '/health',
    GOVAA_AUTH: '/api/auth/govaa',
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    AUTH_STATUS: '/api/auth/status',

    // User endpoints
    AGENCIES: '/api/user/agencies',
    PROFILE: '/api/user/profile'
};

// Local Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'surveysg_token',
    USER: 'surveysg_user'
};

// GOVAA Configuration
export const GOVAA_CONFIG = {
    PASSWORD: 'password123',
    EMAIL_DOMAIN: '.gov.sg'
};

// App Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    AGENCIES: '/agencies'
};

// Form Validation
export const VALIDATION = {
    JOB_DESCRIPTION: {
        MIN_LENGTH: 10,
        MAX_LENGTH: 500
    }
};