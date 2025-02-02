const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");
const {
  deleteCustomer,
  updateCustomer,
  addCustomer,
  GetCustomer,
  GetCustomersData
} = require("../controllers/CustomerController");
router.post("/updatecustomer", AuthMiddleware, updateCustomer);
router.post("/deletecustomer", AuthMiddleware, deleteCustomer);
router.post("/addcustomer", AuthMiddleware, addCustomer);
router.get("/getcustomer", AuthMiddleware, GetCustomer);
router.get("/getcustomerdata", AuthMiddleware, GetCustomersData);
module.exports = router;
