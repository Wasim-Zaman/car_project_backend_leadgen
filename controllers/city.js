const City = require('../models/city');
const CustomError = require('../utils/error');
const generateResponse = require('../utils/response');

// Get paginated list of cities
exports.getCities = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const query = req.query.query || '';

  try {
    const cities = await City.get(page, limit, query);

    if (!cities || cities.data.length <= 0) {
      throw new CustomError('No cities found', 404);
    }

    res.status(200).json(generateResponse(200, true, 'Cities retrieved successfully', cities));
  } catch (error) {
    next(error);
  }
};

// Create a new city
exports.postCity = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    throw new CustomError('City name is required', 400);
  }

  try {
    const city = await City.create({
      name: name,
      status: req.body.status ? parseInt(req.body.status, 10) : 1,
    });

    res.status(201).json(generateResponse(201, true, 'City created successfully', city));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete a city by ID
exports.deleteCity = async (req, res, next) => {
  const { id } = req.params;

  try {
    const city = await City.findById(id);
    if (!city) {
      throw new CustomError('City not found', 404);
    }

    await City.deleteById(id);

    res.status(200).json(generateResponse(200, true, 'City deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// Update a city by ID
exports.patchCity = async (req, res, next) => {
  const { id } = req.params;
  const { name, status } = req.body;

  try {
    const city = await City.findById(id);
    if (!city) {
      throw new CustomError('City not found', 404);
    }

    const updatedCity = await City.updateById(id, {
      name: name || city.name,
      status: status || city.status,
    });

    res.status(200).json(generateResponse(200, true, 'City updated successfully', updatedCity));
  } catch (error) {
    next(error);
  }
};
