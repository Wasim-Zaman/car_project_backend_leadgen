const express = require('express');
const { uploadMultiple } = require('multermate');

const controller = require('../controllers/carWashService');
const isVendor = require('../middleware/isVendor');
const isAdmin = require('../middleware/is-admin-auth');

const router = express.Router();

// Create a new service with multiple images
router.post(
  '/v1/services',
  isVendor,
  uploadMultiple({
    fields: [{ name: 'serviceImages', maxCount: 5 }],
  }),
  controller.createService
);

// Get all services
router.get('/v1/services', controller.getServices);

// Get a single service by ID
router.get('/v1/services/:id', controller.getServiceById);

// Update a service by ID with multiple images
router.put(
  '/v1/services/:id',
  isVendor,
  uploadMultiple({
    fields: [{ name: 'serviceImages', maxCount: 5 }],
  }),
  controller.updateService
);

// Delete a service by ID
router.delete('/v1/services/:id', isAdmin, controller.deleteService);

router.get('/v1/services/vendor/:vendorId', controller.getServicesByVendor);

router.get('/v1/services/vendor/count', isVendor, controller.getServiceCountForVendor);

module.exports = router;
