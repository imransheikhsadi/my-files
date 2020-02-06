import React from 'react';
import './checkout-page.style.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartPrice } from '../../redux/cart/cart.selectors';
import { connect } from 'react-redux';
import CheckoutItem from '../../components/checkout_item/CheckoutItem.component';

const CheckoutPage = ({ cartItems, total }) => {
    return <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => (
                <CheckoutItem cartItem={cartItem} key={cartItem.id}/>
            ))
        }
        <div className="total"><span>Total: ${total}</span></div>
    </div>
}

const mapStateTProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartPrice
});

export default connect(mapStateTProps)(CheckoutPage);