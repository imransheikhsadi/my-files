import React, { useState } from 'react';
import './login-style.scss';
import { socket } from '../../App';

function Login({setMe}) {
    const [userName,setUserName] = useState('');

    function handleChange(event) {
        setUserName(event.target.value);
    }
    function handleSubmit() {
       socket.emit('addUser',{name: userName});
       setMe(userName);
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <div className="user-icon">
                <span className="material-icons"> person </span>
            </div>
            <div className="content-wraper">
                <input onChange={handleChange} placeholder="Your Name" type="text" />
                <button onClick={handleSubmit} >Submit</button>
            </div>
        </div>
    )
}

export default Login;
