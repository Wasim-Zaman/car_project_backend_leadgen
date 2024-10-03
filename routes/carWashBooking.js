const express = require('express');
const carWashBookingController = require('../controllers/carWashBooking');
const isAuth = require('../middleware/is-auth');
const isVendor = require('../middleware/isVendor');

const router = express.Router();

// Create a new booking
router.post('/v1/car-wash-bookings', isAuth, carWashBookingController.createBooking);

// Get all bookings
router.get('/v1/car-wash-bookings', isVendor, carWashBookingController.getAllBookings);

// Get a single booking by ID
router.get('/v1/car-wash-bookings/:id', isAuth, carWashBookingController.getBookingById);

// Update a booking (vendor accepting the booking)
router.patch('/v1/car-wash-bookings/:id', isVendor, carWashBookingController.updateBooking);

// Delete a booking
router.delete('/v1/car-wash-bookings/:id', isAuth, carWashBookingController.deleteBooking);

// Get bookings for a specific user
router.get('/v1/car-wash-bookings/user', isAuth, carWashBookingController.getUserBookings);

module.exports = router;
