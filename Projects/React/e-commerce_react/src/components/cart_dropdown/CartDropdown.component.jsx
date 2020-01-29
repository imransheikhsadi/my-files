import React from 'react'
import './cart-dropdown.style.scss'
import { CustomButton } from '../custom_button/CustomButton.component'


export default function CartDropdown() {
    return (
        <div className="cart-dropdown">
            <div className="cart-items"></div>
            <CustomButton>Go to Checkout</CustomButton>
        </div>
    )
}
