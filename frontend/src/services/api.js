import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../constants';

// Tạo axios instance để dùng chung
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Hàm để lấy token từ localStorage
const getToken = () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Hàm để lưu token vào localStorage
const saveToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

// Hàm để xóa token khỏi localStorage
const removeToken = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
};

// Thêm token vào header tự động nếu có
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// === AUTH API ===

// Kiểm tra server có chạy không
export const checkHealth = async() => {
    const response = await api.get('/health');
    return response.data;
};

// GOVAA Authentication 
export const govaaAuth = async(email, password) => {
    const response = await api.post('/api/auth/govaa', { email, password });

    // Nếu response có token (user đã có tài khoản) thì lưu lại
    if (response.data.success && response.data.token) {
        saveToken(response.data.token);
        if (response.data.data && response.data.data.user) {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.data.user));
        }
    }

    return response.data;
};

// Đăng ký user mới
export const registerUser = async(userData) => {
    const response = await api.post('/api/auth/register', userData);

    // Tự động lưu token nếu đăng ký thành công
    if (response.data.success && response.data.token) {
        saveToken(response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.data.user));
    }

    return response.data;
};

// Đăng nhập
export const loginUser = async(email, password) => {
    const response = await api.post('/api/auth/login', { email, password });

    // Tự động lưu token nếu login thành công
    if (response.data.success && response.data.token) {
        saveToken(response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.data.user));
    }

    return response.data;
};

// Đăng xuất
export const logoutUser = async() => {
    try {
        await api.post('/api/auth/logout');
    } finally {
        // Dù có lỗi hay không thì vẫn xóa token
        removeToken();
    }
};

// Kiểm tra trạng thái đăng nhập
export const checkAuthStatus = async() => {
    const response = await api.get('/api/auth/status');
    return response.data;
};

// === USER API ===

// Lấy danh sách agencies
export const getAgencies = async() => {
    const response = await api.get('/api/user/agencies');
    return response.data;
};

// Lấy profile user
export const getUserProfile = async() => {
    const response = await api.get('/api/user/profile');
    return response.data;
};

// Export các hàm helper
export { getToken, saveToken, removeToken };