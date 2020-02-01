import React from 'react';
import {ReactComponent as ShopingIcon} from '../../assets/shoping-bag.svg';
import './cart-icon.style.scss';
import {connect} from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.action';

const CartIcon = ({toggleCartHidden}) => {
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShopingIcon className="shoping-icon"/>
            <span className="item-count">0</span>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>({
    toggleCartHidden: ()=> dispatch(toggleCartHidden())
})

export default connect(null,mapDispatchToProps)(CartIcon);
