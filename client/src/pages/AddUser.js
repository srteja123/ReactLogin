import { useEffect, useState } from 'react';
import validator from 'validator';
import './../AdminDashboard.css';



const AddUserModal = ({ onSave, onCancel, userData: initialUserData, onUpdate }) => {

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    accountStatus:'ACTIVE',
    createdTime:''
  });
  const [errorEmail, setEmailError] = useState({
    error: true,
    success: false
  });
  const [firstNameValue, setFirstName] = useState('');
  const [lastNameValue, setLastName] = useState('');
  const [emailValue, setEmail] = useState('');
  const [errorFirstName, setFirstNameError] = useState({
    error: true,
    success: false
});
const [errorLastName, setLastNameError] = useState({
    error: true,
    success: false
});
  const handleInputChange = (e) => {
    e.persist();
    setUserData(userData => ({
      ...userData,
      [e.target.name]: e.target.value
    }));
    if (e.target.name === 'emailId') {
      var email = e.target.value;
      setEmail(email);
      if (!validator.isEmail(email)) {
        setEmailError({ error: true, success: false });
      } else {
        setEmailError({ error: false, success: true });
      }
    }
    if (e.target.name === 'firstName') {
      setFirstName(e.target.value);
      if (e.target.value === "") {
          setFirstNameError({ error: true, success: false });
      }else{
          setFirstNameError({ error: false, success: true });
      }
  }

  if (e.target.name === 'lastName') {
      setLastName(e.target.value);
      if (e.target.value === "") {
          setLastNameError({ error: true, success: false });
      }else{
          setLastNameError({ error: false, success: true });
      }
  }

  };

  const handleSaveOrUpdate = () => {
  if (initialUserData) {
    //For editing existing user
    onUpdate(userData);
  }else{
    //For new user
  if(firstNameValue === ''){
      setFirstNameError({ error: true, success: false });
  }else if(lastNameValue === ''){
      setLastNameError({ error: true, success: false });
  }else if(emailValue === ''){
      setEmailError({ error: true, success: false });
  }else{
    userData.password = userData.emailId;
    onSave(userData);
  }
  }

  };

  useEffect(() => {
    setEmailError({ error: false, success: true });
    setFirstNameError({ error: false, success: true });
    setLastNameError({ error: false, success: true });
    if (initialUserData) {
      setUserData(initialUserData);
    }
  }, [initialUserData]);
  return (
    <div id="addUserModal" className='table-wrapper'>
      <div className="modal-content">
        <form>
          <div className="modal-header">
            <h4 className="table-title">{initialUserData ? 'Edit User' : 'Add New User'}</h4>
          </div>
          <div className="table">
            <div className="form-group">
              <input type="text" className="form-control" name="firstName" value={userData.firstName} onChange={handleInputChange} placeholder="First Name" required />
            </div>
            <br/>
            <div className="form-group">
              <input type="text" className="form-control" name="lastName" value={userData.lastName} onChange={handleInputChange} placeholder="Last Name" required />
            </div>
            <br/>
            <div className="form-group">
              <input type="email" className="form-control" name="emailId" value={userData.emailId} onChange={handleInputChange} placeholder="Email Id" required />
            </div>
            <br/>
            <div className="form-group">
              <div>
                <input type="radio" id="active" name="accountStatus" value="ACTIVE" checked={userData.accountStatus === 'ACTIVE'} onChange={handleInputChange} />
                <label htmlFor="active">Active</label>
              </div>
              <div>
                <input type="radio" id="inactive" name="accountStatus" value="INACTIVE" checked={userData.accountStatus === 'INACTIVE'} onChange={handleInputChange} />
                <label htmlFor="inactive">Inactive</label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <input type="button" className="btn btn-default" data-dismiss="modal" onClick={onCancel} value="Cancel" />
            <input type="button" className="btn btn-success" value={initialUserData ? 'Update' : 'Add'} onClick={handleSaveOrUpdate} />
          </div>
          <p className="text-error">{errorEmail.error ? "Please enter a valid email format" : null}</p>
          <p className="text-error">{errorFirstName.error ? "Please enter a valid first name" : null}</p>
          <p className="text-error">{errorLastName.error ? "Please enter a valid last name" : null}</p>
        </form>
      </div>
    </div>


  );
};

export default AddUserModal;
