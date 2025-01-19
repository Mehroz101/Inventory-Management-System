const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware")
const { deleteCity,updateCity,addCity, GetCity } = require("../controllers/CityController");
router.post("/updatecity",AuthMiddleware, updateCity);
router.post("/deletecity", AuthMiddleware,deleteCity);
router.post("/addcity",AuthMiddleware, addCity);
router.get("/getcity",AuthMiddleware, GetCity);
module.exports = router;
