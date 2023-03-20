import Cart from "../mongodb/models/cart.js";

const createUserCart = async (req, res) => {
  try {
    const cart = new Cart({
      user_id: req.params.userId,
    });
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// Get a user's cart
const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.userId }).populate(
      "products.product"
    );
    if (cart) {
      res.status(200).json(cart);
    } else {
      await createUserCart(req, res);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateItemQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOneAndUpdate({ user_id: req.params.userId });

    const item = cart?.products?.find((item) => item.product.equals(productId));
    if (item) {
      item.quantity = quantity;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add an item to the cart
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOneAndUpdate({ user_id: req.params.userId });

    const item = cart?.products?.find((item) => item.product.equals(productId));
    if (item) {
      item.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity: Number(quantity) });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove an item from the cart
const removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.userId });
    cart.products = cart.products.filter(
      (item) => !item.product.equals(req.params.productId)
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getUserCart, addItemToCart, removeItemFromCart, updateItemQuantity };
