export const addItemToCart = (preCarts,cartToAdd) =>{
    const existingCart = preCarts.find(preCart => preCart.id === cartToAdd.id);

    if (existingCart) {
        return preCarts.map(preCart=>
            preCart.id === cartToAdd.id
            ? {...preCart,quantity: preCart.quantity + 1}
            : preCart
            )
    }

    return [...preCarts,{...cartToAdd,quantity: 1}]
}

export const decreaseItemFromCart = (cartItems,cartItemToRemove) =>{
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id 
    )

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map( cartItem =>
        cartItem.id === cartItemToRemove.id 
        ? {...cartItem,quantity: cartItem.quantity - 1}
        : cartItem
    )
}