const Order = require("../models/Order");
const Cart = require("../models/Cart");
const sendOrderEmail = require("../utils/sendEmail");

const createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      orderDate: new Date()
    });

    // Clear cart
    await Cart.findOneAndDelete({ user: req.user._id });

    // Send confirmation email
    await sendOrderEmail(order, req.user);

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createOrder, getMyOrders };
