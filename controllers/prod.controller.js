const Product = require("../models/prod");

/**
 * USER – GET PRODUCTS WITH PAGINATION
 */
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();

    const products = await Product.find()
      .select("name price quantity description")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      products
    });

  } catch (error) {
    console.error("USER GET PRODUCTS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
};


/**
 * USER – INCREASE QUANTITY
 */
exports.increaseQty = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.quantity += 1;
    await product.save();

    res.status(200).json({
      message: "Quantity increased",
      quantity: product.quantity
    });

  } catch (error) {
    console.error("INCREASE QTY ERROR:", error);
    res.status(500).json({
      message: "Failed to increase quantity"
    });
  }
};


/**
 * USER – DECREASE QUANTITY
 */
exports.decreaseQty = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity <= 0) {
      return res.status(400).json({
        message: "Product out of stock"
      });
    }

    product.quantity -= 1;
    await product.save();

    res.status(200).json({
      message: "Quantity decreased",
      quantity: product.quantity
    });

  } catch (error) {
    console.error("DECREASE QTY ERROR:", error);
    res.status(500).json({
      message: "Failed to decrease quantity"
    });
  }
};
