const { PrismaClient } = require('@prisma/client');
const response = require('../utils/response');
const CustomError = require('../utils/error');
const fileHelper = require('../utils/file'); // Helper for deleting files

const prisma = new PrismaClient();

// Create Service
exports.createService = async (req, res, next) => {
  const transaction = await prisma.$transaction();
  try {
    const {
      serviceName,
      serviceType,
      serviceDescription,
      includingServices,
      excludingServices,
      termsAndConditions,
      servicePrice,
      vendorId,
    } = req.body;

    const vendorExists = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendorExists) {
      throw new CustomError('Vendor not found', 404);
    }

    const serviceImages = req.files && req.files.serviceImages ? req.files.serviceImages.map((file) => file.path) : [];

    const newService = await prisma.service.create({
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

    await transaction.commit();
    res.status(201).json(response(201, true, 'Service created successfully', newService));
  } catch (error) {
    await transaction.rollback();

    // Await deletion of uploaded files in case of an error
    if (req.files && req.files.serviceImages) {
      for (const file of req.files.serviceImages) {
        await fileHelper.deleteFile(file.path);
      }
    }

    next(error);
  }
};

// Get All Services (with optional partial search & pagination)
exports.getServices = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { serviceName: { contains: search, mode: 'insensitive' } },
            { serviceType: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const services = await prisma.service.findMany({
      where,
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    const totalServices = await prisma.service.count({ where });

    res.status(200).json(response(200, true, 'Services fetched successfully', { services, totalServices }));
  } catch (error) {
    next(error);
  }
};

// Get Service by ID
exports.getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({ where: { id } });

    if (!service) {
      throw new CustomError('Service not found', 404);
    }

    res.status(200).json(response(200, true, 'Service fetched successfully', service));
  } catch (error) {
    next(error);
  }
};

// Create Service
exports.createService = async (req, res, next) => {
  const transaction = await prisma.$transaction();
  try {
    const {
      serviceName,
      serviceType,
      serviceDescription,
      includingServices,
      excludingServices,
      termsAndConditions,
      servicePrice,
      vendorId,
    } = req.body;

    const vendorExists = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendorExists) {
      throw new CustomError('Vendor not found', 404);
    }

    const serviceImages = req.files && req.files.serviceImages ? req.files.serviceImages.map((file) => file.path) : [];

    const newService = await prisma.service.create({
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

    await transaction.commit();
    res.status(201).json(response(201, true, 'Service created successfully', newService));
  } catch (error) {
    await transaction.rollback();

    // Await deletion of uploaded files in case of an error
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

    const existingService = await prisma.service.findUnique({ where: { id } });
    if (!existingService) {
      throw new CustomError('Service not found', 404);
    }

    // Delete associated files (images) before deleting the service
    if (existingService.serviceImages) {
      existingService.serviceImages.forEach((file) => fileHelper.deleteFile(file));
    }

    await prisma.service.delete({ where: { id } });
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

    const services = await prisma.service.findMany({
      where: { vendorId },
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    const totalServices = await prisma.service.count({ where: { vendorId } });

    res.status(200).json(response(200, true, 'Services fetched successfully', { services, totalServices }));
  } catch (error) {
    next(error);
  }
};

// Get services count for a specific vendor
exports.getServiceCountForVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.params;

    const vendorExists = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendorExists) {
      throw new CustomError('Vendor not found', 404);
    }

    const serviceCount = await prisma.service.count({ where: { vendorId } });

    res.status(200).json(response(200, true, 'Service count fetched successfully', { serviceCount }));
  } catch (error) {
    next(error);
  }
};
