const Category = require("../models/Category");
const City = require("../models/City");
const Product = require("../models/Product");
const Sales = require("../models/Sales");

// const addSale = async (req, res) => {
//     try {
//       const userId = req.user.id;
//       console.log("User ID:", userId);

//       const {
//         saleId,
//         productId,
//         productName,
//         categoryId,
//         categoryName,
//         productPrice,
//         customerName,
//         customerContact,
//         productQuantity,
//         paidAmount,
//         remainingAmount,
//         Note,
//         saleDate,
//       } = req.body;

//       console.log("Request Body:", req.body);

//       // Check if it's a new sale or an edit
//       if (saleId === null) {
//         // Generate the next SaleID and Invoice Number
//         const lastSale = await Sales.findOne().sort({ saleID: -1 });
//         const nextSaleID = lastSale ? lastSale.saleID + 1 : 1;
//         const invoiceNumber = await Sales.findOne().sort({ invoiceNo: -1 });
//         const nextInvoiceNumber = invoiceNumber ? invoiceNumber.invoiceNo + 1 : 1;

//         let status = remainingAmount === 0 ? "paid" : "unpaid";

//         // Create the new sale
//         const sale = await Sales.create({
//           saleID: nextSaleID,
//           invoiceNo: nextInvoiceNumber,
//           userId: userId,
//           productID: productId,
//           productName: productName,
//           categoryID: categoryId,
//           categoryName: categoryName,
//           productPrice,
//           customerName,
//           customerContact,
//           productQuantity,
//           paidAmount,
//           remainingAmount,
//           note: Note,
//           status: status,
//           saleDate,
//         });

//         console.log("New Sale Created:", sale);

//         if (sale) {
//           const isProduct = await Product.findOne({ productID: productId });
//           console.log("Product Found:", isProduct);

//           if (!isProduct) {
//             return res.status(404).json({
//               success: false,
//               message: "Product not found.",
//             });
//           }

//           const remainingQty = isProduct.quantity - productQuantity;

//           // Check if the remaining quantity is valid
//           if (remainingQty < 0) {
//             res.status(400).json({
//               success: false,
//               message: `You are exceeding the available quantity: ${isProduct.quantity}`,
//             });
//             console.log("Product Quantity :", isProduct.quantity);
//             return;
//           } else {
//             isProduct.quantity = remainingQty;
//             await isProduct.save(); // Ensure to await the save operation
//             return res.status(201).json({
//               success: true,
//               message: "Sale added successfully",
//             });
//           }
//         } else {
//           return res.status(400).json({
//             success: false,
//             message: "Sale not added",
//           });
//         }
//       } else {
//         // Editing an existing sale
//         const editSale = await Sales.findOne({
//           userId: userId,
//           saleID: saleId,
//         });

//         console.log("Editing Sale Found:", editSale);

//         if (!editSale) {
//           return res.status(404).json({
//             success: false,
//             message: "Sale not found",
//           });
//         }

//         const previousProductId = editSale.productID;
//         const previousQuantity = editSale.productQuantity;

//         console.log("Previous Product ID:", previousProductId);
//         console.log("Previous Quantity:", previousQuantity);

//         // Check if the product ID is being changed
//         if (productId !== previousProductId) {
//           return res.status(400).json({
//             success: false,
//             message: "You cannot change the product ID while editing a sale.",
//           });
//         }

//         // Variables to track product updates
//         let previousProduct, newProduct;
//         let previousProductUpdated = false;
//         let newProductUpdated = false;
//   console.log()
//         // If the product remains the same, just adjust the quantity
//         const currentProduct = await Product.findOne({
//           productID: previousProductId,
//         });
//         console.log("Current Product Found:", currentProduct);
//         console.log("Current Product quantity:", currentProduct.quantity);
//         console.log("new quantity:", previousQuantity);

//         if (currentProduct) {
//           currentProduct.quantity += previousQuantity; // Add back the previous quantity
//           currentProduct.quantity -= productQuantity; // Deduct the new quantity
//           newProductUpdated = true; // Mark as updated
//         } else {
//           return res.status(404).json({
//             success: false,
//             message: "Current product not found.",
//           });
//         }

//         // Update the sale details
//         editSale.productID = productId;
//         editSale.productName = productName;
//         editSale.categoryID = categoryId;
//         editSale.categoryName = categoryName;
//         editSale.productPrice = productPrice;
//         editSale.customerName = customerName;
//         editSale.customerContact = customerContact;
//         editSale.productQuantity = productQuantity;
//         editSale.paidAmount = paidAmount;
//         editSale.remainingAmount = remainingAmount;
//         editSale.note = Note;
//         editSale.status = remainingAmount === 0 ? "paid" : "unpaid";
//         editSale.saleDate = saleDate;

//         console.log("Updated Sale Details:", editSale);

//         // Save the sale first
//         await editSale.save(); // Ensure to await the save operation
//         console.log("Sale Updated Successfully");
//         console.log(previousProduct, newProduct);

//         // Now save the product updates if necessary
//         if (previousProductUpdated && previousProduct) {
//           await previousProduct.save(); // Restore previous product quantity
//           console.log("Previous Product Quantity Restored:", previousProduct);
//         }
//         if (newProductUpdated && newProduct) {
//           console.log("Trying to save new product:", newProduct);
//           await newProduct.save(); // Update new product quantity
//           console.log("New Product Quantity Updated:", newProduct);
//         }

