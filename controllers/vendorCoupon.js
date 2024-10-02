const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');

const response = require('../utils/response');
const CustomError = require('../utils/error');

const prisma = new PrismaClient(); // Ensure PrismaClient is initialized

// Schema for creating a vendor coupon
const createVendorCouponSchema = Joi.object({
  title: Joi.string().required(),
  code: Joi.string().required(),
  type: Joi.string().optional(),
  limitPerUser: Joi.number().integer().optional(),
  discountType: Joi.string().valid('FLAT', 'PERCENTAGE').required(),
  discountValue: Joi.number().positive().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  maxDiscount: Joi.number().positive().optional(),
  minOrderAmount: Joi.number().positive().optional(),
  vendor: Joi.string().optional(),
});

// Schema for updating a vendor coupon
const updateVendorCouponSchema = Joi.object({
  title: Joi.string().optional(),
  code: Joi.string().optional(),
  type: Joi.string().optional(),
  limitPerUser: Joi.number().integer().optional(),
  discountType: Joi.string().valid('FLAT', 'PERCENTAGE').optional(),
  discountValue: Joi.number().positive().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  maxDiscount: Joi.number().positive().optional(),
  minOrderAmount: Joi.number().positive().optional(),
});

// Schema for fetching coupons (with pagination and search)
const fetchVendorCouponsSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  search: Joi.string().optional(),
});

// Create a new vendor coupon
exports.createVendorCoupon = async (req, res, next) => {
  try {
    // Validate input using Joi
    const { error, value } = createVendorCouponSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new CustomError(errorMessage, 400);
    }

    const {
      title,
      code,
      type,
      limitPerUser,
      discountType,
      discountValue,
      startDate,
      endDate,
      maxDiscount,
      minOrderAmount,
    } = value;

    // Check for unique coupon code
    const couponExists = await prisma.vendorCoupon.findUnique({ where: { code } });
    if (couponExists) {
      throw new CustomError('Coupon code already exists', 400);
    }

    // Prisma handles ISO 8601 date strings natively
    const newCoupon = await prisma.vendorCoupon.create({
      data: {
        title,
        code,
        type,
        limitPerUser,
        discountType,
        discountValue,
        startDate: new Date(startDate), // Parse ISO date string to Date object
        endDate: endDate ? new Date(endDate) : null, // Optional end date
        maxDiscount,
        minOrderAmount,
        vendorId: req.vendor.id,
      },
    });

    res.status(201).json(response(201, true, 'Coupon created successfully', newCoupon));
  } catch (error) {
    next(error);
  }
};

// Update a vendor coupon by ID
exports.updateVendorCoupon = async (req, res, next) => {
  try {
    // Validate input using Joi
    const { error, value } = updateVendorCouponSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new CustomError(errorMessage, 400);
    }

    const { id } = req.params;

    const coupon = await prisma.vendorCoupon.findUnique({ where: { id: parseInt(id) } });
    if (!coupon) {
      throw new CustomError('Coupon not found', 404);
    }

    const updatedCoupon = await prisma.vendorCoupon.update({
      where: { id: parseInt(id) },
      data: {
        ...value,
        startDate: value.startDate ? new Date(value.startDate) : undefined, // Parse ISO string if present
        endDate: value.endDate ? new Date(value.endDate) : undefined, // Parse ISO string if present
      },
    });

    res.status(200).json(response(200, true, 'Coupon updated successfully', updatedCoupon));
  } catch (error) {
    next(error);
  }
};

// Get all vendor coupons (with pagination and optional search)
exports.getAllCoupons = async (req, res, next) => {
  try {
    // Validate query parameters using Joi
    const { error, value } = fetchVendorCouponsSchema.validate(req.query, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new CustomError(errorMessage, 400);
    }

    const { page = 1, limit = 10, search } = value;

    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [{ title: { contains: search } }, { code: { contains: search } }],
        }
      : {};

    const coupons = await prisma.vendorCoupon.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    const totalCoupons = await prisma.vendorCoupon.count({ where });

    res.status(200).json(response(200, true, 'Coupons fetched successfully', { coupons, totalCoupons }));
  } catch (error) {
    next(error);
  }
};

// Get All Vendor coupons
exports.getVendorCoupons = async (req, res, next) => {
  try {
    // Validate query parameters using Joi
    const { error, value } = fetchVendorCouponsSchema.validate(req.query, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new CustomError(errorMessage, 400);
    }

    const { page = 1, limit = 10, search } = value;

    const skip = (page - 1) * limit;
    const vendorId = req.vendor.id ?? req.params.vendorId;

    const where = search
      ? {
          AND: [
            { vendor: vendorId },
            {
              OR: [{ title: { contains: search } }, { code: { contains: search } }],
            },
          ],
        }
      : { vendor: vendorId };

    const coupons = await prisma.vendorCoupon.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    const totalCoupons = await prisma.vendorCoupon.count({ where });

    res.status(200).json(response(200, true, 'Coupons fetched successfully', { coupons, totalCoupons }));
  } catch (error) {
    next(error);
  }
};

// Apply a coupon by user
exports.applyCouponByUser = async (req, res, next) => {
  try {
    const { code } = req.body;
    const { id: userId } = req.user;

    // Find the coupon by its code
    const coupon = await prisma.vendorCoupon.findUnique({ where: { code } });
    if (!coupon) {
      throw new CustomError('Coupon not found', 404);
    }

    // Check if the coupon is still valid
    const currentDate = new Date();
    if (currentDate < new Date(coupon.startDate) || (coupon.endDate && currentDate > new Date(coupon.endDate))) {
      throw new CustomError('Coupon is expired', 400);
    }

    // Parse the `users` JSON field, if it exists; otherwise, initialize an empty array
    let usersUsedCoupon = coupon.users ? JSON.parse(coupon.users) : [];

    // Check if the user has already used this coupon
    const userUsage = usersUsedCoupon.find((user) => user.userId === userId);

    // If the user has used the coupon more times than allowed, throw an error
    if (userUsage && userUsage.usageCount >= coupon.limitPerUser) {
      throw new CustomError('User has reached the limit for this coupon', 400);
    }

    // If the user has not used the coupon before, add them to the list with usageCount = 1
    if (!userUsage) {
      usersUsedCoupon.push({
        userId: userId,
        usageCount: 1,
      });
    } else {
      // If the user has used the coupon before, increment their usageCount
      userUsage.usageCount += 1;
    }

    // Update the coupon with the updated `users` array
    await prisma.vendorCoupon.update({
      where: { id: coupon.id },
      data: {
        users: JSON.stringify(usersUsedCoupon),
      },
    });

    res.status(200).json(response(200, true, 'Coupon applied successfully'));
  } catch (error) {
    next(error);
  }
};

// Delete a vendor coupon by ID
exports.deleteVendorCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;

    const coupon = await prisma.vendorCoupon.findUnique({ where: { id: parseInt(id) } });
    if (!coupon) {
      throw new CustomError('Coupon not found', 404);
    }

    await prisma.vendorCoupon.delete({ where: { id: parseInt(id) } });

    res.status(200).json(response(200, true, 'Coupon deleted successfully'));
  } catch (error) {
    next(error);
  }
};
