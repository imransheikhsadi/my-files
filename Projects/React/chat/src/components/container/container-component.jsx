import React from 'react';
import './container-style.scss';
import Login from '../login/login.conponent';
import Dashboard from '../dashboard/dashboard';

export default function Container() {
    return (
        <div className="container">
            <Dashboard/>
        </div>
    )
}
