import React from 'react';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import './header.style.scss';
import { Link} from 'react-router-dom';
import {auth} from '../../firebasse/firebase.utils'
import { connect } from 'react-redux';
import CartIcon from '../cart_icon/CartIcon.component';
import CartDropdown from '../cart_dropdown/CartDropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

const Header = ({currentUser,hidden}) => {
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
               <CartIcon/>
            </div>
            {
                hidden ? null :
                <CartDropdown/>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
