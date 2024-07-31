const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
require("dotenv").config();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Car Project",
    version: "1.0.0",
    description: "APIs Documentation",
    contact: {
      name: "Wasim Zaman",
      email: "wasimxaman13@gmail.com",
    },
  },
  servers: [
    {
      url: "https://backend.leadgenadvertisements.com",
      description: "Development server",
    },
    {
      url: `http://localhost:${process.env.PORT}`,
      description: "Development server",
    },
    // add more hosts...
  ],
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: [
    path.join(__dirname, "../docs/swagger/auth.js"),
    path.join(__dirname, "../docs/swagger/banner.js"),
    path.join(__dirname, "../docs/swagger/brand.js"),
    path.join(__dirname, "../docs/swagger/car_type.js"),
    path.join(__dirname, "../docs/swagger/city.js"),
    path.join(__dirname, "../docs/swagger/car.js"),
    path.join(__dirname, "../docs/swagger/gallery.js"),
    path.join(__dirname, "../docs/swagger/faq.js"),
    path.join(__dirname, "../docs/swagger/facility.js"),
    path.join(__dirname, "../docs/swagger/coupon.js"),
    path.join(__dirname, "../docs/swagger/page.js"),
    // add more paths...
  ],
};

var swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
