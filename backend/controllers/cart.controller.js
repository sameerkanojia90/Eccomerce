// controllers/cart.controller.js
const Cart = require("../models/cart");

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.user?.id || "USER_OBJECT_ID_HERE";

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });

  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET CART WITH PAGINATION
exports.getCart = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const userId = req.user?.id || "USER_OBJECT_ID_HERE";

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.json({
        items: [],
        totalItems: 0,
        totalPages: 0,
        currentPage: page
      });
    }

    const totalItems = cart.items.length;
    const totalPages = Math.ceil(totalItems / limit);
    const items = cart.items.slice(skip, skip + limit);

    res.json({
      items,
      totalItems,
      totalPages,
      currentPage: page
    });

  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
