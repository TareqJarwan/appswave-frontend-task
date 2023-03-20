// Packages
import React from "react";

// MUI Packages
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// MUI Icons
import {
  AddShoppingCart,
  FavoriteBorderOutlined,
  Favorite,
} from "@mui/icons-material";
import { useAddItemToCartMutation } from "state/api";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { Alert, Snackbar } from "@mui/material";
import { removeFromWishingList, addToWishingList } from "state";

const ProductItem = ({ data }) => {
  const userId = useSelector((state) => state.global.userId);
  const wishingList = useSelector((state) => state.global.wishingList);
  const theme = useTheme();

  const dispatch = useDispatch();

  const [addItemToCart, { isLoading: addItemToCartLoading, isSuccess }] =
    useAddItemToCartMutation();

  return (
    <>
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 300, padding: "20px", objectFit: "fill" }}
          src={data.imageUrl}
          alt={data.title}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: "0.5rem",
          }}
        >
          <Typography variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography color={theme.palette.secondary[400]}>
            ${Number(data.price).toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              addItemToCart({ userId, productId: data._id, quantity: 1 })
            }
          >
            <Tooltip title="Add to cart">
              {addItemToCartLoading ? <Spinner /> : <AddShoppingCart />}
            </Tooltip>
          </Button>
          {wishingList?.includes(data._id) ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => dispatch(removeFromWishingList(data._id))}
            >
              <Tooltip title="Remove from wishlist">
                <Favorite />
              </Tooltip>
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => dispatch(addToWishingList(data._id))}
            >
              <Tooltip title="Add to wishlist">
                <FavoriteBorderOutlined />
              </Tooltip>
            </Button>
          )}
        </CardActions>
      </Card>
      <Snackbar open={isSuccess} autoHideDuration={2000}>
        <Alert
          variant="filled"
          severity="success"
          sx={{ width: "100%", color: "white" }}
        >
          Product successfully added to your cart
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductItem;
