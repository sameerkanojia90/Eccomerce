// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const { addToCart } = require("../controllers/cart.controller");

router.post("/add", addToCart);

module.exports = router;
