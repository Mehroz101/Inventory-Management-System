const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware")
const { GetDashboardData ,GetStock,UpdateProductStock,GenerateReport} = require("../controllers/DashboardController");

router.get("/getdashboarddata",AuthMiddleware, GetDashboardData);
router.get("/getstock",AuthMiddleware, GetStock);
router.post("/updateproductstock",AuthMiddleware, UpdateProductStock);
router.post("/generatereport",AuthMiddleware, GenerateReport);
module.exports = router;
