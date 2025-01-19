const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware")
const { GetDashboardData ,GetStock,UpdateProductStock} = require("../controllers/DashboardController");

router.get("/getdashboarddata",AuthMiddleware, GetDashboardData);
router.get("/getstock",AuthMiddleware, GetStock);
router.post("/updateproductstock",AuthMiddleware, UpdateProductStock);
module.exports = router;
