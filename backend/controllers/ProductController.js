const Product = require("../models/Product");
const addProduct = async (req, res) => {
  try {
    const { productName, quantity, isRawData } = req.body;
    const userId = req.user.id;
    if (!productName) {
      return res
        .status(400)
        .json({ success: false, message: "Product name is required." });
    }

    // Check if the Product already exists
    const isExist = await Product.findOne({
      productName: productName,
      isRawData: isRawData,
      userId: userId,
    });
    if (isExist) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exists." });
    }

    // Generate the next ProductID
    const lastProduct = await Product.findOne().sort({ productID: -1 });
    const nextProductID = lastProduct ? lastProduct.productID + 1 : 1;

    // Create new Product
    const newProduct = await Product.create({
      userId: userId,
      productID: nextProductID,
      productName: productName,
      quantity: quantity,
      isRawData: isRawData,
      inProcessing: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully.",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, productName, quantity, isRawData } = req.body;
    console.log(req.body);
    if (!productId || !productName) {
      return res.status(400).json({
        success: false,
        message: "Both ProductId and ProductName are required.",
      });
    }
    const product = await Product.findOne({
      userId: userId,
      productName: productName,
    });
    if (product && product.productID!==productId) {
      return res
        .status(404)
        .json({ success: false, message: "Product name exist." });
    }

    // Find and update the Product
    const updatedProduct = await Product.findOneAndUpdate(
      { productID: productId },
      { productName: productName, isRawData: isRawData, quantity: quantity },

      { new: true } // Return the updated document
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required." });
    }

    // Find and delete the Product
    const deletedProduct = await Product.findOneAndDelete({
      productID: productId,
      userId: userId,
    });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};
const TransferProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, transferQuantity, note } = req.body;

    console.log(req.body);
    const product = await Product.findOne({
      userId: userId,
      productID: productId,
    });
    if (product) {
      console.log(product);
      const quantity = product.quantity;
      if (transferQuantity > quantity) {
        res
          .status(400)
          .json({ success: false, message: "You dont have enough quantity" });
      } else {
        product.quantity = product.quantity - transferQuantity;
        product.inProcessing = product?.inProcessing + transferQuantity;
        product.note = note;
        product.save();
        res.status(201).json({
          success: true,
          message: "Transfer quantity to printing department",
        });
      }
    } else {
      res.status(400).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "something wents wrong" });
  }
};
const TransferPrintingtoProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, transferQuantity,createdProduct,createdQunatity } = req.body;

    console.log(req.body);
    const product = await Product.findOne({
      userId: userId,
      productID: productId,
    });
    if (product) {
      console.log(product);
      const quantity = product.inProcessing;
      if (transferQuantity > quantity) {
        res
          .status(400)
          .json({ success: false, message: "You dont have enough quantity" });
      } else {
        const createdproduct = await Product.findOne({
          userId: userId,
          productID: createdProduct,
        });
        if(createdproduct){
          console.log("created product: ",createdproduct)
          createdproduct.quantity = createdproduct.quantity + createdQunatity;
          product.inProcessing = product.inProcessing - transferQuantity;
          createdproduct.save();
          product.save();
          res.status(201).json({
            success: true,
            message: "Transfer quantity to product stock",
          });
        }
       
      }
    } else {
      res.status(400).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "something wents wrong" });
  }
};
const GetProduct = async (req, res) => {
  try {
    const userId = req.user.id;

    const product = await Product.find({ userId: userId });
    if (product) {
      const sendData = product.map((pro) => {
        return {
          productID: pro.productID,
          productName: pro.productName,
          quantity: pro.quantity || 0,
          inProcessing: pro.inProcessing || 0,
          isRawData: pro.isRawData,
        };
      });
      return res.status(200).json({
        success: true,
        data: sendData,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Product not found.",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in GetProduct:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
const SpecificProduct = async (req, res) => {
  try {
    const userId = req.user.id;

    const product = await Product.find({ userId: userId, isRawData: false });
    if (product) {
      const sendData = product.map((pro) => {
        return {
          productID: pro.productID,
          productName: pro.productName,
        };
      });
      return res.status(200).json({
        success: true,
        data: sendData,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Product not found.",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in GetProduct:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
const PrintingProduct = async (req, res) => {
  try {
    const userId = req.user.id;

    const product = await Product.find({ userId: userId, isRawData:true });
    if (product) {
      const sendData = product
      .filter(pro => pro.inProcessing > 0) // Filter out products with inProcessing <= 0
      .map(pro => {
        return {
          productName: pro.productName,
          inProcessing: pro.inProcessing,
          quantity: pro.quantity,
          printingDate: pro.createdAt,
          note: pro.note,
          productId: pro.productID
        };
      });
    
      console.log(sendData)
      return res.status(200).json({
        success: true,
        data: sendData,
      });
    
    } else {
      return res.status(200).json({
        success: true,
        message: "Product not found.",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in GetProduct:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
module.exports = {
  deleteProduct,
  updateProduct,
  addProduct,
  GetProduct,
  TransferProduct,
  SpecificProduct,
  PrintingProduct,
  TransferPrintingtoProduct
};
