/* global describe it expect */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../src/pages/HomePage';
import { AuthContext } from '../src/context/AuthContext';

const renderWithAuth = (user = null) => {
    return render(
        <AuthContext.Provider value={{ user, isLoggedIn: !!user }}>
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

describe('HomePage', () => {
    it('shows login prompt when logged out', () => {
        renderWithAuth(null);
        expect(screen.getByText(/please log in with your govaa account/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('greets the user when logged in', () => {
        renderWithAuth({ name: 'Alice' });
        expect(screen.getByText(/hello, alice/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /view profile/i })).toBeInTheDocument();
    });
}); 