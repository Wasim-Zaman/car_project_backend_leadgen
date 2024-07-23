const path = require("path");

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
require("dotenv").config();

const CustomError = require("./exceptions/customError");
const swaggerSpec = require("./config/swagger");
const generateResponse = require("./utils/response");
const testRoutes = require("./routes/sample");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(testRoutes);
// Add your routes...
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
  console.log("Server is running");
});
