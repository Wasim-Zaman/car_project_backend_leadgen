const express = require('express');

const positionController = require('../controllers/position');
const isAdmin = require('../middleware/is-admin-auth');

const router = express.Router();

// Create a new position
router.post('/v1/positions', isAdmin, positionController.createPosition);

// Get all
router.get('/v1/positions/all', positionController.getAllPositions);

// Get a position by ID
router.get('/v1/positions/:id', positionController.getPosition);

// Get all positions (with optional pagination)
router.get('/v1/positions', positionController.getPositions);

// Update a position by ID
router.put('/v1/positions/:id', isAdmin, positionController.updatePosition);

// Delete a position by ID
router.delete('/v1/positions/:id', isAdmin, positionController.deletePosition);

module.exports = router;
