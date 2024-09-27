const Position = require('../models/position');
const generateResponse = require('../utils/response');

exports.createPosition = async (req, res, next) => {
  try {
    const positionData = req.body;
    const newPosition = await Position.createPosition(positionData);
    res.status(201).json(generateResponse(201, true, 'Position created successfully', newPosition));
  } catch (error) {
    res.status(500).json(generateResponse(500, false, error.message));
  }
};

exports.getPosition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const position = await Position.getPositionById(id);
    if (position) {
      res.status(200).json(generateResponse(200, true, 'Position found successfully', position));
    } else {
      res.status(404).json(generateResponse(404, false, 'Position not found'));
    }
  } catch (error) {
    res.status(500).json(generateResponse(500, false, error.message));
  }
};

exports.getPositions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const positions = await Position.getPositions(Number(page), Number(limit));
    res
      .status(200)
      .json(generateResponse(200, true, 'Positions retrieved successfully', positions.data, positions.pagination));
  } catch (error) {
    res.status(500).json(generateResponse(500, false, error.message));
  }
};

exports.getAllPositions = async (req, res, next) => {
  try {
    const positions = await Position.getAllPositions();
    res.status(200).json(generateResponse(200, true, 'All Positions retrieved successfully', positions));
  } catch (error) {
    res.status(500).json(generateResponse(500, false, error.message));
  }
};

exports.updatePosition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const positionData = req.body;
    const updatedPosition = await Position.updatePositionById(id, positionData);
    if (updatedPosition) {
      res.status(200).json(generateResponse(200, true, 'Position updated successfully', updatedPosition));
    } else {
      res.status(404).json(generateResponse(404, false, 'Position not found'));
    }
  } catch (error) {
    res.status(500).json(generateResponse(500, false, error.message));
  }
};

exports.deletePosition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Position.deletePositionById(id);
    if (result) {
      res.status(200).json(generateResponse(200, true, 'Position deleted successfully'));
    } else {
      res.status(404).json(generateResponse(404, false, 'Position not found'));
    }
  } catch (error) {
    res.status(500).json(generateResponse(500, false, error.message));
  }
};
