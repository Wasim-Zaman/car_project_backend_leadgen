const express = require('express');

const { createZone, getZones, getZoneById, updateZoneById, deleteZoneById } = require('../controllers/zone');
const isAdmin = require('../middleware/is-admin-auth');

const router = express.Router();

// Get all zones with pagination
router.get('/v1/zones', getZones);

// Get a single zone by ID
router.get('/v1/zone/:id', getZoneById);

// Create a new zone (only admin can create)
router.post('/v1/zone', isAdmin, createZone);

// Update a zone by ID (only admin can update)
router.patch('/v1/zone/:id', isAdmin, updateZoneById);

// Delete a zone by ID (only admin can delete)
router.delete('/v1/zone/:id', isAdmin, deleteZoneById);

module.exports = router;
