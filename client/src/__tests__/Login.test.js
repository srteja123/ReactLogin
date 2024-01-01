import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { userLogin } from '../api/authenticationService';
import LoginPage from '../pages/Login';

jest.mock('../api/authenticationService', () => ({
  userLogin: jest.fn(),
}));

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

describe('LoginPage component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form and handles login', async () => {
    const navigateMock = jest.fn();
    const useNavigateMock = jest.fn(() => navigateMock);
  
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(useNavigateMock);
    const mockResponse = {
      status: 200,
      data: {
        token: 'exampleToken',
        roles: ['USER'],
      },
    };

    userLogin.mockResolvedValueOnce(mockResponse);

    const { getByPlaceholderText, getByText ,getByTestId, within} = render(<MemoryRouter><LoginPage /></MemoryRouter>);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    const addButtonContainer = getByTestId('login');
    fireEvent.click(addButtonContainer);

    
    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledTimes(1);
      expect(userLogin).toHaveBeenCalledWith({
        emailId: 'test@example.com',
        password: 'testPassword',
      });
      
    });

    // Ensure local storage is updated upon successful login
    expect(localStorage.getItem('USER_KEY')).toEqual(mockResponse.data.token);

    expect(useNavigateMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });
  it('renders login form and calls admin page', async () => {
    const navigateMock = jest.fn();
    const useNavigateMock = jest.fn(() => navigateMock);
  
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(useNavigateMock);
    const mockResponse = {
      status: 200,
      data: {
        token: 'exampleToken',
        roles: ['ADMIN'],
      },
    };

    userLogin.mockResolvedValueOnce(mockResponse);

    const { getByPlaceholderText, getByText ,getByTestId, within} = render(<MemoryRouter><LoginPage /></MemoryRouter>);

    // Fill in the form inputs
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Submit the form
    const addButtonContainer = getByTestId('login');
    fireEvent.click(addButtonContainer);

    // Ensure the login function is called with correct values
    
    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledTimes(1);
      expect(userLogin).toHaveBeenCalledWith({
        emailId: 'test@example.com',
        password: 'testPassword',
      });
      
    });

    // Ensure local storage is updated upon successful login
    expect(localStorage.getItem('USER_KEY')).toEqual(mockResponse.data.token);

    expect(useNavigateMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/adminDashboard');

  });
  it('renders login form and fail 200', async () => {
    const navigateMock = jest.fn();
    const useNavigateMock = jest.fn(() => navigateMock);
  
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(useNavigateMock);
    const mockResponse = {
      status: 403,
      data: {
        token: 'exampleToken',
        roles: ['USER'],
      },
    };

    userLogin.mockResolvedValueOnce(mockResponse);

    const { getByPlaceholderText ,getByTestId} = render(<MemoryRouter><LoginPage /></MemoryRouter>);

    // Fill in the form inputs
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Submit the form
    const addButtonContainer = getByTestId('login');
    fireEvent.click(addButtonContainer);
    
    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledTimes(1);
      expect(userLogin).toHaveBeenCalledWith({
        emailId: 'test@example.com',
        password: 'testPassword',
      });
      
    });

    // Ensure local storage is updated upon successful login
    expect(localStorage.getItem('USER_KEY')).toEqual(mockResponse.data.token);

    expect(useNavigateMock).toHaveBeenCalled();

  });
  it('renders registration form and email validation',  () => {
     render(<MemoryRouter><LoginPage /></MemoryRouter>);
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example@com' } });
    expect(screen.getByText("Please enter a valid email format")).toBeInTheDocument();

  
  });
  it('handles failed login with 403 error',  async() => {
    userLogin.mockRejectedValue({
      response: {
        status: 403,
        data: {
          message: 'Forbidden',
        },
      },
    });
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByTestId('login');
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.submit(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Forbidden')).toBeInTheDocument();
    });
   

  });
  it('handles failed login with 401 error',  async () => {

    userLogin.mockRejectedValue({
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
        },
      },
    });
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByTestId('login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.submit(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Unauthorized')).toBeInTheDocument();
    });

    
  });

  it('handles failed login with other error', async () => {

    userLogin.mockRejectedValue({
      response: {
        status: 500,
        data: {
          message: 'Internal Server Error',
        },
      },
    });


    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByTestId('login');

   
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.submit(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Internal Server Error')).toBeInTheDocument();
    });
  });

  it('handles failed login', async () => {

    userLogin.mockRejectedValue({
    });

    
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByTestId('login');

   
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.submit(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Failed Login')).toBeInTheDocument();
    });
  });
 
});

