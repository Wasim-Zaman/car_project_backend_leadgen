const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const response = require('../utils/response');
const CustomError = require('../utils/error');
const fileHelper = require('../utils/file');

const prisma = new PrismaClient();

const createServiceSchema = Joi.object({
  serviceName: Joi.string().required(),
  serviceType: Joi.string().required(),
  serviceDescription: Joi.string().optional(),
  includingServices: Joi.array().items(Joi.string()).optional(),
  excludingServices: Joi.array().items(Joi.string()).optional(),
  termsAndConditions: Joi.string().optional(),
  servicePrice: Joi.number().positive().required(),
  serviceImages: Joi.array().items(Joi.string()).optional(),
});

const updateServiceSchema = Joi.object({
  serviceName: Joi.string().optional(),
  serviceType: Joi.string().optional(),
  serviceDescription: Joi.string().optional(),
  includingServices: Joi.array().items(Joi.string()).optional(),
  excludingServices: Joi.array().items(Joi.string()).optional(),
  termsAndConditions: Joi.string().optional(),
  servicePrice: Joi.number().positive().optional(),
});

const parseToArray = (input) => {
  if (Array.isArray(input)) return input;
  if (typeof input === 'string') {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [input];
    } catch (e) {
      return input.split(',').map((item) => item.trim());
    }
  }
  return [];
};

exports.createService = async (req, res, next) => {
  try {
    const parsedBody = {
      ...req.body,
      includingServices: parseToArray(req.body.includingServices),
      excludingServices: parseToArray(req.body.excludingServices),
      serviceImages: req.files?.serviceImages?.map((file) => file.path) || [],
    };

    const { error, value } = createServiceSchema.validate(parsedBody, { abortEarly: false });
    if (error) {
      throw new CustomError(error.details.map((detail) => detail.message).join(', '), 400);
    }

    const vendorId = req.vendor.id;
    const vendorExists = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendorExists) {
      throw new CustomError('Vendor not found', 404);
    }

    const newService = await prisma.carWashService.create({
      data: { ...value, vendorId },
    });

    res.status(201).json(response(201, true, 'Service created successfully', newService));
  } catch (error) {
    if (req.files?.serviceImages) {
      await Promise.all(req.files.serviceImages.map((file) => fileHelper.deleteFile(file.path)));
    }
    next(error);
  }
};

exports.getServices = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;
    const where = search ? { OR: [{ serviceName: { contains: search } }, { serviceType: { contains: search } }] } : {};

    const [services, totalServices] = await Promise.all([
      prisma.carWashService.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
      }),
      prisma.carWashService.count({ where }),
    ]);

    res.status(200).json(response(200, true, 'Services fetched successfully', { services, totalServices }));
  } catch (error) {
    next(error);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await prisma.carWashService.findUnique({ where: { id } });
    if (!service) {
      throw new CustomError('Service not found', 404);
    }
    res.status(200).json(response(200, true, 'Service fetched successfully', service));
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = updateServiceSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw new CustomError(error.details.map((detail) => detail.message).join(', '), 400);
    }

    const existingService = await prisma.carWashService.findUnique({ where: { id } });
    if (!existingService) {
      throw new CustomError('Service not found', 404);
    }

    const serviceImages = req.files?.serviceImages
      ? req.files.serviceImages.map((file) => file.path)
      : existingService.serviceImages;

    if (req.files?.serviceImages) {
      await Promise.all(existingService.serviceImages.map((filePath) => fileHelper.deleteFile(filePath)));
    }

    const updatedService = await prisma.carWashService.update({
      where: { id },
      data: {
        ...value,
        includingServices: value.includingServices ? JSON.stringify(value.includingServices) : undefined,
        excludingServices: value.excludingServices ? JSON.stringify(value.excludingServices) : undefined,
        serviceImages,
      },
    });

    res.status(200).json(response(200, true, 'Service updated successfully', updatedService));
  } catch (error) {
    if (req.files?.serviceImages) {
      await Promise.all(req.files.serviceImages.map((file) => fileHelper.deleteFile(file.path)));
    }
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingService = await prisma.carWashService.findUnique({ where: { id } });
    if (!existingService) {
      throw new CustomError('Service not found', 404);
    }

    if (existingService.serviceImages) {
      await Promise.all(existingService.serviceImages.map((file) => fileHelper.deleteFile(file)));
    }

    await prisma.carWashService.delete({ where: { id } });
    res.status(200).json(response(200, true, 'Service deleted successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getServicesByVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const vendorExists = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendorExists) {
      throw new CustomError('Vendor not found', 404);
    }

    const [services, totalServices] = await Promise.all([
      prisma.carWashService.findMany({
        where: { vendorId },
        skip: parseInt(skip),
        take: parseInt(limit),
      }),
      prisma.carWashService.count({ where: { vendorId } }),
    ]);

    res.status(200).json(response(200, true, 'Services fetched successfully', { services, totalServices }));
  } catch (error) {
    next(error);
  }
};

exports.getServiceCountForVendor = async (req, res, next) => {
  try {
    const vendorExists = await prisma.vendor.findUnique({ where: { id: req.vendor.id } });
    if (!vendorExists) {
      throw new CustomError('Vendor not found', 404);
    }

    const serviceCount = await prisma.carWashService.count({ where: { vendorId: req.vendor.id } });
    res.status(200).json(response(200, true, 'Service count fetched successfully', { serviceCount }));
  } catch (error) {
    next(error);
  }
};
