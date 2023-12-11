import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../api/authenticationService';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import './../App.css';

const RegisterPage = ({ loading, error, ...props }) => {
    const [values, setValues] = useState({
        emailId: '',
        password: '',
        firstName:'',
        lastName:''
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.authenticate();

        userRegister(values).then((response) => {

            console.log("response", response);
            if (response.status === 200) {
                props.history.push('/user/login');
            }
            else {
                props.loginFailure('Something Wrong!Please Try Again');
            }


        }).catch((err) => {

            if (err && err.response) {

                switch (err.response.status) {
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something Wrong!Please Try Again');

                }

            }
            else {
                props.loginFailure('Something Wrong!Please Try Again');
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


    return (
        <div className="signup-form">
            <form onSubmit={handleSubmit} method="post">
                <h2>Register</h2>
                <p className="hint-text">Create your account. It's free and only takes a minute.</p>
                <div className="form-group">
                    <div className="row">
                        <div className="col"><input type="text" value={values.firstName} onChange={handleChange} class="form-control" name="firstName" placeholder="First Name" required="required" /></div>
                        <div className="col"><input type="text" value={values.lastName} onChange={handleChange} class="form-control" name="lastName" placeholder="Last Name" required="required" /></div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="email" value={values.emailId} onChange={handleChange} className="form-control" name="emailId" placeholder="Email" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" value={values.password} onChange={handleChange} className="form-control" name="password" placeholder="Password" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" required="required" />
                </div>
                <div className="form-group">
                    <label className="form-check-label">
                        <input type="checkbox" required="required" />
                        I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success btn-lg btn-block">Register Now</button>
                </div>
            </form>
            <div className="text-center">Already have an account? <a href="/">Sign in</a></div>
        </div>

    );


}

const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        loading:auth.loading,
        error:auth.error
}}


const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage);

