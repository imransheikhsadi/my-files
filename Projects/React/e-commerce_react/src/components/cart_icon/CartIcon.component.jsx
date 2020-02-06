import React from 'react';
import { ReactComponent as ShopingIcon } from '../../assets/shoping-bag.svg';
import './cart-icon.style.scss';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.action';
import { selectCartItemCount } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

const CartIcon = ({ toggleCartHidden, cartLength }) => {
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShopingIcon className="shoping-icon" />
            <span className="item-count">{cartLength}</span>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartLength: selectCartItemCount
})

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
