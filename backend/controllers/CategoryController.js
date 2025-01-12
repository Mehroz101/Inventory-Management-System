const Category = require("../models/Category");
const { find } = require("../models/User");
const addCategory = async (req, res) => {
  try {
    const { category } = req.body;
const userId = req.user.id;
    if (!category) {
      return res.status(400).json({ message: "Category name is required." });
    }

    // Check if the category already exists
    const isExist = await Category.findOne({ categoryName: category });
    if (isExist) {
      return res.status(400).json({ message: "Category already exists." });
    }

    // Generate the next categoryID
    const lastCategory = await Category.findOne().sort({ categoryID: -1 });
    const nextCategoryID = lastCategory ? lastCategory.categoryID + 1 : 1;

    // Create new category
    const newCategory = await Category.create({
        userId:userId,
      categoryID: nextCategoryID,
      categoryName: category,
    });

    return res.status(201).json({
      message: "Category added successfully.",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error in addCategory:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { categoryId, categoryName } = req.body;

    if (!categoryId || !categoryName) {
      return res
        .status(400)
        .json({ message: "Both categoryId and categoryName are required." });
    }

    // Find and update the category
    const updatedCategory = await Category.findOneAndUpdate(
      { categoryID: categoryId },
      { categoryName },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    return res.status(200).json({
      message: "Category updated successfully.",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required." });
    }

    // Find and delete the category
    const deletedCategory = await Category.findOneAndDelete({
      categoryID: categoryId,
    });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    return res.status(200).json({
      message: "Category deleted successfully.",
      data: deletedCategory,
    });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

const GetCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const category = await Category.find();
    if (category) {
      const sendData = category.map((cat) => {
        return {
          categoryID: cat.categoryID,
          categoryName: cat.categoryName,
        };
      });
      console.log(category)
      return res.status(200).json({
        success: true,
        data: sendData,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Category not found.",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in GetCategory:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
module.exports = { deleteCategory, updateCategory, addCategory, GetCategory };
