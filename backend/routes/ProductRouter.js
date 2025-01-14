const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware")
const { deleteProduct,updateProduct,addProduct, GetProduct } = require("../controllers/ProductController");
router.post("/updateproduct",AuthMiddleware, updateProduct);
router.post("/deleteproduct", AuthMiddleware,deleteProduct);
router.post("/addproduct",AuthMiddleware, addProduct);
router.get("/getproduct",AuthMiddleware, GetProduct);
module.exports = router;
