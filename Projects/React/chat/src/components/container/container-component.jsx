import React, { useState, useEffect } from 'react';
import './container-style.scss';
import Login from '../login/login.conponent';
import Dashboard from '../dashboard/dashboard';
import { socket } from '../../App';

export default function Container() {
    const [user,setUser] = useState(false);
    const [me,setMe]     = useState('');

    useEffect(()=>{
        socket.on('addUser',(data)=>{
            if (data.success) {
                setUser(true)
            }
        }); 
    },[]);

    return (
        <div className="container">
            {user ? <Dashboard me={me}/> : <Login setMe={setMe}/>}
        </div>
    )
}
