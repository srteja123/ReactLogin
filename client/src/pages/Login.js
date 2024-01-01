import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator';
import { userLogin } from '../api/authenticationService';
import './../App.css';


const LoginPage = ({ loading, error, ...props }) =>{
    const [values, setValues] = useState({
        emailId: '',
        password: '',
    });
    const [errorEmail, setEmailError] = useState({
        error: true,
        success: false
    });
    const [errorResponse, setErrorResponse] = useState({
        error: false,
        message:"",
    });
    useEffect(()=>{
        //Code to be called on load
        setEmailError({ error: false, success: true });
       // setErrorResponse({error: false, message :''});
        }, []);
    const navigate=useNavigate();
    const handleSubmit = (evt) => {
        evt.preventDefault();

        userLogin(values).then((response) => {
            if (response.status === 200) {
                //Setting token in local storage
                localStorage.setItem('USER_KEY',response.data.token);
                const isAdmin = response.data.roles.includes('ADMIN');
                if(isAdmin){
                    navigate('/adminDashboard');
                }else{
                    navigate('/dashboard');
                }
            
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
                setErrorResponse({error: true, message :'Failed Login'});
            }

        });


    }
    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
        if (e.target.name === 'emailId') {
            var email = e.target.value;

            if (!validator.isEmail(email)) {
                setEmailError({ error: true, success: false });
            }else{
                setEmailError({ error: false, success: true });
            }
        }
    };
        return(
            <div className="signup-form">
                <form onSubmit={handleSubmit} method="post">
                    <h2>Login</h2>
                    <div className="form-group">
                        <input type="email" value={values.emailId} onChange={handleChange} className="form-control" name="emailId" placeholder="Email" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="password" value={values.password} onChange={handleChange} className="form-control" name="password" placeholder="Password" required="required" />
                    </div>
                    <div className="form-group">
                        <button type="submit" data-testid="login" className="btn btn-success btn-lg btn-block">Login</button>
                    </div>
                    <p className="text-error">{errorEmail.error ? "Please enter a valid email format" : null}</p>
                    <p className="text-error">{errorResponse.error ? errorResponse.message : null}</p>
                </form>
                <div className="text-center">Don't have an account? <Link to="/register">Sign Up</Link></div>
            </div>

        );
    
}

export default LoginPage;
