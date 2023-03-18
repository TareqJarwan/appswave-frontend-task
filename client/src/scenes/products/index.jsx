import { Container, Grid } from '@mui/material'
import React, { useState } from 'react'
import Product from 'components/Product';

const initProducts = [
    {
        id: 1,
        name: 'Product 1',
        description: 'This is product 1',
        price: 9.99,
        quantity: 1,
        imageUrl: 'https://cdn.chec.io/merchants/20379/assets/yPrQXwJGkRayM7Yl|camara-2.png'
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is product 2',
        price: 14.99,
        quantity: 1,
        imageUrl: 'https://cdn.chec.io/merchants/20379/assets/0Oy2SbxwVaUFfOYI|camra-3.png'
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'This is product 3',
        price: 19.99,
        quantity: 1,
        imageUrl: 'https://cdn.chec.io/merchants/20379/assets/st28H258QibHUwB7|camra-4.png'
    },
    {
        id: 4,
        name: 'Product 4',
        description: 'This is product 4',
        price: 9.99,
        quantity: 1,
        imageUrl: 'https://cdn.chec.io/merchants/20379/assets/yPrQXwJGkRayM7Yl|camara-2.png'
    },
    {
        id: 5,
        name: 'Product 5',
        description: 'This is product 5',
        price: 14.99,
        quantity: 1,
        imageUrl: 'https://cdn.chec.io/merchants/20379/assets/0Oy2SbxwVaUFfOYI|camra-3.png'
    },
    {
        id: 6,
        name: 'Product 6',
        description: 'This is product 6',
        price: 19.99,
        quantity: 1,
        imageUrl: 'https://cdn.chec.io/merchants/20379/assets/st28H258QibHUwB7|camra-4.png'
    },
    {
        id: 7,
        name: 'Product 7',
        description: 'This is product 7',
        price: 9.99,
        quantity: 1,
        imageUrl: 'https://cdn.chec.io/merchants/20379/assets/yPrQXwJGkRayM7Yl|camara-2.png'
    },
    {
        id: 8,
        name: 'Product 8',
        description: 'This is product 8',
        price: 14.99,
        quantity: 1,
        imageUrl: 'https://cdn.chec.io/merchants/20379/assets/0Oy2SbxwVaUFfOYI|camra-3.png'
    },
    {
        id: 9,
        name: 'Product 9',
        description: 'This is product 9',
        price: 19.99,
        quantity: 1,
        imageUrl: 'https://cdn.chec.io/merchants/20379/assets/st28H258QibHUwB7|camra-4.png'
    }
];

const ProductsPage = () => {

    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(initProducts);

    const addProduct = () => {

    }

    return (
        <div>
            <Container sx={{ paddingTop: '120px', paddingBottom: '30px' }}>
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid key={product.id} item xs={12} sm={6} md={3}>
                            <Product
                                product={product}
                                cart={cart}
                            // addProduct={addProduct}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default ProductsPage