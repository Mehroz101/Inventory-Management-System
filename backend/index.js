const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("swagger-jsdoc");
const { connectDB } = require("./config/db.js");
require("dotenv").config();
const path = require("path");
const AuthRouter = require("./routes/AuthRouter.js");
const CategoryRouter = require("./routes/CategoryRouter.js");
const CustomerRouter = require("./routes/CustomerRouter.js");
const CityRouter = require("./routes/CityRouter.js");
const ProductRouter = require("./routes/ProductRouter.js");
const PurchaseRouter = require("./routes/PurchaseRouter.js");
const SaleRouter = require("./routes/SaleRouter.js");
const DashboardRouter = require("./routes/DashboardRouter.js");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://webtech-inventorysystem.netlify.app/",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static(path.join(__dirname, "uploads")));

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FeedBack App API",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.API_URL,
      },
    ],
  },
  apis: ["./routes/**/*.js"], // Correct path for route files
};

const swaggerSpec = swaggerDocument(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", AuthRouter); // Make sure this is correctly set up
app.use("/api/category", CategoryRouter); // Make sure this is correctly set up
app.use("/api/customer", CustomerRouter); // Make sure this is correctly set up
app.use("/api/city", CityRouter); // Make sure this is correctly set up
app.use("/api/product", ProductRouter); // Make sure this is correctly set up
app.use("/api/purchase", PurchaseRouter); // Make sure this is correctly set up
app.use("/api/sale", SaleRouter); // Make sure this is correctly set up
app.use("/api/dashboard", DashboardRouter); // Make sure this is correctly set up
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
