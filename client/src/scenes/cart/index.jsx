import React from 'react'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import CartList from "components/CartList";

const CartPage = () => {
    return (
        <Container>
            <Typography component="h1" variant="h4" sx={{ pt: "1rem" }}>
                Shopping Cart
            </Typography>
            <CartList />
        </Container>
    )
}

export default CartPage