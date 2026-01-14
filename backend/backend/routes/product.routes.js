const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct
} = require("../controllers/product.controller");


router.post("/products", createProduct);

router.get("/products", getAllProducts);

router.delete("/products/:id", deleteProduct);

router.put("/products/:id", updateProduct);

module.exports = router;
