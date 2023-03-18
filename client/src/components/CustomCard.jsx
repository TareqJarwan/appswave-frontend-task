import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    CardActionArea,
    Button,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const CustomCard = ({
    cart,
    product,
    // addProduct,
    // updateProduct,
    // removeItemFromCart,
}) => {
    return (
        <Card className="custom-card">
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="260"
                    className="card-image"
                    image={product.imageUrl}
                    title="Contemplative Reptile"
                />
                <CardContent className="content" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        className="title"
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {product.name}
                    </Typography>

                    <Typography
                        className="basket-item-price"
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        ${product.price}
                    </Typography>

                </CardContent>
            </CardActionArea>
            {cart && (
                <CardActions>
                    <Typography
                        className="basket-item-price"
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {product.price}
                    </Typography>
                </CardActions>
            )}
            <CardActions className="actions-content">
                {!cart && (
                    <Button
                        size="large"
                        variant="contained"
                        className="custom-button"
                        onClick={() => {
                            // addProduct(product.id, 1);
                        }}
                    >
                        <ShoppingCartIcon /> Add to Cart
                    </Button>
                )}
                {cart && (
                    <>
                        <Button
                            size="small"
                            color="secondary"
                            variant="outlined"
                            onClick={() => {
                                // removeItemFromCart(product.id);
                            }}
                        >
                            Remove
                        </Button>
                        <>
                            <Button
                                size="small"
                                variant="outlined"
                                className="increase-product-quantity"
                                onClick={() => {
                                    // updateProduct(product.id, product.quantity + 1);
                                }}
                            >
                                +
                            </Button>
                            <Typography>&nbsp;{product.quantity}&nbsp;</Typography>
                            <Button
                                size="small"
                                color="secondary"
                                variant="outlined"
                                onClick={() => {
                                    // updateProduct(product.id, product.quantity - 1);
                                }}
                            >
                                -
                            </Button>
                        </>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default CustomCard;
