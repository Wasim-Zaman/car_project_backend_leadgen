const path = require('path');

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// * ADMIN SECTION
const CustomError = require('./utils/error');
const swaggerSpec = require('./config/swagger');
const response = require('./utils/response');
const adminRoutes = require('./routes/auth');
const bannerRoutes = require('./routes/banner');
const cityRoutes = require('./routes/city');
const brandRoutes = require('./routes/brand');
const carTypeRoutes = require('./routes/car_type');
const carRoutes = require('./routes/car');
const galleryRoutes = require('./routes/gallery');
const faqRoutes = require('./routes/faq');
const facilityRoutes = require('./routes/facility');
const couponRoutes = require('./routes/coupon');
const pageRoutes = require('./routes/page');
const bookingRoutes = require('./routes/booking');

// * USER SECTION
const userRoutes = require('./routes/user');
const newsRoutes = require('./routes/news');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add your routes...
app.use('/api/auth', adminRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/carType', carTypeRoutes);
app.use('/api/car', carRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/facility', facilityRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/user', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const error = new CustomError(`No route found for ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  let status = 500;
  let message = 'An error occurred while processing your request. Please try again later.';
  let data = null;
  let success = false;

  if (error instanceof CustomError) {
    status = error.statusCode || 500;
    message = error.message || message;
    data = error.data || null;
  }

  res.status(status).json(response(status, success, message, data));
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
