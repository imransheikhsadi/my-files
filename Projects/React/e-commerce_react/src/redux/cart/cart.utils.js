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