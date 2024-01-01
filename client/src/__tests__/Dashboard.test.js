import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { fetchUserData } from '../api/authenticationService';
import Dashboard from '../pages/Dashboard';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
jest.mock('../api/authenticationService', () => ({
  fetchUserData: jest.fn(),
}));

describe('Dashboard component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders dashboard with user data', async () => {
  
    const mockResponse = {
      data: {
        email:"test2@gmail.com",
        userType:"USER",
        loginCounter:1,
        id:3

      }
    };
    fetchUserData.mockResolvedValueOnce(mockResponse);

    await act(async () => {
      render( <MemoryRouter>
        <Dashboard />
      </MemoryRouter>);
    });

    waitFor(() => {
      expect(fetchUserData).toHaveBeenCalledTimes(1);
      expect(fetchUserData).toHaveBeenCalledWith();
    });
  });

  it('handles logout correctly', () => {
    const mockResponse = {
      data: {
        email:"test2@gmail.com",
        userType:"USER",
        loginCounter:1,
        id:3

      },
    };
    fetchUserData.mockResolvedValueOnce(mockResponse);
  
    const navigateMock = jest.fn();
    const useNavigateMock = jest.fn(() => navigateMock);
  
    // Mock localStorage.clear
    const clearMock = jest.spyOn(window.localStorage, 'clear');

  
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(useNavigateMock);
  
    const { getByText } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
  
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);
  
    expect(useNavigateMock).toHaveBeenCalled();
  });

});
