const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    purchaseID: {
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
    supplierName: {
      type: String,
      required: true,
    },
    supplierContact: {
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
    purchaseDate:{
        type: String,
        required:true
    },
    status:{
      type:String,
      default:"unpaid"
    },
    note:{
        type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