//         return res.status(200).json({
//           success: true,
//           message: "Sale updated successfully",
//         });
//       }
//     } catch (error) {
//       console.error("Error occurred:", error.message);
//       return res.status(500).json({
//         success: false,
//         message: "Internal server error",
//       });
//     }
//   };
const addSale = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      saleId,
      productId,
      productName,
      categoryId,
      categoryName,
      cityId,
      cityName,
      productPrice,
      customerName,
      customerContact,
      productQuantity,
      paidAmount,
      remainingAmount,
      Note,
      saleDate,
    } = req.body;
    // Generate the next ProductID
    const lastSale = await Sales.findOne().sort({ saleID: -1 });
    const nextSaleID = lastSale ? lastSale.saleID + 1 : 1;
    const invoiceNumber = await Sales.findOne().sort({ invoiceNo: -1 });
    const nextInvoiceNumber = invoiceNumber ? invoiceNumber.invoiceNo + 1 : 1;
    let status = "unpaid";
    if (remainingAmount === 0) {
      status = "paid";
    }
    const sale = await Sales.create({
      saleID: nextSaleID,
      invoiceNo: nextInvoiceNumber,
      userId: userId,
      productID: productId,
      productName: productName,
      categoryID: categoryId,
      categoryName: categoryName,
      cityID: cityId,
      cityName: cityName,
      productPrice,
      customerName,
      customerContact,
      productQuantity,
      paidAmount,
      remainingAmount,
      note: Note,
      status: status,
      saleDate,
    });
    if (sale) {
      const isProduct = await Product.findOne({ productID: productId });
      isProduct.quantity = isProduct.quantity - productQuantity;
      isProduct.save();
      res.status(201).json({
        success: true,
        message: "Sale added successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Purchase not added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deleteSale = async (req, res) => {
  try {
    const userId = req.user.id;
    // const { saleId } = req.body;
    if (!saleId) {
      return res
        .status(400)
        .json({ success: false, message: "sale ID is required." });
    }
    var findSale = await Sales.findOne({ saleID: saleId });
    const qunatity = findSale.productQuantity;
    var findProduct = await Product.findOne({
      productID: findSale.productID,
    });
    if (findProduct) {
      findProduct.quantity = findProduct.quantity + qunatity;
      var deleteSale = await Sales.findOneAndDelete({
        saleID: saleId,
        userId: userId,
      });
      if (!deleteSale) {
        return res
          .status(404)
          .json({ success: false, message: "Sale not found." });
      } else {
        findProduct.save();
        return res.status(200).json({
          success: true,
          message: "Sale deleted successfully.",
        });
      }
    }
    else{
        return res
        .status(404)
        .json({ success: false, message: "product not found." });
    }
  } catch (error) {
    console.error("Error in deleteSale:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};

const GetSale = async (req, res) => {
  try {
    const userId = req.user.id;
    const sales = await Sales.find({ userId: userId });

    if (sales.length > 0) {
      // Use Promise.all to fetch product and category details for all sales
      const sendData = await Promise.all(
        sales.map(async (sale) => {
          return {
            saleID: sale.saleID,
            invoiceNo: sale.invoiceNo,
            productId: sale.productID, // Keep the product ID
            productName: sale.productName, // Get product name
            categoryId: sale.categoryID, // Keep the category ID
            categoryName: sale.categoryName, // Get category name
            cityId: sale.cityID, // Keep the city ID
            cityName: sale.cityName, // Get city name
            productPrice: sale.productPrice,
            customerName: sale.customerName,
            customerContact: sale.customerContact,
            productQuantity: sale.productQuantity,
            paidAmount: sale.paidAmount,
            remainingAmount: sale.remainingAmount,
            Note: sale.note,
            saleDate: sale.saleDate,
            status: sale.status,
          };
        })
      );

      // Send the response with the constructed data
      res.status(200).json({ success: true, data: sendData });
    } else {
      res.status(200).json({ success: false, message: "No sales found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const GetSaleData = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const sale = await Sales.findOne({
      userId: userId,
      saleID: id,
    });
    if (sale) {
      // Use Promise.all to fetch product and category details for all sales
      const sendData = {
        invoiceNo: sale.invoiceNo,
        saleID: sale.saleID,
        invoiceNo: sale.invoiceNo,
        productId: sale.productID, // Keep the product ID
        productName: sale.productName, // Get product name
        categoryId: sale.categoryID, // Keep the category ID
        categoryName: sale.categoryName, // Get category name
        cityId: sale.cityID, // Keep the city ID
        cityName: sale.cityName, // Get city name
        productPrice: sale.productPrice,
        customerName: sale.customerName,
        customerContact: sale.customerContact,
        productQuantity: sale.productQuantity,
        paidAmount: sale.paidAmount,
        remainingAmount: sale.remainingAmount,
        Note: sale.note,
        saleDate: sale.saleDate,
        status: sale.status,
      };
      // Send the response with the constructed data
      res.status(200).json({ success: true, data: sendData });
    } else {
      res.status(404).json({ success: false, message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  deleteSale,
  addSale,
  GetSale,
  GetSaleData,
};
