import React from 'react'
import './login-page.style.scss'
import SignIn from '../../components/sign_in/SignIn.component'
import SignUp from '../../components/sign_up/SignUp.component'

export const LoginPage = () => {
    return (
        <div className="login-page">
           <SignIn/>
           <SignUp/>
        </div>
    )
}
