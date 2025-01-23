const mongoose = require("mongoose");
const productSizeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productSizeID: {
      type: Number,
      required: true,
    },
    productSizeName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductSize", productSizeSchema);
