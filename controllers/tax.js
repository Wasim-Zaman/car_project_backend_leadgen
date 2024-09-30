const { PrismaClient } = require('@prisma/client');

const response = require('../utils/response');
const CustomError = require('../utils/error');

const prisma = new PrismaClient();

exports.createTax = async (req, res, next) => {
  try {
    const { type, tax } = req.body;
    const existingTax = await prisma.tax.findUnique({ where: { type } });

    if (existingTax) {
      throw new CustomError('Tax already exists', 400);
    }

    const newTax = await prisma.tax.create({ data: { type, tax } });
    res.status(201).json(response(201, true, 'Tax created successfully', newTax));
  } catch (error) {
    next(error);
  }
};

// Get all taxes
exports.getTaxes = async (req, res, next) => {
  try {
    const taxes = await prisma.tax.findMany();
    res.status(200).json(response(200, true, 'Taxes fetched successfully', taxes));
  } catch (error) {
    next(error);
  }
};

// Get tax by ID
exports.getTaxById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tax = await prisma.tax.findUnique({ where: { id: Number(id) } });

    if (!tax) {
      throw new CustomError('Tax not found', 404);
    }

    res.status(200).json(response(200, true, 'Tax fetched successfully', tax));
  } catch (error) {
    next(error);
  }
};

exports.updateTax = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, tax } = req.body;

    const existingTax = await prisma.tax.findUnique({ where: { id: Number(id) } });

    if (!existingTax) {
      throw new CustomError('Tax not found', 404);
    }

    const updatedTax = await prisma.tax.update({
      where: { id: Number(id) },
      data: { type, tax },
    });

    res.status(200).json(response(200, true, 'Tax updated successfully', updatedTax));
  } catch (error) {
    next(error);
  }
};

exports.deleteTax = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingTax = await prisma.tax.findUnique({ where: { id: Number(id) } });

    if (!existingTax) {
      throw new CustomError('Tax not found', 404);
    }

    await prisma.tax.delete({ where: { id: Number(id) } });
    res.status(200).json(response(200, true, 'Tax deleted successfully'));
  } catch (error) {
    next(error);
  }
};
