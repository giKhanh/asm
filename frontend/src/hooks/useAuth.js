import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// custom hook to use AuthContext easily

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};