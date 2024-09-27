const express = require('express');
const router = express.Router();
const positionController = require('../controllers/position');

// Create a new position
router.post('/v1/positions', positionController.createPosition);

// Get all
router.get('/v1/positions/all', positionController.getAllPositions);

// Get a position by ID
router.get('/v1/positions/:id', positionController.getPosition);

// Get all positions (with optional pagination)
router.get('/v1/positions', positionController.getPositions);

// Update a position by ID
router.put('/v1/positions/:id', positionController.updatePosition);

// Delete a position by ID
router.delete('/v1/positions/:id', positionController.deletePosition);

module.exports = router;
