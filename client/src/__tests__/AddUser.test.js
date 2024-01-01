import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import validator from 'validator';
import AddUserModal from '../pages/AddUser';

jest.mock('validator', () => ({
  isEmail: jest.fn(),
}));

describe('AddUserModal component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Add User form and Update',async () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();
    const onUpdateMock = jest.fn();
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      emailId: 'john@example.com',
      accountStatus: 'ACTIVE',
    };

    const { getByText } = render(
      <AddUserModal onSave={onSaveMock} onCancel={onCancelMock} userData={userData} onUpdate={onUpdateMock} />
    );

    expect(screen.getByPlaceholderText('First Name')).toHaveValue('John');
    expect(screen.getByPlaceholderText('Last Name')).toHaveValue('Doe');
    expect(screen.getByPlaceholderText('Email Id')).toHaveValue('john@example.com');
    expect(screen.getByLabelText('Active')).toBeChecked();

    fireEvent.click(screen.getByText('Cancel'));
    fireEvent.click(screen.getByText('Update'));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
    const submitButton = getByText('Update');
    fireEvent.click(submitButton);

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

  });
  it('renders Add User form and Add', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();
  
    validator.isEmail.mockReturnValue(true);
    const { getByPlaceholderText,getByText } = render(
      <AddUserModal onSave={onSaveMock} onCancel={onCancelMock}  />
    );
    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email Id');
    

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    

    const submitButton = getByText('Add');
    fireEvent.submit(submitButton);

    waitFor(() => {
      expect(onSaveMock).toHaveBeenCalledTimes(1);
      expect(onSaveMock).toHaveBeenCalledWith({
        emailId: 'test@example.com',
        password: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        accountStatus: 'ACTIVE',
        createdTime:""
      });
    });

  });
  it('renders Add User form and first and last name on change',async () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    const { getByPlaceholderText,getByText } = render(
      <AddUserModal onSave={onSaveMock} onCancel={onCancelMock}  />
    );
    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email Id');
    

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.change(lastNameInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    

    const submitButton = getByText('Add');
    fireEvent.submit(submitButton);
   
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid last name")).toBeInTheDocument();
      expect(screen.getByText("Please enter a valid first name")).toBeInTheDocument();
    });


  });

  it('renders Add User form and last name on Add validation',async () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    const { getByPlaceholderText,getByText } = render(
      <AddUserModal onSave={onSaveMock} onCancel={onCancelMock}  />
    );
    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email Id');
    

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: "Jonn"} });
    fireEvent.change(lastNameInput, { target: { value: ""} });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    

    const submitButton = getByText('Add');
    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid last name")).toBeInTheDocument();
    });


  });
  it('renders Add User form and email on Add validation',async () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    const { getByPlaceholderText,getByText } = render(
      <AddUserModal onSave={onSaveMock} onCancel={onCancelMock}  />
    );
    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const emailInput = getByPlaceholderText('Email Id');
    

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe"} });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(emailInput, { target: { value: '' } });

    const submitButton = getByText('Add');
    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email format")).toBeInTheDocument();
    });


  });

});
