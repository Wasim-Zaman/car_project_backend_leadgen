const express = require('express');
const router = express.Router();
const positionController = require('../controllers/position');

// Create a new position
router.post('/positions', positionController.createPosition);

// Get a position by ID
router.get('/positions/:id', positionController.getPosition);

// Get all positions (with optional pagination)
router.get('/positions', positionController.getAllPositions);

// Update a position by ID
router.put('/positions/:id', positionController.updatePosition);

// Delete a position by ID
router.delete('/positions/:id', positionController.deletePosition);

module.exports = router;
