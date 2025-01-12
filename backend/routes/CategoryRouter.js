const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware")
const { deleteCategory,updateCategory,addCategory, GetCategory } = require("../controllers/CategoryController");
router.post("/updatecategory",AuthMiddleware, updateCategory);
router.post("/deletecategory", AuthMiddleware,deleteCategory);
router.post("/addcategory",AuthMiddleware, addCategory);
router.get("/getcategory",AuthMiddleware, GetCategory);
module.exports = router;
