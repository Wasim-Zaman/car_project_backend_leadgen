const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const response = require('../utils/response');
const CustomError = require('../utils/error');

const prisma = new PrismaClient();

// Joi validation schema for creating a booking
const createBookingSchema = Joi.object({
  date: Joi.date().iso().required(),
  startTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  endTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  carWashCartId: Joi.string().uuid().required(),
  visitingCharges: Joi.number().precision(2).positive().required(),
  amount: Joi.number().precision(2).positive().required(),
  tax: Joi.number().precision(2).positive().required(),
  vendor: Joi.string().required(),
});

// Create a new booking
exports.createBooking = async (req, res, next) => {
  try {
    const { error, value } = createBookingSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { date, startTime, endTime, carWashCartId, visitingCharges, amount, tax, vendor } = value;
    const userId = req.user.id; // Assuming you have user information in the request

    // Check for existing bookings for the specific vendor
    const existingBookings = await prisma.carWashBooking.findMany({
      where: {
        date: new Date(date),
        booked: true,
        vendor: vendor,
        startTime: { lte: endTime },
        endTime: { gte: startTime },
      },
    });

    if (existingBookings.length > 0) {
      throw new CustomError('This time slot is already booked for the selected vendor', 400);
    }

    // Create the booking
    const newBooking = await prisma.carWashBooking.create({
      data: {
        date: new Date(date),
        startTime,
        endTime,
        carWashCartId,
        visitingCharges,
        amount,
        tax,
        userId,
        vendor,
      },
    });

    res.status(201).json(response(201, true, 'Booking created successfully', newBooking));
  } catch (error) {
    next(error);
  }
};

// Get all bookings
exports.getAllBookings = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [bookings, totalBookings] = await Promise.all([
      prisma.carWashBooking.findMany({
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          carWashCart: {
            include: {
              cartItems: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.carWashBooking.count(),
    ]);

    res
      .status(200)
      .json(
        response(200, true, 'Bookings fetched successfully', {
          bookings,
          totalBookings,
          page: parseInt(page),
          limit: parseInt(limit),
        })
      );
  } catch (error) {
    next(error);
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await prisma.carWashBooking.findUnique({
      where: { id },
      include: {
        carWashCart: {
          include: {
            cartItems: true,
          },
        },
      },
    });

    if (!booking) {
      throw new CustomError('Booking not found', 404);
    }

    res.status(200).json(response(200, true, 'Booking fetched successfully', booking));
  } catch (error) {
    next(error);
  }
};

// Update a booking (vendor accepting the booking)
exports.updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { booked } = req.body;

    if (typeof booked !== 'boolean') {
      throw new CustomError('Invalid booked status', 400);
    }

    const updatedBooking = await prisma.carWashBooking.update({
      where: { id },
      data: { booked },
    });

    res.status(200).json(response(200, true, 'Booking updated successfully', updatedBooking));
  } catch (error) {
    next(error);
  }
};

// Delete a booking
exports.deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.carWashBooking.delete({
      where: { id },
    });

    res.status(200).json(response(200, true, 'Booking deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// Get bookings for a specific user
exports.getUserBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [bookings, totalBookings] = await Promise.all([
      prisma.carWashBooking.findMany({
        where: { userId },
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          carWashCart: {
            include: {
              cartItems: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.carWashBooking.count({ where: { userId } }),
    ]);

    res
      .status(200)
      .json(
        response(200, true, 'User bookings fetched successfully', {
          bookings,
          totalBookings,
          page: parseInt(page),
          limit: parseInt(limit),
        })
      );
  } catch (error) {
    next(error);
  }
};

// Get all bookings for a specific vendor
exports.getVendorBookings = async (req, res, next) => {
  try {
    const vendorId = req.vendor.id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [bookings, totalBookings] = await Promise.all([
      prisma.carWashBooking.findMany({
        where: { vendor: vendorId },
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          carWashCart: {
            include: {
              cartItems: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              mobile: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.carWashBooking.count({ where: { vendor: vendorId } }),
    ]);

    res
      .status(200)
      .json(
        response(200, true, 'Vendor bookings fetched successfully', {
          bookings,
          totalBookings,
          page: parseInt(page),
          limit: parseInt(limit),
        })
      );
  } catch (error) {
    next(error);
  }
};

// Get cart for a specific user
exports.getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [cartItems, totalItems] = await Promise.all([
      prisma.carWashCartItem.findMany({
        where: { carWashCart: { userId: userId } },
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          carWashService: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.carWashCartItem.count({ where: { carWashCart: { userId: userId } } }),
    ]);

    if (totalItems === 0) {
      throw new CustomError('Cart not found for this user', 404);
    }

    res
      .status(200)
      .json(
        response(200, true, 'Cart fetched successfully', {
          cartItems,
          totalItems,
          page: parseInt(page),
          limit: parseInt(limit),
        })
      );
  } catch (error) {
    next(error);
  }
};
