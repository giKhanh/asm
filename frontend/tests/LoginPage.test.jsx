/* global describe it expect jest */
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';
import { AuthContext } from '../src/context/AuthContext';
import * as api from '../src/services/api';

jest.mock('../src/services/api');

const renderPage = () =>
    render(
        <AuthContext.Provider value={{ saveUser: jest.fn() }}>
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        </AuthContext.Provider>
    );

describe('LoginPage', () => {
    it('renders heading and button', () => {
        renderPage();
        expect(screen.getByRole('heading', { name: /login to surveysg/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login with govaa/i })).toBeInTheDocument();
    });

    it('calls govaaAuth with email and password', async () => {
        api.govaaAuth.mockResolvedValue({ success: true, needsRegistration: false, data: { user: {} } });
        renderPage();

        fireEvent.change(screen.getByLabelText(/email govaa/i), { target: { value: 'alice@agency.gov.sg' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /login with govaa/i }));
        });

        expect(api.govaaAuth).toHaveBeenCalledWith('alice@agency.gov.sg', 'password123');
    });
}); 