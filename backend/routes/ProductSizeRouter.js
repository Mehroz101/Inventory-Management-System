const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware")
const { deleteProductSize,updateProductSize,addProductSize, GetProductSize } = require("../controllers/ProductSizeController");
router.post("/updateproductsize",AuthMiddleware, updateProductSize);
router.post("/deleteproductsize", AuthMiddleware,deleteProductSize);
router.post("/addproductsize",AuthMiddleware, addProductSize);
router.get("/getproductsize",AuthMiddleware, GetProductSize);
module.exports = router;
