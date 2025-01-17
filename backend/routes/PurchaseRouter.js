const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware")
const { deletePurchase,updatePurchase,addPurchase, GetPurchase,GetPurchaseData } = require("../controllers/PurchaseController");
router.post("/updatepurchase",AuthMiddleware, updatePurchase);
router.post("/deletepurchase", AuthMiddleware,deletePurchase);
router.post("/addpurchase",AuthMiddleware, addPurchase);
router.get("/getpurchase",AuthMiddleware, GetPurchase);
router.get("/getpurchasedata/:id",AuthMiddleware, GetPurchaseData);
module.exports = router;
