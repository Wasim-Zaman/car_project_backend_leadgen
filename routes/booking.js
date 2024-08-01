const express = require("express");

const bookingController = require("../controllers/booking");
const isAdmin = require("../middleware/is-admin-auth");

const router = express.Router();

// Define routes for booking operations
router.get("/v1/bookings", isAdmin, bookingController.getBookings); // Get all bookings with optional pagination and filters
router.post("/v1/booking", isAdmin, bookingController.postBooking); // Create a new booking
router.delete("/v1/booking/:id", isAdmin, bookingController.deleteBooking); // Delete a booking by ID
router.patch("/v1/booking/:id", isAdmin, bookingController.patchBooking); // Update a booking by ID

module.exports = router;
