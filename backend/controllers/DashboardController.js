const Product = require("../models/Product");
const Purchases = require("../models/Purchases");
const Sales = require("../models/Sales");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId

const GetDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the current date and the date 30 days ago
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // Fetch sales data for the last 30 days
    const SalesData = await Sales.find({
      userId: userId,
      saleDate: {
        $gte: thirtyDaysAgo.toISOString(),
        $lte: today.toISOString(),
      }, // Filter by last 30 days
    });

    // Calculate revenue, receivable, and number of sales
    const revenue = SalesData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.productPrice;
    }, 0);
    const receivable = SalesData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.remainingAmount;
    }, 0);
    const noOfSales = SalesData.length;

    // Fetch purchase data for the last 30 days
    const PurchaseData = await Purchases.find({
      userId: userId,
      purchaseDate: {
        $gte: thirtyDaysAgo.toISOString(),
        $lte: today.toISOString(),
      }, // Filter by last 30 days
    });

    // Calculate total purchase and payable
    const purchase = PurchaseData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.productPrice;
    }, 0);
    const payable = PurchaseData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.remainingAmount;
    }, 0);

    // Calculate profit
    const profit = revenue - purchase;

    // Send the response
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
          Purchase: purchase,
        },
        {
          Receivable: receivable,
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
        isRawData: product.isRawData,
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

    // Convert startDate and endDate strings to Date objects
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

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
    if (startDateObj && endDateObj) {
      // Both dates are provided
      purchaseDateConditions.purchaseDate = {
        $gte: startDateObj.toISOString(),
        $lte: endDateObj.toISOString(),
      };
    } else if (startDateObj) {
      // Only startDate is provided
      purchaseDateConditions.purchaseDate = {
        $gte: startDateObj.toISOString(),
      };
    } else if (endDateObj) {
      // Only endDate is provided
      purchaseDateConditions.purchaseDate = {
        $lte: endDateObj.toISOString(),
      };
    }

    // Handle date conditions for sales
    const saleDateConditions = {};
    if (startDateObj && endDateObj) {
      // Both dates are provided
      saleDateConditions.saleDate = {
        $gte: startDateObj.toISOString(),
        $lte: endDateObj.toISOString(), // Fixed typo: endDatetoISOString() -> endDateObj.toISOString()
      };
    } else if (startDateObj) {
      // Only startDate is provided
      saleDateConditions.saleDate = {
        $gte: startDateObj.toISOString(),
      };
    } else if (endDateObj) {
      // Only endDate is provided
      saleDateConditions.saleDate = {
        $lte: endDateObj.toISOString(),
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
    console.log("Sales Data:", salesData);

    const SalesData = await Sales.find({
      ...matchConditions,
      ...saleDateConditions,
    });
    const revenue = SalesData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.productPrice;
    }, 0);
    const receivable = SalesData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.remainingAmount;
    }, 0);
    const noOfSales = SalesData.length;

    const PurchaseData = await Purchases.find({
      ...matchConditions,
      ...purchaseDateConditions,
    });
    const purchase = PurchaseData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.productPrice;
    }, 0);
    const payable = PurchaseData.reduce((initialValue, currentValue) => {
      return initialValue + currentValue.remainingAmount;
    }, 0);
    const profit = revenue - purchase;

    const totaldata = [
      {
        title: "Revenue",
        amount: revenue,
      },
      {
        title: "Payable",
        amount: payable,
      },
      {
        title: "Profit",
        amount: profit,
      },
      {
        title: "Sales",
        amount: noOfSales,
      },
      {
        title: "Receivable",
        amount: receivable,
      },
      {
        title: "Purchases",
        amount: purchase,
      },
    ];

    // Log sales data
    const senddata = {
      productStock,
      purchases: purchasesData,
      sales: salesData,
      totaldata: totaldata,
    };

    res.status(201).json({ success: true, data: senddata });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const GetMonthlyData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the current date and the start of the month
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Fetch sales data for the current month
    const SalesData = await Sales.find({
      userId: userId,
      saleDate: { $gte: startOfMonth.toISOString(), $lte: today.toISOString() },
    });

    // Fetch purchase data for the current month
    const PurchaseData = await Purchases.find({
      userId: userId,
      purchaseDate: {
        $gte: startOfMonth.toISOString(),
        $lte: today.toISOString(),
      },
    });

    // Group sales and purchases by day
    const dailySales = {};
    const dailyPurchases = {};

    SalesData.forEach((sale) => {
      const saleDate = new Date(sale.saleDate).toISOString().split("T")[0]; // Extract YYYY-MM-DD
      if (!dailySales[saleDate]) {
        dailySales[saleDate] = 0;
      }
      dailySales[saleDate] += sale.productPrice;
    });

    PurchaseData.forEach((purchase) => {
      const purchaseDate = new Date(purchase.purchaseDate)
        .toISOString()
        .split("T")[0]; // Extract YYYY-MM-DD
      if (!dailyPurchases[purchaseDate]) {
        dailyPurchases[purchaseDate] = 0;
      }
      dailyPurchases[purchaseDate] += purchase.productPrice;
    });

    // Combine data into a single array
    const monthlyData = [];
    for (let day = 1; day <= today.getDate(); day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), day)
        .toISOString()
        .split("T")[0];
      const sales = dailySales[date] || 0;
      const purchases = dailyPurchases[date] || 0;
      const profit = sales - purchases;

      monthlyData.push({
        date,
        sales,
        purchases,
        profit,
      });
    }

    res.status(200).json({
      success: true,
      data: monthlyData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  GetDashboardData,
  GetStock,
  UpdateProductStock,
  GenerateReport,
  GetMonthlyData,
};
