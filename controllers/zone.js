const Zone = require('../models/zone');
const CustomError = require('../utils/error');
const response = require('../utils/response');

// Create a new Zone
exports.createZone = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newZone = await Zone.create({ name });

    res.status(201).json(response(201, true, 'Zone created successfully', newZone));
  } catch (error) {
    console.log(`Error in createZone: ${error.message}`);
    next(error);
  }
};

// Get Zone by ID
exports.getZoneById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const zone = await Zone.findById(id);
    if (!zone) {
      throw new CustomError('Zone not found', 404);
    }
    res.status(200).json(response(200, true, 'Zone found successfully', zone));
  } catch (error) {
    console.log(`Error in getZoneById: ${error.message}`);
    next(error);
  }
};

// Update a Zone by ID
exports.updateZoneById = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updateData = {};
    if (name) updateData.name = name;

    const updatedZone = await Zone.updateById(id, updateData);

    res.status(200).json(response(200, true, 'Zone updated successfully', updatedZone));
  } catch (error) {
    console.log(`Error in updateZoneById: ${error.message}`);
    next(error);
  }
};

// Delete a Zone by ID
exports.deleteZoneById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const zone = await Zone.findById(id);
    if (!zone) {
      throw new CustomError('Zone not found', 404);
    }

    await Zone.deleteById(id);

    res.status(200).json(response(200, true, 'Zone deleted successfully'));
  } catch (error) {
    console.log(`Error in deleteZoneById: ${error.message}`);
    next(error);
  }
};

// Get all Zones with pagination
exports.getZones = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = '' } = req.query;

    const zones = await Zone.get(Number(page), Number(limit), query);

    if (!zones.data.length) {
      throw new CustomError('No Zones found', 404);
    }

    res.status(200).json(response(200, true, 'Zones retrieved successfully', zones));
  } catch (error) {
    console.log(`Error in getZones: ${error.message}`);
    next(error);
  }
};
