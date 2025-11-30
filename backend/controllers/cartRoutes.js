const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCart,
  removeItem
} = require("../controllers/cartController");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCart);
router.delete("/remove/:id", protect, removeItem);

module.exports = router;
