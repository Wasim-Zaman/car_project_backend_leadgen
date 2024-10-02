const express = require('express');
const controller = require('../controllers/carWashCart');
const isVendor = require('../middleware/isVendor');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// Add an item to the cart (user must be authenticated)
router.post('/v1/cart', isAuth, controller.addToCart);

// Get the cart for a specific user (user must be authenticated)
router.get('/v1/cart/:userId', isAuth, controller.getCart);

// Remove an item from the cart by item ID (user must be authenticated)
router.delete('/v1/cart/item/:cartItemId', isAuth, controller.removeFromCart);

// Clear the entire cart for a user (user must be authenticated)
router.delete('/v1/cart/clear/:userId', isAuth, controller.clearCart);

module.exports = router;
