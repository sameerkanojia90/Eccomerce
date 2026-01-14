const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 0
    },

    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// ✅ SAFE MODEL EXPORT (OverwriteModelError FIX)
module.exports =
  mongoose.models.Product || mongoose.model("Product", prodSchema);
