const ProductSize = require("../models/ProductSize");
const addProductSize = async (req, res) => {
  try {
    const { productSize } = req.body;
    const userId = req.user.id;
    if (!productSize) {
      return res.status(400).json({ message: "ProductSize name is required." });
    }

    // Check if the productSize already exists
    const isExist = await ProductSize.findOne({
      productSizeName: productSize,
      userId: userId,
    });
    if (isExist) {
      return res.status(400).json({ message: "ProductSize already exists." });
    }

    // Generate the next productSizeID
    const lastProductSize = await ProductSize.findOne().sort({ productSizeID: -1 });
    const nextProductSizeID = lastProductSize ? lastProductSize.productSizeID + 1 : 1;

    // Create new productSize
    const newProductSize = await ProductSize.create({
      userId: userId,
      productSizeID: nextProductSizeID,
      productSizeName: productSize,
    });

    return res.status(201).json({
      success: true,
      message: "ProductSize added successfully.",
      data: newProductSize,
    });
  } catch (error) {
    console.error("Error in addProductSize:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
const updateProductSize = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productSizeId, productSizeName } = req.body;
    console.log(req.body);
    if (!productSizeId || !productSizeName) {
      return res
        .status(400)
        .json({ message: "Both productSizeId and productSizeName are required." });
    }
    const productSize = await ProductSize.findOne({
      userId: userId,
      productSizeName: productSizeName,
    });
    if (productSize) {
      return res
        .status(404)
        .json({ success: false, message: "ProductSize name exist." });
    }

    // Find and update the productSize
    const updatedProductSize = await ProductSize.findOneAndUpdate(
      { productSizeID: productSizeId },
      { productSizeName: productSizeName },
      { userId: userId },
      { new: true } // Return the updated document
    );
    console.log(updatedProductSize);
    if (!updatedProductSize) {
      return res
        .status(404)
        .json({ success: false, message: "ProductSize not found." });
    }

    return res.status(200).json({
      success: true,
      message: "ProductSize updated successfully.",
      data: updatedProductSize,
    });
  } catch (error) {
    console.error("Error in updateProductSize:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};
const deleteProductSize = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    const { productSizeId } = req.body;
    if (!productSizeId) {
      return res
        .status(400)
        .json({ success: false, message: "ProductSize ID is required." });
    }

    // Find and delete the productSize
    const deletedProductSize = await ProductSize.findOneAndDelete({
      productSizeID: productSizeId,
      userId: userId,
    });

    if (!deletedProductSize) {
      return res
        .status(404)
        .json({ success: false, message: "ProductSize not found." });
    }

    return res.status(200).json({
      success: true,
      message: "ProductSize deleted successfully.",
      data: deletedProductSize,
    });
  } catch (error) {
    console.error("Error in deleteProductSize:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};

const GetProductSize = async (req, res) => {
  try {
    const userId = req.user.id;
    const productSize = await ProductSize.find({ userId: userId });
    if (productSize) {
      const sendData = productSize.map((cat) => {
        return {
          productSizeID: cat.productSizeID,
          productSizeName: cat.productSizeName,
        };
      });
      return res.status(200).json({
        success: true,
        data: sendData,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "ProductSize not found.",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in GetProductSize:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
module.exports = { deleteProductSize, updateProductSize, addProductSize, GetProductSize };
