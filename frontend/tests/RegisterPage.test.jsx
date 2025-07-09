/* global describe it expect jest */
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../src/pages/RegisterPage';
import { AuthContext } from '../src/context/AuthContext';
import * as api from '../src/services/api'; 

jest.mock('../src/services/api');

const govaaUser = { name: 'Bob', email: 'bob@agency.gov.sg' };

describe('RegisterPage', () => {
  it('shows validation error when submitting empty form', async () => {
    api.getAgencies.mockImplementation(() => {
    
      return Promise.resolve({ success: true, data: { agencies: ['GovTech'] } });
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/register', state: { govaaUser } }]}> 
        <AuthContext.Provider value={{ saveUser: jest.fn() }}>
          <RegisterPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Wait for agencies to load and then get the form
    await screen.findByRole('button', { name: /create surveysg account/i });

    // Get the form element directly 
    const form = document.querySelector('form');
    
    // Use act to properly handle async state updates
    await act(async () => {
      fireEvent.submit(form);
    });

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/please fill out all required fields/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});