import React from 'react';
import './cart-item.style.scss';

const CartItem = ({item: {imageUrl,name,quantity,price}}) => {
    return <div className="cart-item">
        <img src={imageUrl} alt="Cart" className="image" />
        <div className="cart-details">
            <span className="name">{name}</span>
            <span className="price">{quantity} x ${price}</span>
        </div>
    </div>
}

export default CartItem;