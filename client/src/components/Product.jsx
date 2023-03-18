import React from 'react'
import CustomCard from './CustomCard';

const Product = ({
    cart,
    product,
    // addProduct,
    // removeItemFromCart
}) => {
    return (
        <CustomCard
            cart={cart}
            product={product}
        // addProduct={addProduct}
        // removeItemFromCart={removeItemFromCart}
        />
    )
}

export default Product