import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator';
import { userRegister } from '../api/authenticationService';
import './../App.css';

const RegisterPage = () => {

    // state for get the password
    const [password, setPassword] = useState('');
    // state for getting confirm password
    const [confirmPassword, setConfirmPassword] = useState('');
     // state for get the password
     const [firstNameValue, setFirstName] = useState('');
     // state for getting confirm password
     const [lastNameValue, setLastName] = useState('');
    const [errorOrSuccess, setPasswordErrorOrSuccess] = useState({
        error: true,
        success: false
    });
    const [errorEmail, setEmailError] = useState({
        error: true,
        success: false
    });
    const [errorFirstName, setFirstNameError] = useState({
        error: true,
        success: false
    });
    const [errorLastName, setLastNameError] = useState({
        error: true,
        success: false
    });
    const [errorResponse, setErrorResponse] = useState({
        error: true,
        message: ''
    });
    const [values, setValues] = useState({
        emailId: '',
        password: '',
        firstName: '',
        lastName: '',
        accountStatus:'ACTIVE'
    });
    const navigate = useNavigate();
    
    useEffect(()=>{
        //Code to be called on load
        setEmailError({ error: false, success: true });
        setFirstNameError({ error: false, success: true });
        setLastNameError({ error: false, success: true });
        setPasswordErrorOrSuccess({ error: false, success: true });
        setErrorResponse({error: false, message :''});
        }, []);

    const handleSubmit = (evt) => {

        evt.preventDefault();
        if(!password.length || !confirmPassword.length){
            setPasswordErrorOrSuccess({ error: true, success: false });
        }else if (password !== confirmPassword) {
            setPasswordErrorOrSuccess({ error: true, success: false });
        }else if(firstNameValue === ''){
            setFirstNameError({ error: true, success: false });
        }else if(lastNameValue === ''){
            setLastNameError({ error: true, success: false });
        }else{
            setPasswordErrorOrSuccess({ error: false, success: true });
            userRegister(values).then((response) => {
                if (response.status === 200) {
                    navigate('/');
                }
                else {
                    setErrorResponse({error: true, message :response.message});
                }
            }).catch((err) => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 403:
                            setErrorResponse({error: true, message :err.response.data.message});
                            break;
                            case 401:
                            setErrorResponse({error: true, message :err.response.data.message});
                                break;
                        default:
                            setErrorResponse({error: true, message :err.response.data.message});
                    }
                }
                else {
                    setErrorResponse({error: true, message:"Failed Registration"});
                }
            });
        }
        
    }
    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
        if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
        if (e.target.name === 'emailId') {
            var email = e.target.value;

            if (!validator.isEmail(email)) {
                setEmailError({ error: true, success: false });
            }else{
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

    const passwordValidation = (e) => {
        e.persist();
        setConfirmPassword(e.target.value);
    };


    return (
        <div className="signup-form">
            <form onSubmit={handleSubmit}  method="post">
                <h2>Register</h2>
                <p className="hint-text">Create your account. It's free and only takes a minute.</p>
                <div className="form-group">
                    <div className="row">
                        <div className="col"><input type="text" value={values.firstName} onChange={handleChange} className="form-control" name="firstName" placeholder="First Name"  /></div>
                        <div className="col"><input type="text" value={values.lastName} onChange={handleChange} className="form-control" name="lastName" placeholder="Last Name" /></div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="email" value={values.emailId} onChange={handleChange} className="form-control" name="emailId" placeholder="Email" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" value={values.password} onChange={handleChange} className="form-control" name="password" placeholder="Password" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" onChange={passwordValidation} name="confirm_password" placeholder="Confirm Password" required="required" />
                </div>
                <div className="form-group">
                    <label className="form-check-label">
                        <input type="checkbox" required="required" />
                        I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit"  data-testid="register" className="btn btn-success btn-lg btn-block">Register Now</button>
                </div>
                <p className="text-error">{errorOrSuccess.error ? "Password doesn't match or the field is empty" : null}</p>
                <p className="text-error">{errorEmail.error ? "Please enter a valid email format" : null}</p>
                <p className="text-error">{errorFirstName.error ? "Please enter a valid first name" : null}</p>
                <p className="text-error">{errorLastName.error ? "Please enter a valid last name" : null}</p>
                <p className="text-error">{errorResponse.error ? errorResponse.message : null}</p>
            </form>

            <div className="text-center">Already have an account?  <Link to="/">Sign in</Link></div>
        </div>

    );


}



export default RegisterPage;
