import express from "express";

import {
  getUserCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "../controllers/cart.controlller.js";

const router = express.Router();

router.route("/:userId").get(getUserCart);
router.route("/:userId").post(addItemToCart);
router.route("/:userId").patch(updateItemQuantity);
router.route("/:userId/:productId").delete(removeItemFromCart);

export default router;
