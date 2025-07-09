/* global describe it expect jest */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../src/components/layout/Layout'
import { AuthContext } from '../src/context/AuthContext';

jest.mock('react-router-dom', () => {
    const original = jest.requireActual('react-router-dom');
    return { ...original, useNavigate: () => jest.fn() };
});

const renderLayout = (context) =>
    render(
        <AuthContext.Provider value={context}>
            <BrowserRouter>
                <Layout>
                    <div>content</div>
                </Layout>
            </BrowserRouter>
        </AuthContext.Provider>
    );

describe('Layout', () => {
    it('shows Login button when logged out', () => {
        renderLayout({ isLoggedIn: false });
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('shows greeting and Logout when logged in', () => {
        renderLayout({ isLoggedIn: true, user: { name: 'Bob' }, logout: jest.fn() });
        expect(screen.getByText(/hello, bob/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });
}); 