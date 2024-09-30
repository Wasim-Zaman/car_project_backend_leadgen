const express = require('express');
const controller = require('../controllers/tax');
const isAdmin = require('../middleware/is-admin-auth'); // Assuming this checks admin access.

const router = express.Router();

// Create a new tax
router.post('/v1/createTax', isAdmin, controller.createTax);

// Get all taxes
router.get('/v1/taxes', isAdmin, controller.getTaxes);

// Get tax by ID
router.get('/v1/taxes/:id', isAdmin, controller.getTaxById);

// Update a tax by ID
router.put('/v1/taxes/:id', isAdmin, controller.updateTax);

// Delete a tax by ID
router.delete('/v1/taxes/:id', isAdmin, controller.deleteTax);

module.exports = router;
