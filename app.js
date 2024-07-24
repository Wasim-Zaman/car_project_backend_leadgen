const path = require("path");

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
require("dotenv").config();

const CustomError = require("./utils/customError");
const swaggerSpec = require("./config/swagger");
const generateResponse = require("./utils/response");
const adminRoutes = require("./routes/auth");
const bannerRoutes = require("./routes/banner");
const cityRoutes = require("./routes/city");
const carRoutes = require("./routes/car");

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Serve static files from the 'images' directory
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add your routes...
app.use("/api/auth", adminRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/car", carRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const error = new Error(`No route found for ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  let status = 500;
  let message =
    "An error occurred while trying to process your request. Please try again later.";
  let data = null;
  let success = false;

  if (error instanceof CustomError) {
    status = error.statusCode || 500;
    message = error.message || message;
    data = error.data || null;
  }

  res.status(status).json(generateResponse(status, success, message, data));
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
