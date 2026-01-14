const Product = require("../models/products");


exports.createProduct = async (req, res) => {
  try {
    const {
      ProductName,
      ProductPrice,
      ProductQuantity,
      ProductDescription
    } = req.body;

    if (
      !ProductName ||
      !ProductPrice ||
      !ProductQuantity ||
      !ProductDescription
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const product = await Product.create({
      name: ProductName,
      price: ProductPrice,
      quantity: ProductQuantity,
      description: ProductDescription
    });

    return res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return res.status(500).json({
      message: "Product creation failed"
    });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json(products);

  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch products"
    });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Product ID is required"
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return res.status(500).json({
      message: "Product deletion failed"
    });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Product ID is required"
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return res.status(500).json({
      message: "Product update failed"
    });
  }
};
