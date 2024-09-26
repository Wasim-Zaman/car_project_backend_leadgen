const express = require('express');

const controller = require('../controllers/zone');
const isAdmin = require('../middleware/is-admin-auth');

const router = express.Router();

// Get all zones with pagination
router.get('/v1/zones', controller.getZones);

// Get All zones
router.get('/v1/zones/all', controller.getAllZones);

// Get a single zone by ID
router.get('/v1/zone/:id', controller.getZoneById);

// Create a new zone (only admin can create)
router.post('/v1/zone', isAdmin, controller.createZone);

// Update a zone by ID (only admin can update)
router.patch('/v1/zone/:id', isAdmin, controller.updateZoneById);

// Delete a zone by ID (only admin can delete)
router.delete('/v1/zone/:id', isAdmin, controller.deleteZoneById);

module.exports = router;
