const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Tax',
    version: '1.0.0',
    description: 'APIs Documentation',
    contact: {
      name: process.env.NAME,
      email: process.env.EMAIL,
    },
  },
  servers: [
    {
      url: process.env.DOMAIN,
      description: 'Production server',
    },
    {
      url: process.env.LOCAL_HOST,
      description: 'Development server',
    },
    // add more hosts...
  ],
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: [
    path.join(__dirname, '../docs/swagger/auth.js'),
    path.join(__dirname, '../docs/swagger/banner.js'),
    path.join(__dirname, '../docs/swagger/brand.js'),
    path.join(__dirname, '../docs/swagger/car_type.js'),
    path.join(__dirname, '../docs/swagger/city.js'),
    path.join(__dirname, '../docs/swagger/car.js'),
    path.join(__dirname, '../docs/swagger/gallery.js'),
    path.join(__dirname, '../docs/swagger/faq.js'),
    path.join(__dirname, '../docs/swagger/facility.js'),
    path.join(__dirname, '../docs/swagger/coupon.js'),
    path.join(__dirname, '../docs/swagger/page.js'),
    path.join(__dirname, '../docs/swagger/booking.js'),
    path.join(__dirname, '../docs/swagger/user.js'),
    path.join(__dirname, '../docs/swagger/news.js'),
    // add more paths...
  ],
};

var swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
