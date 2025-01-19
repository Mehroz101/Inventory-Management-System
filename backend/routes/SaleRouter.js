const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware")
const { deleteSale,addSale, GetSale,GetSaleData } = require("../controllers/SaleController");
router.post("/deletesale", AuthMiddleware,deleteSale);
router.post("/addsale",AuthMiddleware, addSale);
router.get("/getsale",AuthMiddleware, GetSale);
router.get("/getsaledata/:id",AuthMiddleware, GetSaleData);
module.exports = router;
