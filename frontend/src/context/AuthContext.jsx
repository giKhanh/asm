/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { getToken, removeToken } from '../services/api';
import { STORAGE_KEYS } from '../constants';

// Tạo Context cho Authentication
export const AuthContext = createContext();

// AuthProvider component để bọc quanh app
export const AuthProvider = ({ children }) => {
    // State để lưu thông tin user và trạng thái loading
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hàm để lưu user sau khi login/register
    const saveUser = (userData) => {
        setUser(userData);
        // Lưu vào localStorage luôn
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    };

    // Hàm để logout user
    const logout = () => {
        setUser(null);
        removeToken(); // Xóa token và user data
    };

    // Kiểm tra xem user đã login chưa khi app khởi động
    useEffect(() => {
        const checkUserLogin = () => {
            try {
                const token = getToken();
                const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

                if (token && savedUser) {
                    // Có token và user data -> user đã login
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.log('Error checking login:', error);
                // Nếu có lỗi thì clear data
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkUserLogin();
    }, []);

    // Các value sẽ được share cho toàn app
    const value = {
        user,           // Thông tin user hiện tại
        loading,        // Có đang loading không
        saveUser,       // Hàm để lưu user
        logout,         // Hàm để logout
        isLoggedIn: !!user  // Boolean check user đã login chưa
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 