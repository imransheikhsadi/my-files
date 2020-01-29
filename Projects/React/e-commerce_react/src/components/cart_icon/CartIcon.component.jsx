import React from 'react'
import {ReactComponent as ShopingIcon} from '../../assets/shoping-bag.svg'
import './cart-icon.style.scss'

const CartIcon = () => {
    return (
        <div className="cart-icon">
            <ShopingIcon className="shoping-icon"/>
            <span className="item-count">0</span>
        </div>
    )
}

export default CartIcon;
