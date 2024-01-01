import { format } from 'date-fns';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import { deleteUser, fetchAllUsersData, updateUser, userRegister } from '../api/authenticationService';
import './../AdminDashboard.css';
import AddUserModal from './AddUser';



const MainWrapper=styled.div`
    padding-top:40px;
`;

const AdminDashboard=()=>{
const navigate=useNavigate();
    const [data,setData]=useState({});
    const [adminData,setAdminData]=useState({});
    
    const [userToEdit,setEditUser]=useState({});

    const [page, setPage] = useState(0);
    const [filterData, setFilterData] = useState();
    const [disableIcons, setDisableIcons] = useState(false);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [errorResponse, setErrorResponse] = useState({
        error: false,
        message: ''
    });
    const n = 3
    React.useEffect(()=>{
   //if some one is trying to access /dashboard without token redirect them to login page
        if(localStorage.getItem('USER_KEY') == null){
            navigate('/');
        }
        fetchAllUsersData().then((response)=>{
            localStorage.setItem('USER_TYPE','ADMIN')
            setData(response.data.userList);
            setAdminData(response.data);
            setFilterData(
                response.data.userList.filter((item, index) => {
                  return (index >= page * n) & (index < (page + 1) * n);
                }))
        }).catch((err)=>{
            if (err && err.response) {
                setErrorResponse({error: true, message :err.response.data.message});
            }
            else {
                setErrorResponse({error: true, message :err.message});
            }
        })
    },[navigate,page])
      // Function to export data to Excel
const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    XLSX.writeFile(workbook, 'user_data.xlsx');
};

const handleAddUser = () => {
    setIsAddingUser(true);
    setIsEditingUser(false);
    setDisableIcons(true);
};

const handleSaveUser = (userData) => {
    userRegister(userData).then((response) => {
        if (response.status === 200) {
            setDisableIcons(false);
            window.location.reload();
        }
        else {
            setErrorResponse({error: true, message :response.message});
        }
    }).catch((err) => {
        if (err && err.response) {
            setErrorResponse({error: true, message :err.response.data.message});
        }
        else {
            setErrorResponse({error: true, message :err.message});
        }
    });
    setIsAddingUser(false);
};
const handleUpdateUser = (userData) => {
    updateUser(userData).then((response) => {
        if (response.status === 200) {
            window.location.reload();
            setDisableIcons(false);
        }
        else {
            setErrorResponse({error: true, message :response.message});
        }
    }).catch((err) => {
        if (err && err.response) {
            setErrorResponse({error: true, message :err.response.data.message});
        }
        else {
            setErrorResponse({error: true, message :err.message});
        }
    });
    setIsEditingUser(false);
};

const handleCancelAddUser = () => {
    setIsAddingUser(false);
    setIsEditingUser(false);
    setDisableIcons(false);
};
const editUserData = (userId) => {
    const editUser=data.filter((item) => item.userId === userId)
    if(editUser){
        setEditUser(
            editUser[0]
            );
    }
    setIsEditingUser(true);
    setDisableIcons(true);
    };
const handleDeleteUser = (userId) => {
    const userData = {
        userId: userId,
        userType: adminData && adminData.userType ? adminData.userType : ''
    };
    deleteUser(userData).then((response) => {
        if (response.status === 200) {
            setFilterData(
                response.data.filter((item, index) => {
                  return (index >= page * n) & (index < (page + 1) * n);
                }))
        }
        else {
            setErrorResponse({error: true, message :response.message});
        }
    }).catch((err) => {
        if (err && err.response) {
            setErrorResponse({error: true, message :err.response.data.message});
        }
        else {
            setErrorResponse({error: true, message :err.message});
        }
    });
};
    const logOut=()=>{

        localStorage.clear();
        navigate('/');

    };

    return (
    <><div className="container-xl">
        <p className="text-error"><b>{errorResponse.error ? errorResponse.message : null}</b></p>
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-5">
                                <h2>User Management</h2>
                            </div>
                            <div className="col-sm-7">
                                <a href="#addUserModal" onClick={handleAddUser} data-testid="AddUser" className="btn btn-secondary"><i className="material-icons">&#xE147;</i> <span>Add New User</span></a>
                                <a href="#" onClick={exportToExcel} className="btn btn-secondary"><i className="material-icons">&#xE24D;</i> <span>Export to Excel</span></a>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Date Created</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filterData && filterData.map((user) => (
                                <tr>
                                    <td>{user.userId}</td>
                                    <td><a href="#">{user.firstName} {user.lastName}</a></td>
                                    <td>{format(user.createdTime, 'MM/dd/yyyy HH:mm:ss')}</td>
                                    <td>{user.userType}</td>
                                    <td><span className="status text-success">&bull;</span> {user.accountStatus}</td>
                                    <td>
                                      { !disableIcons && <a href="#" className="settings" data-testid={user.userId} id={user.userId} title="Edit" data-toggle="tooltip" onClick={() => editUserData(user.userId)}><i className="material-icons">&#xE254;</i></a>}
                                      { !disableIcons && <a href="#" className="delete" data-testid={user.userId} id={user.userId} title="Delete" data-toggle="tooltip" onClick={() => handleDeleteUser(user.userId)}><i className="material-icons">&#xE5C9;</i></a>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="pagination-text"> <b>Showing {n} of {data && data.length} entries</b></p>
                    <div className="PaginateColor">
                        <ReactPaginate
                            containerClassName={"pagination"}
                            pageClassName={"page-item"}
                            activeClassName={"active"}
                            onPageChange={(event) => setPage(event.selected)}
                            pageCount={data && Math.ceil(data.length / n)}
                            breakLabel="..."
                            previousLabel={"Previous"}
                            nextLabel={"Next"} />   </div>

                </div>
                {isAddingUser &&
                    <AddUserModal onSave={handleSaveUser} onCancel={handleCancelAddUser} />}
                {isEditingUser &&
                    <AddUserModal onSave={handleSaveUser} onCancel={handleCancelAddUser} userData={userToEdit} onUpdate={handleUpdateUser} />}

            </div>
        </div><Container>
                <MainWrapper>
                    <h4 data-testid="display-text">Hello {adminData && `${adminData.email}`}</h4>
                    <h4>Login Counter : {adminData && `${adminData.loginCounter}`}</h4>

                    <Button style={{ marginTop: '5px' }} onClick={() => logOut()}>Logout</Button>
                </MainWrapper>
            </Container></>

    );
}


export default AdminDashboard;
