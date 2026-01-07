const express = require("express");
const router = express.Router();

const {
  getProducts,
  increaseQty,
  decreaseQty
} = require("../controllers/prod.controller");

// USER PRODUCT ROUTES
router.get("/user/products", getProducts);
router.put("/user/products/increase/:id", increaseQty);
router.put("/user/products/decrease/:id", decreaseQty);

module.exports = router;
