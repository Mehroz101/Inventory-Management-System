const Product = require("../models/Product");
const Purchases = require("../models/Purchases");
const Sales = require("../models/Sales");

const GetDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const SalesData = await Sales.find({ userId: userId });
    const revenue = SalesData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.productPrice;
    }, 0);
    const receivable = SalesData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.remainingAmount;
    }, 0);
    const noOfSales = SalesData.length;

    const PurchaseData = await Purchases.find({ userId: userId });
    const purchase = PurchaseData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.productPrice;
    }, 0);
    const payable = PurchaseData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.remainingAmount;
    }, 0);

    res.status(200).json({
      success: true,
      data: [
        {
          Revenue: revenue,
        },
        {
          Receivable: receivable,
        },
        {
          Purchase: purchase,
        },
        {
          Payable: payable,
        },
        {
          "No of Sales": noOfSales,
        },
      ],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const GetStock = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ userId: userId });
    const productStock = products.map((product) => {
      return {
        product: product.productName,
        quantity: product.quantity + product.inProcessing,
      };
    });
    res.status(200).json({
      success: true,
      data: productStock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const UpdateProductStock = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const product = await Product.findOne({
      userId: userId,
      productID: productId,
    });
    if (product) {
      const newQuantity = product.quantity + quantity;
      await Product.updateOne(
        { userId: userId, productID: productId },
        { $set: { quantity: newQuantity } }
      );
      res.status(200).json({
        success: true,
        message: "Product Stock Updated Successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = { GetDashboardData, GetStock, UpdateProductStock };
