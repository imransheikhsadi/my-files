import React from 'react';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import './header.style.scss';
import { Link} from 'react-router-dom';
import {auth} from '../../firebasse/firebase.utils'
import { connect } from 'react-redux';

const Header = ({currentUser}) => {
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/contact">
                    CONTACT
                </Link>
               {
                   currentUser ? <div onClick={()=> auth.signOut()} className="option">SIGN OUT</div>:
                    <Link className="option" to="/login">
                        SIGN-IN
                    </Link>
               }
            </div>
        </div>
    )
}

const mapStateToProps = state =>({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
