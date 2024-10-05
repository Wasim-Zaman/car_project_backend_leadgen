// carWashBusinessRoutes.js

const express = require('express');
const { uploadMultiple } = require('multermate');

const controller = require('../controllers/carWashBusiness');
const isVendor = require('../middleware/isVendor');
const isAdmin = require('../middleware/is-admin-auth');

const router = express.Router();

// Create a new car wash business with multiple images
router.post(
  '/v1/businesses',
  isVendor,
  uploadMultiple({
    fields: [{ name: 'files', maxCount: 10 }],
  }),
  controller.createCarWashBusiness
);

// Get all car wash businesses (public access)
router.get('/v1/businesses', controller.getAllCarWashBusinesses);

// Get car wash business by vendor (vendor only)
router.get('/v1/businesses/vendor', isVendor, controller.getCarWashBusinessByVendor);

// Get car wash business by vendor (vendor only)
router.get('/v1/businesses/vendor/:vendorId', controller.getCarWashBusinessByVendorId);

// Get a single car wash business by ID (public access)
router.get('/v1/businesses/:id', controller.getCarWashBusinessById);

// Update a car wash business by ID with multiple images (vendor only)
router.put(
  '/v1/businesses/:id',
  isVendor,
  uploadMultiple({
    fields: [{ name: 'files', maxCount: 10 }],
  }),
  controller.updateCarWashBusiness
);

// Delete a car wash business by ID (admin only)
router.delete('/v1/businesses/:id', isAdmin, controller.deleteCarWashBusiness);

module.exports = router;
