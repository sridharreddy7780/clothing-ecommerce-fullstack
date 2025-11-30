const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get user cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { productId, size, qty } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    // check if already same product + size
    const existing = cart.items.find(
      (item) =>
        item.product.toString() === productId && item.size === size
    );

    if (existing) {
      existing.qty += qty;
    } else {
      cart.items.push({
        product: productId,
        name: product.name,
        price: product.price,
        size,
        qty
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update quantity
const updateCart = async (req, res) => {
  try {
    const { itemId, qty } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart empty" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item
const removeItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart empty" });

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeItem
};
