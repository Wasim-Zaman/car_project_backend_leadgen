const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const response = require('../utils/response');
const CustomError = require('../utils/error');
const fileHelper = require('../utils/file'); // Helper for deleting files

const prisma = new PrismaClient();

// Joi schema for service creation and update
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

// Create Service
exports.createService = async (req, res, next) => {
  try {
    console.log('Starting createService function');

    // Helper function to parse string or JSON to array
    const parseToArray = (input) => {
      if (Array.isArray(input)) return input;
      if (typeof input === 'string') {
        try {
          const parsed = JSON.parse(input);
          return Array.isArray(parsed) ? parsed : [input];
        } catch (e) {
          // If JSON parsing fails, split by comma
          return input.split(',').map((item) => item.trim());
        }
      }
      return [];
    };

    console.log('Parsing request body');
    // Parse inputs to arrays
    const parsedBody = {
      ...req.body,
      includingServices: parseToArray(req.body.includingServices),
      excludingServices: parseToArray(req.body.excludingServices),
      serviceImages: req.files && req.files.serviceImages ? req.files.serviceImages.map((file) => file.path) : [],
    };

    console.log('Parsed body:', parsedBody);

    console.log('Validating input');
    // Validate input
    const { error, value } = createServiceSchema.validate(parsedBody, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new CustomError(errorMessage, 400);
    }

    console.log('Input validated successfully');

    const {
      serviceName,
      serviceType,
      serviceDescription,
      includingServices,
      excludingServices,
      termsAndConditions,
      servicePrice,
      serviceImages,
    } = value;

    const vendorId = req.vendor.id;

    console.log('Checking if vendor exists');
    // Check if vendor exists
    const vendorExists = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendorExists) {
      throw new CustomError('Vendor not found', 404);
    }

    console.log('Vendor found, creating new service');
    // Create new service
    const newService = await prisma.carWashService.create({
      data: {
        serviceName,
        serviceType,
        serviceDescription,
        includingServices,
        excludingServices,
        termsAndConditions,
        servicePrice,
        vendorId,
        serviceImages,
      },
    });

    console.log('New service created successfully');

    res.status(201).json(response(201, true, 'Service created successfully', newService));
  } catch (error) {
    console.error('Error in createService:', error);

    // Delete uploaded files in case of error
    if (req.files && req.files.serviceImages) {
      for (const file of req.files.serviceImages) {
        await fileHelper.deleteFile(file.path);
      }
    }

    next(error);
  }
};

// Get All Services (with optional search and pagination)
exports.getServices = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [{ serviceName: { contains: search } }, { serviceType: { contains: search } }],
        }
      : {};

    const services = await prisma.carWashService.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    const totalServices = await prisma.carWashService.count({ where });

    res.status(200).json(response(200, true, 'Services fetched successfully', { services, totalServices }));
  } catch (error) {
    next(error);
  }
};

// Get Service by ID
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

// Update Service
exports.updateService = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate input
    const { error, value } = updateServiceSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new CustomError(errorMessage, 400);
    }

    const existingService = await prisma.carWashService.findUnique({ where: { id } });
    if (!existingService) {
      throw new CustomError('Service not found', 404);
    }

    const serviceImages =
      req.files && req.files.serviceImages
        ? req.files.serviceImages.map((file) => file.path)
        : existingService.serviceImages;

    // Delete old images if new ones are uploaded
    if (req.files && req.files.serviceImages) {
      for (const filePath of existingService.serviceImages) {
        await fileHelper.deleteFile(filePath);
      }
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
    // Delete newly uploaded files in case of error
    if (req.files && req.files.serviceImages) {
      for (const file of req.files.serviceImages) {
        await fileHelper.deleteFile(file.path);
      }
    }

    next(error);
  }
};

// Delete Service
exports.deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingService = await prisma.carWashService.findUnique({ where: { id } });
    if (!existingService) {
      throw new CustomError('Service not found', 404);
    }

    // Delete associated files (images) before deleting the service
    if (existingService.serviceImages) {
      for (const file of existingService.serviceImages) {
        await fileHelper.deleteFile(file);
      }
    }

    await prisma.carWashService.delete({ where: { id } });
    res.status(200).json(response(200, true, 'Service deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// Get paginated services for a specific vendor
exports.getServicesByVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const vendorExists = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendorExists) {
      throw new CustomError('Vendor not found', 404);
    }

    const services = await prisma.carWashService.findMany({
      where: { vendorId },
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    const totalServices = await prisma.carWashService.count({ where: { vendorId } });

    res.status(200).json(response(200, true, 'Services fetched successfully', { services, totalServices }));
  } catch (error) {
    next(error);
  }
};

// Get services count for a specific vendor
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
