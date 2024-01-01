import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { deleteUser, fetchAllUsersData, updateUser, userRegister } from '../api/authenticationService';
import AdminDashBoard from '../pages/AdminDashBoard';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('../api/authenticationService', () => ({
    fetchAllUsersData: jest.fn(),
    userRegister: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
  }));

describe('AdminDashboard component', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });

  it('renders Admin Dashboard and handles user interactions', async () => {

    const mockData =
      {
        "email": "admin@gmail.com",
        "userType": "ADMIN",
        "loginCounter": 33,
        "id": 1,
        "userList": [
            {
                "userId": 1,
                "userType": "ADMIN",
                "emailId": "admin@gmail.com",
                "password": "$2a$10$uIC04oNIYTY7q2/1mSlKyOPNAuYqAqNVICx4h/okTYqc5ZoJb9RWG",
                "firstName": "admin",
                "lastName": "admin",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-12T07:26:32.000+00:00",
                "updatedTime": null,
                "loginCounter": 33
            },
            {
                "userId": 3,
                "userType": "USER",
                "emailId": "test2@gmail.com",
                "password": "$2a$10$ZMzZPWI9G.DU04b6FfYFauKahL7OZ.VnofKEXijQsY8Wr1J4mrc1m",
                "firstName": "User",
                "lastName": "Ravi",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-12T10:45:38.000+00:00",
                "updatedTime": null,
                "loginCounter": 0
            },
            {
                "userId": 4,
                "userType": "USER",
                "emailId": "test3@gmail.com",
                "password": "$2a$10$FRs0/T68uzwGzE1O88H4QeoN0Ok7J5SQ/Pu8UMcP0bV4JHYKZ5f4i",
                "firstName": "User",
                "lastName": "Ravi",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-12T14:50:40.000+00:00",
                "updatedTime": null,
                "loginCounter": 2
            },
            {
                "userId": 5,
                "userType": "USER",
                "emailId": "test4@gmail.com",
                "password": "$2a$10$iB33g8BSRwwvAtXf32HXPeiyGdHABm3Wn7EPwwqanRgGiVsXFktzO",
                "firstName": "User",
                "lastName": "Ravi",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-13T04:49:36.000+00:00",
                "updatedTime": null,
                "loginCounter": 1
            },
            {
                "userId": 7,
                "userType": "USER",
                "emailId": "test7@gmail.com",
                "password": "$2a$10$QYA2Dapc3S4Y4uiOOhXE4OwBJXOT1LPQW9qpYi8uVnk6aJd4kX9wG",
                "firstName": "User",
                "lastName": "test1",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-13T06:36:06.000+00:00",
                "updatedTime": null,
                "loginCounter": 7
            },
            {
                "userId": 10,
                "userType": "USER",
                "emailId": "test11@gmail.com",
                "password": "$2a$10$3OraVYjsx42NlYL1HwsOTee.nlhNEYztLpeOh2duA9xFtMWTIPSDy",
                "firstName": "newuser",
                "lastName": "2",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-24T07:00:36.000+00:00",
                "updatedTime": null,
                "loginCounter": 0
            }
        ]
      };
      // Add more mock data as needed for testing pagination and actions
      const mockEditResponse = {
        status: 200,
       
      };
      const mockAfterDeleteResponse =
      {
        "email": "admin@gmail.com",
        "userType": "ADMIN",
        "loginCounter": 33,
        "id": 1,
        "userList": [
            {
                "userId": 1,
                "userType": "ADMIN",
                "emailId": "admin@gmail.com",
                "password": "$2a$10$uIC04oNIYTY7q2/1mSlKyOPNAuYqAqNVICx4h/okTYqc5ZoJb9RWG",
                "firstName": "admin",
                "lastName": "admin",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-12T07:26:32.000+00:00",
                "updatedTime": null,
                "loginCounter": 33
            },
            {
                "userId": 3,
                "userType": "USER",
                "emailId": "test2@gmail.com",
                "password": "$2a$10$ZMzZPWI9G.DU04b6FfYFauKahL7OZ.VnofKEXijQsY8Wr1J4mrc1m",
                "firstName": "User",
                "lastName": "Ravi",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-12T10:45:38.000+00:00",
                "updatedTime": null,
                "loginCounter": 0
            },
            {
                "userId": 5,
                "userType": "USER",
                "emailId": "test4@gmail.com",
                "password": "$2a$10$iB33g8BSRwwvAtXf32HXPeiyGdHABm3Wn7EPwwqanRgGiVsXFktzO",
                "firstName": "User",
                "lastName": "Ravi",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-13T04:49:36.000+00:00",
                "updatedTime": null,
                "loginCounter": 1
            },
            {
                "userId": 7,
                "userType": "USER",
                "emailId": "test7@gmail.com",
                "password": "$2a$10$QYA2Dapc3S4Y4uiOOhXE4OwBJXOT1LPQW9qpYi8uVnk6aJd4kX9wG",
                "firstName": "User",
                "lastName": "test1",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-13T06:36:06.000+00:00",
                "updatedTime": null,
                "loginCounter": 7
            },
            {
                "userId": 10,
                "userType": "USER",
                "emailId": "test11@gmail.com",
                "password": "$2a$10$3OraVYjsx42NlYL1HwsOTee.nlhNEYztLpeOh2duA9xFtMWTIPSDy",
                "firstName": "newuser",
                "lastName": "2",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-24T07:00:36.000+00:00",
                "updatedTime": null,
                "loginCounter": 0
            }
        ]
      };
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);
    fetchAllUsersData.mockResolvedValueOnce({ data: mockData });
    updateUser.mockResolvedValueOnce(mockEditResponse);
    deleteUser.mockResolvedValueOnce(mockAfterDeleteResponse);
    const { getByText, getAllByTitle  ,getByTestId} = render(
      <MemoryRouter>
        <AdminDashBoard />
      </MemoryRouter>
    );

    await waitFor(() => {
      //expect(mockSetData).toHaveBeenCalledWith(mockUserList);
        expect(fetchAllUsersData).toHaveBeenCalledTimes(1);
        expect(fetchAllUsersData).toHaveBeenCalledWith();
    });

    // Simulate clicking the 'Add New User' link
    const addUserButton = getByTestId('AddUser');
    fireEvent.click(addUserButton);
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    // Validate if the 'AddUserModal' component is rendered after clicking the 'Add New User' link
    
    // Simulate clicking the 'Export to Excel' link
    const exportExcelButton = getByText('Export to Excel');
    fireEvent.click(exportExcelButton);

    // Validate if the export functionality is triggered (optional: validate if XLSX.writeFile function is called)

    // Simulate editing a user
    const allTitles = getAllByTitle('Edit');
    fireEvent.click(allTitles[2]);
    const editData = {
      createdTime: "2023-12-12T14:50:40.000+00:00",
      emailId: "test3@gmail.com",
      firstName: "User",
      lastName: "Ravi",
      loginCounter: 2,
      password: "$2a$10$FRs0/T68uzwGzE1O88H4QeoN0Ok7J5SQ/Pu8UMcP0bV4JHYKZ5f4i",
      updatedTime: null,
      userId: 4,
      userType: "USER",
      accountStatus: "ACTIVE",
    };
   
    fireEvent.click(screen.getByText('Update'));
    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledTimes(1);
      expect(updateUser).toHaveBeenCalledWith(editData);
  });
    // Validate if the 'AddUserModal' component is rendered with the specific user data for editing

    // Simulate deleting a user
    const allDelete = getAllByTitle('Delete');
    fireEvent.click(allDelete[2]);
    const deleteData = {
      userId: 4,
      userType: 'ADMIN'
    };
    await waitFor(() => {
        expect(deleteUser).toHaveBeenCalledTimes(1);
        expect(deleteUser).toHaveBeenCalledWith(deleteData);
    });

     // Wait for data to load and check if elements are rendered
     await screen.findByText('User Management');
     expect(screen.getByText('User Management')).toBeInTheDocument();
     expect(screen.getByText('Hello admin@gmail.com')).toBeInTheDocument();
     expect(screen.getByText('Login Counter : 33')).toBeInTheDocument();
 
     // Mock logout action and check if it's triggered
     fireEvent.click(screen.getByText('Logout'));
  });


  it('renders Admin Dashboard and handles save flow', async () => {
    const userData = {
      emailId: 'test@example.com',
      password: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      accountStatus: 'ACTIVE',
      createdTime: ""
    };
    const mockData =
      {
        "email": "admin@gmail.com",
        "userType": "ADMIN",
        "loginCounter": 33,
        "id": 1,
        "userList": [
            {
                "userId": 1,
                "userType": "ADMIN",
                "emailId": "admin@gmail.com",
                "password": "$2a$10$uIC04oNIYTY7q2/1mSlKyOPNAuYqAqNVICx4h/okTYqc5ZoJb9RWG",
                "firstName": "admin",
                "lastName": "admin",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-12T07:26:32.000+00:00",
                "updatedTime": null,
                "loginCounter": 33
            },
            {
                "userId": 3,
                "userType": "USER",
                "emailId": "test2@gmail.com",
                "password": "$2a$10$ZMzZPWI9G.DU04b6FfYFauKahL7OZ.VnofKEXijQsY8Wr1J4mrc1m",
                "firstName": "User",
                "lastName": "Ravi",
                "accountStatus": "ACTIVE",
                "createdTime": "2023-12-12T10:45:38.000+00:00",
                "updatedTime": null,
                "loginCounter": 0
            }
        ]
      };
      const mockResponse = {
        status: 200,
      
      };
  
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);
    fetchAllUsersData.mockResolvedValueOnce({ data: mockData });
    userRegister.mockResolvedValueOnce(mockResponse);
    const { getByText ,getByTestId} = render(
      <MemoryRouter>
        <AdminDashBoard />
      </MemoryRouter>
    );
    const addUserButton = getByTestId('AddUser');
    fireEvent.click(addUserButton);
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email Id');
    

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    

    const submitButton = getByText('Add');
    fireEvent.click(submitButton);
    await waitFor(() => {
        expect(userRegister).toHaveBeenCalledWith(userData);
    });
  });

});

