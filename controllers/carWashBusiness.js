// carWashBusinessController.js

const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const response = require('../utils/response');
const CustomError = require('../utils/error');
const fileHelper = require('../utils/file');

const prisma = new PrismaClient();

// Joi schemas for validation
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
});

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
});

exports.createCarWashBusiness = async (req, res, next) => {
  try {
    const { error, value } = createCarWashBusinessSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw new CustomError(error.details.map((detail) => detail.message).join(', '), 400);
    }

    const files = req.files?.files?.map((file) => file.path) || [];

    const newCarWashBusiness = await prisma.$transaction(async (prisma) => {
      const business = await prisma.carWashBusiness.create({
        data: {
          ...value,
          garageOpeningTime: value.garageOpeningTime ? new Date(value.garageOpeningTime) : undefined,
          garageClosingTime: value.garageClosingTime ? new Date(value.garageClosingTime) : undefined,
          files,
          vendor: req.vendor.id,
        },
      });
      return business;
    });

    res.status(201).json(response(201, true, 'Car wash business created successfully', newCarWashBusiness));
  } catch (error) {
    await fileHelper.deleteFiles(req.files?.files?.map((file) => file.path) || []);
    next(error);
  }
};

exports.updateCarWashBusiness = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = updateCarWashBusinessSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw new CustomError(error.details.map((detail) => detail.message).join(', '), 400);
    }

    const updatedBusiness = await prisma.$transaction(async (prisma) => {
      const existingBusiness = await prisma.carWashBusiness.findUnique({ where: { id } });
      if (!existingBusiness) {
        throw new CustomError('Car wash business not found', 404);
      }

      const files = req.files?.files?.map((file) => file.path) || existingBusiness.files;

      if (req.files?.files && existingBusiness.files) {
        await fileHelper.deleteFiles(existingBusiness.files);
      }

      return prisma.carWashBusiness.update({
        where: { id },
        data: {
          ...value,
          garageOpeningTime: value.garageOpeningTime ? new Date(value.garageOpeningTime) : undefined,
          garageClosingTime: value.garageClosingTime ? new Date(value.garageClosingTime) : undefined,
          files,
        },
      });
    });

    res.status(200).json(response(200, true, 'Car wash business updated successfully', updatedBusiness));
  } catch (error) {
    await fileHelper.deleteFiles(req.files?.files?.map((file) => file.path) || []);
    next(error);
  }
};

exports.getAllCarWashBusinesses = async (req, res, next) => {
  try {
    const querySchema = Joi.object({
      page: Joi.number().integer().min(1).optional(),
      limit: Joi.number().integer().min(1).optional(),
      search: Joi.string().optional(),
    });

    const { error, value } = querySchema.validate(req.query, { abortEarly: false });
    if (error) {
      throw new CustomError(error.details.map((detail) => detail.message).join(', '), 400);
    }

    const { page = 1, limit = 10, search } = value;

    const skip = (page - 1) * limit;
    const where = search
      ? {
          name: { contains: search, mode: 'insensitive' },
        }
      : {};

    const [carWashBusinesses, totalCarWashBusinesses] = await prisma.$transaction([
      prisma.carWashBusiness.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.carWashBusiness.count({ where }),
    ]);

    res.status(200).json(
      response(200, true, 'Car wash businesses fetched successfully', {
        carWashBusinesses,
        totalCarWashBusinesses,
        page: parseInt(page),
        limit: parseInt(limit),
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.getCarWashBusinessById = async (req, res, next) => {
  try {
    const { id } = req.params;

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

exports.deleteCarWashBusiness = async (req, res, next) => {
  try {
    const { id } = req.params;

    const idSchema = Joi.string().uuid().required();
    const { error } = idSchema.validate(id);
    if (error) {
      throw new CustomError('Invalid ID format', 400);
    }

    const carWashBusiness = await prisma.carWashBusiness.findUnique({ where: { id } });
    if (!carWashBusiness) {
      throw new CustomError('Car wash business not found', 404);
    }

    await prisma.$transaction(async (prisma) => {
      if (carWashBusiness.files) {
        await fileHelper.deleteFiles(carWashBusiness.files);
      }
      await prisma.carWashBusiness.delete({ where: { id } });
    });

    res.status(200).json(response(200, true, 'Car wash business deleted successfully'));
  } catch (error) {
    next(error);
  }
};
