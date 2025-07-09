/* global describe it expect */
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../src/context/AuthContext';
import { STORAGE_KEYS } from '../src/constants';

describe('AuthContext logic', () => {
    it('saveUser stores data in localStorage', () => {
        const wrapper = ({ children }) => React.createElement(AuthProvider, null, children);
        const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });
        act(() => {
            result.current.saveUser({ name: 'Sam' });
        });
        expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)).name).toBe('Sam');
    });
});