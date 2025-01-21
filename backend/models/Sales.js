const mongoose = require("mongoose");
const saleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    saleID: {
      type: Number,
      required: true,
    },
    invoiceNo: {
      type: Number,
    },
    productID: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    categoryID: {
      type: Number,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    cityID: {
      type: Number,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },
    customerID: {
      type: Number,
      required: true,
    },
    customerContact: {
      type: String,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    remainingAmount: {
      type: Number,
      required: true,
    },
    saleDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unpaid",
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
