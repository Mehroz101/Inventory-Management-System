const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productName: {
      type: String,
      required: true,
    },
    productID: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isRawData: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
