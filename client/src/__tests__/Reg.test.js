import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { userRegister } from '../api/authenticationService';
import RegisterPage from '../pages/Reg';

jest.mock('../api/authenticationService', () => ({
  userRegister: jest.fn(),
}));

describe('RegisterPage component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders registration form and handles registration', async () => {
    const mockResponse = {
      status: 200,
      message: 'User registered successfully',
    };

    userRegister.mockResolvedValueOnce(mockResponse);

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testPassword' } });

    const submitButton = getByText('Register Now');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(userRegister).toHaveBeenCalledTimes(1);
      expect(userRegister).toHaveBeenCalledWith({
        emailId: 'test@example.com',
        password: 'testPassword',
        firstName: 'John',
        lastName: 'Doe',
        accountStatus: 'ACTIVE',
      });
    });

  });
  it('renders registration form and fail registration', async () => {
    const mockResponse = {
      status: 403,
      message: 'Email already exists',
    };

    userRegister.mockResolvedValueOnce(mockResponse);

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testPassword' } });

    const submitButton = getByText('Register Now');
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });

  it('renders registration form and password length validation', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testPasswordTest' } });

    const submitButton = getByText('Register Now');
    fireEvent.click(submitButton);

    expect(getByText("Password doesn't match or the field is empty")).toBeInTheDocument();

  });
  it('renders registration form and password not entered', async () => {
 

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '' } });

    const submitButton = getByText('Register Now');
    fireEvent.click(submitButton);

    expect(getByText("Password doesn't match or the field is empty")).toBeInTheDocument();

  });
  it('renders registration form and first name not entered', async () => {
 

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pwddser' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pwddser' } });

    const submitButton = getByText('Register Now');
    fireEvent.click(submitButton);

    expect(getByText("Please enter a valid first name")).toBeInTheDocument();

  });
  it('renders registration form and last name not entered', async () => {
 

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(firstNameInput, { target: { value: 'Tester' } });
    fireEvent.change(lastNameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pwddser' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pwddser' } });

    const submitButton = getByText('Register Now');
    fireEvent.click(submitButton);

    expect(getByText("Please enter a valid last name")).toBeInTheDocument();

  });

  it('renders registration form and Forbidden catch block', async () => {
    userRegister.mockRejectedValue({
      response: {
        status: 403,
        data: {
          message: 'Forbidden',
        },
      },
    });
    render(
    <MemoryRouter>
    <RegisterPage />
  </MemoryRouter>
  );

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const regButton = screen.getByTestId('register');



  fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testPassword' } });
    fireEvent.submit(regButton);

  await waitFor(() => {
    expect(screen.getByText('Forbidden')).toBeInTheDocument();
  });

  });

  it('renders registration form and Unauthorized', async () => {

    userRegister.mockRejectedValue({
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
        },
      },
    });
    render(
    <MemoryRouter>
    <RegisterPage />
  </MemoryRouter>
  );

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const regButton = screen.getByTestId('register');



  fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testPassword' } });
    fireEvent.submit(regButton);

  await waitFor(() => {
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });
  });
  it('renders registration form and default error message', async () => {

    userRegister.mockRejectedValue({
      response: {
        status: 500,
        data: {
          message: 'Internal Server Error',
        },
      },
    });
    render(
    <MemoryRouter>
    <RegisterPage />
  </MemoryRouter>
  );

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const regButton = screen.getByTestId('register');



  fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testPassword' } });
    fireEvent.submit(regButton);

  await waitFor(() => {
    expect(screen.getByText('Internal Server Error')).toBeInTheDocument();
  });
  });
  it('renders registration form and Else block error ', async () => {

    userRegister.mockRejectedValue({});
    render(
    <MemoryRouter>
    <RegisterPage />
  </MemoryRouter>
  );

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const regButton = screen.getByTestId('register');



  fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testPassword' } });
    fireEvent.submit(regButton);

  await waitFor(() => {
    expect(screen.getByText('Failed Registration')).toBeInTheDocument();
  });
  });

  it('renders registration form and email validation',  () => {
    render(
    <MemoryRouter>
    <RegisterPage />
  </MemoryRouter>
  );
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example@com' } });
    expect(screen.getByText("Please enter a valid email format")).toBeInTheDocument();

  
  });
  it('renders registration form and field validation',  () => {
    render(
    <MemoryRouter>
    <RegisterPage />
  </MemoryRouter>
  );

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    

    fireEvent.change(firstNameInput, { target: { value: "JohnTest" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe test" } });
    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.change(lastNameInput, { target: { value: "" } });
  

    expect(screen.getByText("Please enter a valid last name")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid first name")).toBeInTheDocument();

  
  });
});
