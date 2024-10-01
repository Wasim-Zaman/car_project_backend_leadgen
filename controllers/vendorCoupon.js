const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');

const response = require('../utils/response');
const CustomError = require('../utils/error');

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

    const newCoupon = await prisma.vendorCoupon.create({
      data: {
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
      },
    });

    res.status(201).json(response(201, true, 'Coupon created successfully', newCoupon));
  } catch (error) {
    next(error);
  }
};

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
      },
    });

    res.status(200).json(response(200, true, 'Coupon updated successfully', updatedCoupon));
  } catch (error) {
    next(error);
  }
};

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
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
          ],
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
    if (currentDate < coupon.startDate || (coupon.endDate && currentDate > coupon.endDate)) {
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
