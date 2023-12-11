import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { userLogin } from '../api/authenticationService';
import { authFailure, authSuccess, authenticate } from '../redux/authActions';
import './../App.css';



const LoginPage = ({ loading, error, ...props }) =>{
    const [values, setValues] = useState({
        emailId: '',
        password: '',
    });
    
    const navigate=useNavigate();
    const handleSubmit = (evt) => {
        console.log("Clicked");
        evt.preventDefault();
        props.authenticate();

        userLogin(values).then((response) => {

            console.log("response", response);
            if (response.status === 200) {
                props.setUser(response.data);
                const cookies = new Cookies();
                cookies.set('myToken', response.data.accessToken);
                navigate('/dashboard');
                
            }
            else {
                props.loginFailure('Something Wrong!Please Try Again Login');
            }


        }).catch((err) => {
            console.log(" Error " + err);
            if (err && err.response) {

                switch (err.response.status) {
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something Wrong!Please Try Again error');

                }

            }
            else {
                props.loginFailure('Something Wrong!Please Try Again else');
            }

        });


    }
    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
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
                        <button type="submit" className="btn btn-success btn-lg btn-block">Login</button>
                    </div>
                </form>
                <div className="text-center">Don't have an account? <Link to="/register">Sign Up</Link></div>
            </div>

        );
    
}

const mapStateToProps=({auth})=>{
    console.log("login state ",auth);
    return {
        loading:auth.loading,
        error:auth.error
}}


const mapDispatchToProps=(dispatch)=>{
    console.log("map Dispatch to props ");
    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);