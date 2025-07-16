/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { getToken, removeToken } from '../services/api';
import { STORAGE_KEYS } from '../constants';

// create context for authentication
export const AuthContext = createContext();

// AuthProvider component to wrap around app
export const AuthProvider = ({ children }) => {
    // state to store user data and loading state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // function to save user after login/register
    const saveUser = (userData) => {
        setUser(userData);
        // save to localStorage
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    };

    // function to logout user
    const logout = () => {
        setUser(null);
        removeToken(); // remove token and user data
    };

    // check if user is logged in when app starts
    useEffect(() => {
        const checkUserLogin = () => {
            try {
                const token = getToken();
                const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

                if (token && savedUser) {
                    // if token and user data -> user is logged in
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.log('Error checking login:', error);
                // if error -> clear data
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkUserLogin();
    }, []);

    // all values will be shared to the whole app
    const value = {
        user,           // current user data
        loading,        // loading state
        saveUser,       // function to save user
        logout,         // function to logout
        isLoggedIn: !!user  // boolean check if user is logged in
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 