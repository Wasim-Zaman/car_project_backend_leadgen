const express = require('express');
const controller = require('../controllers/vendorCoupon');
const isVendor = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin-auth');

const router = express.Router();

// Create a new coupon
router.post('/v1/coupons', isVendor, controller.createVendorCoupon);

// Get all coupons (with pagination and optional search)
router.get('/v1/coupons', controller.getVendorCoupons);

// Update a coupon by ID
router.put('/v1/coupons/:id', isVendor, controller.updateVendorCoupon);

// Apply a coupon by a user
router.post('/v1/coupons/apply', isVendor, controller.applyCouponByUser);

// Delete a coupon by ID (Admin only)
router.delete('/v1/coupons/:id', isAdmin, controller.deleteVendorCoupon);

module.exports = router;
