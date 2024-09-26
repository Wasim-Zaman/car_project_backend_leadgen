const Booking = require('../models/booking');
const CustomError = require('../utils/error');
const generateResponse = require('../utils/response');

exports.getBookings = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const query = req.query.query || '';

  try {
    const bookings = await Booking.get(page, limit, query);

    if (!bookings || bookings.data.length <= 0) {
      throw new CustomError('No bookings found', 404);
    }

    res.status(200).json(generateResponse(200, true, 'Bookings retrieved successfully', bookings));
  } catch (error) {
    next(error);
  }
};

// Create a new booking
exports.postBooking = async (req, res, next) => {
  const { carId, customerId, pickupDate, pickupTime, dropDate, dropTime, pickupOTP, status } = req.body;

  if (!carId || !customerId) {
    throw new CustomError('Car and customer IDs are required', 400);
  }

  try {
    const booking = await Booking.create({
      carId,
      customerId,
      pickupDate,
      pickupTime,
      dropDate,
      dropTime,
      pickupOTP,
      status,
    });

    res.status(201).json(generateResponse(201, true, 'Booking created successfully', booking));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res, next) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new CustomError('Booking not found', 404);
    }

    await Booking.deleteById(id);

    res.status(200).json(generateResponse(200, true, 'Booking deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// Update a booking by ID
exports.patchBooking = async (req, res, next) => {
  const { id } = req.params;
  const { pickupDate, pickupTime, dropDate, dropTime, pickupOTP, status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new CustomError('Booking not found', 404);
    }

    const updatedBooking = await Booking.updateById(id, {
      pickupDate: pickupDate || booking.pickupDate,
      pickupTime: pickupTime || booking.pickupTime,
      dropDate: dropDate || booking.dropDate,
      dropTime: dropTime || booking.dropTime,
      pickupOTP: pickupOTP || booking.pickupOTP,
      status: status !== undefined ? status : booking.status,
    });

    res.status(200).json(generateResponse(200, true, 'Booking updated successfully', updatedBooking));
  } catch (error) {
    next(error);
  }
};
