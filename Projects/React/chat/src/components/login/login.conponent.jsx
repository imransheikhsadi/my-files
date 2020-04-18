import React from 'react';
import './login-style.scss';

function Login() {
    return (
        <div className="login">
            <h2>Login</h2>
            <div className="user-icon">
                <span class="material-icons"> person </span>
            </div>
            <div className="content-wraper">
                <input placeholder="Your Name" type="text" />
                <button>Submit</button>
            </div>
        </div>
    )
}

export default Login;
