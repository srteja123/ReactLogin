import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../api/authenticationService';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import './../App.css';


const LoginPage = ({ loading, error, ...props }) =>{
    const [values, setValues] = useState({
        emailId: '',
        password: '',
    });
    
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.authenticate();

        userLogin(values).then((response) => {

            console.log("response", response);
            if (response.status === 200) {
                props.setUser(response.data);
                props.history.push('/dashboard/view');
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
        return(
            <div className="signup-form">
                <form onSubmit={handleSubmit} method="post">
                    <h2>Login</h2>
                    <div className="form-group">
                        <input type="email" value={values.emailId} onChange={handleChange} class="form-control" name="emailId" placeholder="Email" required="required" />
                    </div>
                    <div className="form-group">
                        <input type="password" value={values.password} onChange={handleChange} className="form-control" name="password" placeholder="Password" required="required" />
                    </div>
                    <div className="form-group">
                        <label className="form-check-label">
                            <input type="checkbox" required="required"/> 
                              Remember Me
                            </label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success btn-lg btn-block">Login</button>
                    </div>
                </form>
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


export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);