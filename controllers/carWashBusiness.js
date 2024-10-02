// carWashBusinessController.js

const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const response = require('../utils/response');
const CustomError = require('../utils/error');
const fileHelper = require('../utils/file'); // Helper for deleting files

const prisma = new PrismaClient();

// Joi schemas for validation

// Schema for creating a car wash business
const createCarWashBusinessSchema = Joi.object({
  name: Joi.string().required(),
  servicePrice: Joi.number().positive().optional(),
  availableCarCity: Joi.string().optional(),
  currentLocation: Joi.string().optional(),
  garageLat: Joi.number().optional(),
  garageLong: Joi.number().optional(),
  garageServiceType: Joi.string().optional(),
  aboutUs: Joi.string().optional(),
  garageAddress: Joi.string().optional(),
  garageOpeningTime: Joi.date().optional(),
  garageClosingTime: Joi.date().optional(),
  vendor: Joi.string().optional(),
  // Files will be validated separately
});

// Schema for updating a car wash business
const updateCarWashBusinessSchema = Joi.object({
  name: Joi.string().optional(),
  servicePrice: Joi.number().positive().optional(),
  availableCarCity: Joi.string().optional(),
  currentLocation: Joi.string().optional(),
  garageLat: Joi.number().optional(),
  garageLong: Joi.number().optional(),
  garageServiceType: Joi.string().optional(),
  aboutUs: Joi.string().optional(),
  garageAddress: Joi.string().optional(),
  garageOpeningTime: Joi.date().optional(),
  garageClosingTime: Joi.date().optional(),
  // Files will be validated separately
});

// Create Car Wash Business
exports.createCarWashBusiness = async (req, res, next) => {
  // Start a transaction
  const transaction = await prisma.$transaction();
  try {
    // Validate input data using Joi
    const { error, value } = createCarWashBusinessSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new CustomError(errorMessage, 400);
    }

    // Collect file paths
    const files = req.files && req.files.files ? req.files.files.map((file) => file.path) : [];

    // Optionally, you can perform additional validation on the files if needed

    const newCarWashBusiness = await prisma.carWashBusiness.create({
      data: {
        ...value,
        garageOpeningTime: value.garageOpeningTime ? new Date(value.garageOpeningTime) : undefined,
        garageClosingTime: value.garageClosingTime ? new Date(value.garageClosingTime) : undefined,
        files,
        vendor: req.vendor.id,
      },
    });

    await transaction.commit();
    res.status(201).json(response(201, true, 'Car wash business created successfully', newCarWashBusiness));
  } catch (error) {
    await transaction.rollback();

    // Delete uploaded files in case of an error
    if (req.files && req.files.files) {
      for (const file of req.files.files) {
        await fileHelper.deleteFile(file.path);
      }
    }

    next(error);
  }
};

// Update Car Wash Business
exports.updateCarWashBusiness = async (req, res, next) => {
  // Start a transaction
  const transaction = await prisma.$transaction();
  try {
    const { id } = req.params;

    const existingBusiness = await prisma.carWashBusiness.findUnique({ where: { id } });
    if (!existingBusiness) {
      throw new CustomError('Car wash business not found', 404);
    }

    // Validate input data using Joi
    const { error, value } = updateCarWashBusinessSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new CustomError(errorMessage, 400);
    }

    // Collect file paths
    const files = req.files && req.files.files ? req.files.files.map((file) => file.path) : existingBusiness.files;

    // Delete old files if new files are uploaded
    if (req.files && req.files.files && existingBusiness.files) {
      for (const filePath of existingBusiness.files) {
        await fileHelper.deleteFile(filePath);
      }
    }

    const updatedBusiness = await prisma.carWashBusiness.update({
      where: { id },
      data: {
        ...value,
        garageOpeningTime: value.garageOpeningTime ? new Date(value.garageOpeningTime) : undefined,
        garageClosingTime: value.garageClosingTime ? new Date(value.garageClosingTime) : undefined,
        files,
      },
    });

    await transaction.commit();
    res.status(200).json(response(200, true, 'Car wash business updated successfully', updatedBusiness));
  } catch (error) {
    await transaction.rollback();

    // Delete newly uploaded files in case of an error
    if (req.files && req.files.files) {
      for (const file of req.files.files) {
        await fileHelper.deleteFile(file.path);
      }
    }

    next(error);
  }
};

// Get All Car Wash Businesses (with optional search & pagination)
exports.getAllCarWashBusinesses = async (req, res, next) => {
  try {
    // Validate query parameters
    const querySchema = Joi.object({
      page: Joi.number().integer().min(1).optional(),
      limit: Joi.number().integer().min(1).optional(),
      search: Joi.string().optional(),
    });

    const { error, value } = querySchema.validate(req.query, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new CustomError(errorMessage, 400);
    }

    const { page = 1, limit = 10, search } = value;

    const skip = (page - 1) * limit;
    const where = search
      ? {
          name: { contains: search, mode: 'insensitive' },
        }
      : {};

    const carWashBusinesses = await prisma.carWashBusiness.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
    });

    const totalCarWashBusinesses = await prisma.carWashBusiness.count({ where });

    res.status(200).json(
      response(200, true, 'Car wash businesses fetched successfully', {
        carWashBusinesses,
        totalCarWashBusinesses,
      })
    );
  } catch (error) {
    next(error);
  }
};

// Get Car Wash Business by ID
exports.getCarWashBusinessById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID parameter
    const idSchema = Joi.string().uuid().required();
    const { error } = idSchema.validate(id);
    if (error) {
      throw new CustomError('Invalid ID format', 400);
    }

    const carWashBusiness = await prisma.carWashBusiness.findUnique({ where: { id } });
    if (!carWashBusiness) {
      throw new CustomError('Car wash business not found', 404);
    }

    res.status(200).json(response(200, true, 'Car wash business fetched successfully', carWashBusiness));
  } catch (error) {
    next(error);
  }
};

// Get Car Wash Business by vendor
exports.getCarWashBusinessByVendor = async (req, res, next) => {
  try {
    const vendorId = req.vendor.id ?? req.params.vendorId;

    const carWashBusiness = await prisma.carWashBusiness.findFirst({
      where: { vendorId: vendorId },
    });

    if (!carWashBusiness) {
      throw new CustomError('Car wash business not found', 404);
    }

    res.status(200).json(response(200, true, 'Car wash business fetched successfully', carWashBusiness));
  } catch (error) {
    next(error);
  }
};

// Delete Car Wash Business
exports.deleteCarWashBusiness = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID parameter
    const idSchema = Joi.string().uuid().required();
    const { error } = idSchema.validate(id);
    if (error) {
      throw new CustomError('Invalid ID format', 400);
    }

    const carWashBusiness = await prisma.carWashBusiness.findUnique({ where: { id } });
    if (!carWashBusiness) {
      throw new CustomError('Car wash business not found', 404);
    }

    // Delete associated files before deleting the business
    if (carWashBusiness.files) {
      for (const filePath of carWashBusiness.files) {
        await fileHelper.deleteFile(filePath);
      }
    }

    await prisma.carWashBusiness.delete({ where: { id } });

    res.status(200).json(response(200, true, 'Car wash business deleted successfully'));
  } catch (error) {
    next(error);
  }
};
