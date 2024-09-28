const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/ads');
const { uploadSingle } = require('../utils/multermate');

// Create an advertisement with an image upload
router.post(
  '/v1/advertisements',
  uploadSingle({ fileTypes: ['images'], filename: 'image', destination: 'uploads/ads' }),
  advertisementController.createAdvertisement
);

// Get all advertisements with pagination
router.get('/v1/advertisements', advertisementController.getAdvertisements);

// Get an advertisement by ID
router.get('/v1/advertisements/:id', advertisementController.getAdvertisementById);

// Update an advertisement with an image upload
router.put(
  '/v1/advertisements/:id',
  uploadSingle({ fileTypes: ['images'], filename: 'image', destination: 'uploads/ads' }),
  advertisementController.updateAdvertisement
);

// Delete an advertisement by ID
router.delete('/v1/advertisements/:id', advertisementController.deleteAdvertisement);

// Automatically delete expired advertisements (this can be scheduled as a cron job)
router.delete('/v1/advertisements/expired', advertisementController.deleteExpiredAdvertisements);

module.exports = router;
