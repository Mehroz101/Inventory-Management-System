const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware")
const { deleteProduct,updateProduct,addProduct, GetProduct,TransferProduct,SpecificProduct,PrintingProduct ,TransferPrintingtoProduct} = require("../controllers/ProductController");
router.post("/updateproduct",AuthMiddleware, updateProduct);
router.post("/deleteproduct", AuthMiddleware,deleteProduct);
router.post("/addproduct",AuthMiddleware, addProduct);
router.get("/getproduct",AuthMiddleware, GetProduct);
router.get("/specificproduct",AuthMiddleware, SpecificProduct);
router.get("/printingproduct",AuthMiddleware, PrintingProduct);
router.post("/transferproduct",AuthMiddleware, TransferProduct);
router.post("/transferprintingtoproduct",AuthMiddleware, TransferPrintingtoProduct);
module.exports = router;
