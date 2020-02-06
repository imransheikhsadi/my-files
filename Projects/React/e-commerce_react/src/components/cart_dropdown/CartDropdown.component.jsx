import React from 'react'
import './cart-dropdown.style.scss'
import { CustomButton } from '../custom_button/CustomButton.component'
import { connect } from 'react-redux'
import CartItem from '../cart_item/CartItem.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import { toggleCartHidden } from '../../redux/cart/cart.action'


function CartDropdown({cartItems,history,dispatch}) {
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
            {   
                cartItems.length ?(
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>))
                : (<span className="empty-message">Cart is Empty</span>)
            }
            </div>
            <CustomButton onClick={()=>{
                history.push('/checkout')
                dispatch(toggleCartHidden())
                }}
            >Go to Checkout</CustomButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));