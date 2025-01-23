const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware")
const { deletePurchase,addPurchase, GetPurchase,GetPurchaseData,updatePurchase } = require("../controllers/PurchaseController");
router.post("/deletepurchase", AuthMiddleware,deletePurchase);
router.post("/addpurchase",AuthMiddleware, addPurchase);
router.post("/updatepurchase",AuthMiddleware, updatePurchase);
router.get("/getpurchase",AuthMiddleware, GetPurchase);
router.get("/getpurchasedata/:id",AuthMiddleware, GetPurchaseData);
module.exports = router;
