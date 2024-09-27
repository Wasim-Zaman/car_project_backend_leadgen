const Position = require('../models/positionModel');

exports.createPosition = async (req, res, next) => {
  try {
    const positionData = req.body;
    const newPosition = await Position.createPosition(positionData);
    res.status(201).json({
      success: true,
      message: 'Position created successfully',
      data: newPosition,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPosition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const position = await Position.getPositionById(id);
    res.status(200).json({
      success: true,
      message: 'Position found successfully',
      data: position,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPositions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const positions = await Position.getAllPositions(Number(page), Number(limit));
    res.status(200).json({
      success: true,
      message: 'Positions retrieved successfully',
      data: positions.data,
      pagination: positions.pagination,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePosition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const positionData = req.body;
    const updatedPosition = await Position.updatePositionById(id, positionData);
    res.status(200).json({
      success: true,
      message: 'Position updated successfully',
      data: updatedPosition,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePosition = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Position.deletePositionById(id);
    res.status(200).json({
      success: true,
      message: 'Position deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
