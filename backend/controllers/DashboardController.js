const Product = require("../models/Product");
const Purchases = require("../models/Purchases");
const Sales = require("../models/Sales");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId

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
    const profit = revenue - purchase;
    res.status(200).json({
      success: true,
      data: [
        {
          Revenue: revenue,
        },
        {
          Profit: profit,
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
const GenerateReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    // Log the input dates
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // Function to convert date to "DD-MMM-YYYY" format
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, "-");
    };

    // Prepare the match conditions for purchases and sales
    const matchConditions = {
      userId: new ObjectId(userId),
      status: "unpaid",
    };

    // Handle date conditions for purchases
    const purchaseDateConditions = {};
    if (startDate && endDate) {
      // Both dates are provided
      purchaseDateConditions.purchaseDate = {
        $gte: formatDate(startDate),
        $lte: formatDate(endDate),
      };
    } else if (startDate) {
      // Only startDate is provided
      purchaseDateConditions.purchaseDate = {
        $gte: formatDate(startDate),
      };
    } else if (endDate) {
      // Only endDate is provided
      purchaseDateConditions.purchaseDate = {
        $lte: formatDate(endDate),
      };
    }

    // Handle date conditions for sales
    const saleDateConditions = {};
    if (startDate && endDate) {
      // Both dates are provided
      saleDateConditions.saleDate = {
        $gte: formatDate(startDate),
        $lte: formatDate(endDate),
      };
    } else if (startDate) {
      // Only startDate is provided
      saleDateConditions.saleDate = {
        $gte: formatDate(startDate),
      };
    } else if (endDate) {
      // Only endDate is provided
      saleDateConditions.saleDate = {
        $lte: formatDate(endDate),
      };
    }

    // Fetch product stock data without grouping
    const productStock = await Product.find({ userId: userId }).select(
      "productID productName quantity inProcessing"
    );

    // Log product stock data
    console.log("Product Stock Data:", productStock);

    // Fetch purchases data without grouping
    const purchasesData = await Purchases.find({
      ...matchConditions,
      ...purchaseDateConditions,
    }).select(
      "productID productName productQuantity customerName customerContact cityName productPrice paidAmount remainingAmount purchaseDate status"
    );

    // Log purchases data
    console.log("Purchases Data:", purchasesData);

    // Fetch sales data without grouping
    const salesData = await Sales.find({
      ...matchConditions,
      ...saleDateConditions,
    }).select(
      "purchaseID productName productQuantity customerName customerContact cityName productPrice paidAmount remainingAmount saleDate status"
    );
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
    const profit = revenue - purchase;
    const totaldata = [
      {
        title:"Revenue",
        amount:revenue
      },
      {
        title:"Payable",
        amount:payable
      },
      {
        title:"Profit",
        amount:profit
      },
      {
        title:"Sales",
        amount:noOfSales
      },
      {
        title:"Receivable",
        amount:receivable
      },
      {
        title:"Purchases",
        amount:purchase
      }

    ]
    

    // Log sales data
    const data = {
      productStock,
      purchases: purchasesData,
      sales: salesData,
      totaldata: totaldata,
    };

    res.status(201).json({ success: true, data: data });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  GetDashboardData,
  GetStock,
  UpdateProductStock,
  GenerateReport,
};
