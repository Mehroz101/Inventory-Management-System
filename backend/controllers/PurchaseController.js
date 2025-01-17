const Category = require("../models/Category");
const Product = require("../models/Product");
const Purchases = require("../models/Purchases");

const addPurchase = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.body);
    const {
      purchaseId,
      productId,
      productName,
      categoryId,
      categoryName,
      productPrice,
      supplierName,
      supplierContact,
      productQuantity,
      paidAmount,
      remainingAmount,
      Note,
      purchaseDate,
    } = req.body;
    if (purchaseId === null) {
      // Generate the next ProductID
      const lastPurchase = await Purchases.findOne().sort({ purchaseID: -1 });
      const nextPurchaseID = lastPurchase ? lastPurchase.purchaseID + 1 : 1;
      const invoiceNumber = await Purchases.findOne().sort({ invoiceNo: -1 });
      const nextInvoiceNumber = invoiceNumber ? invoiceNumber.invoiceNo + 1 : 1;
      let status = "unpaid";
      if (remainingAmount === 0) {
        status = "paid";
      }
      const purchase = await Purchases.create({
        purchaseID: nextPurchaseID,
        invoiceNo: nextInvoiceNumber,
        userId: userId,
        productID: productId,
        productName: productName,
        categoryID: categoryId,
        categoryName: categoryName,
        productPrice,
        supplierName,
        supplierContact,
        productQuantity,
        paidAmount,
        remainingAmount,
        note: Note,
        status: status,
        purchaseDate,
      });
      if (purchase) {
        const isProduct = await Product.findOne({ productID: productId });
        isProduct.quantity = isProduct.quantity + productQuantity;
        isProduct.save();
        res.status(201).json({
          success: true,
          message: "Purchase added successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Purchase not added",
        });
      }
    } else {
      const editPurchase = await Purchases.findOne({
        userId: userId,
        purchaseID: purchaseId,
      });

      let status = "unpaid";
      if (remainingAmount === 0) {
        status = "paid";
      }

      if (editPurchase) {
        const previousProductId = editPurchase.productID;
        const previousQuantity = editPurchase.productQuantity;

        // If the product has changed
        if (productId !== previousProductId) {
          // Remove quantity from the previous product
          const previousProduct = await Product.findOne({
            productID: previousProductId,
          });
          if (previousProduct) {
            previousProduct.quantity -= previousQuantity; // Add back the previous quantity
            await previousProduct.save();
          }

          // Add quantity to the new product
          const newProduct = await Product.findOne({
            productID: productId,
          });
          if (newProduct) {
            newProduct.quantity += productQuantity; // Deduct the new quantity
            await newProduct.save();
          }
        } else {
          // If the product remains the same, just adjust the quantity
          const currentProduct = await Product.findOne({
            productID: previousProductId,
          });
          if (currentProduct) {
            currentProduct.quantity -= previousQuantity; // Add back the previous quantity
            currentProduct.quantity += productQuantity; // Deduct the new quantity
            await currentProduct.save();
          }
        }

        // Update the purchase details
        editPurchase.userId = userId;
        editPurchase.productID = productId;
        editPurchase.productName = productName;
        editPurchase.categoryID = categoryId;
        editPurchase.categoryName = categoryName;
        editPurchase.productPrice = productPrice;
        editPurchase.supplierName = supplierName;
        editPurchase.supplierContact = supplierContact;
        editPurchase.productQuantity = productQuantity;
        editPurchase.paidAmount = paidAmount;
        editPurchase.remainingAmount = remainingAmount;
        editPurchase.note = Note;
        editPurchase.status = status;
        editPurchase.purchaseDate = purchaseDate;

        await editPurchase.save();

        res.status(201).json({
          success: true,
          message: "Purchase updated successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Purchase not found",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deletePurchase = async (req, res) => {
  try {
  } catch (error) {}
};
const updatePurchase = async (req, res) => {
  try {
  } catch (error) {}
};
const GetPurchase = async (req, res) => {
  try {
    const userId = req.user.id;
    const purchases = await Purchases.find({ userId: userId });

    if (purchases.length > 0) {
      // Use Promise.all to fetch product and category details for all purchases
      const sendData = await Promise.all(
        purchases.map(async (purchase) => {
          return {
            purchaseID: purchase.purchaseID,
            invoiceNo: purchase.invoiceNo,
            productId: purchase.productID, // Keep the product ID
            productName: purchase.productName, // Get product name
            categoryId: purchase.categoryID, // Keep the category ID
            categoryName: purchase.categoryName, // Get category name
            productPrice: purchase.productPrice,
            supplierName: purchase.supplierName,
            supplierContact: purchase.supplierContact,
            productQuantity: purchase.productQuantity,
            paidAmount: purchase.paidAmount,
            remainingAmount: purchase.remainingAmount,
            Note: purchase.note,
            purchaseDate: purchase.purchaseDate,
            status: purchase.status,
          };
        })
      );

      // Send the response with the constructed data
      res.status(200).json({ success: true, data: sendData });
    } else {
      res.status(200).json({ success: false, message: "No purchases found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const GetPurchaseData = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const purchase = await Purchases.findOne({
      userId: userId,
      purchaseID: id,
    });
    if (purchase) {
      // Use Promise.all to fetch product and category details for all purchases
      const sendData = {
        invoiceNo: purchase.invoiceNo,
        purchaseID: purchase.purchaseID,
        invoiceNo: purchase.invoiceNo,
        productId: purchase.productID, // Keep the product ID
        productName: purchase.productName, // Get product name
        categoryId: purchase.categoryID, // Keep the category ID
        categoryName: purchase.categoryName, // Get category name
        productPrice: purchase.productPrice,
        supplierName: purchase.supplierName,
        supplierContact: purchase.supplierContact,
        productQuantity: purchase.productQuantity,
        paidAmount: purchase.paidAmount,
        remainingAmount: purchase.remainingAmount,
        Note: purchase.note,
        purchaseDate: purchase.purchaseDate,
        status: purchase.status,
      };
      // Send the response with the constructed data
      res.status(200).json({ success: true, data: sendData });
    } else {
      res.status(404).json({ success: false, message: "Purchase not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  deletePurchase,
  updatePurchase,
  addPurchase,
  GetPurchase,
  GetPurchaseData,
};
