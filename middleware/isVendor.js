const jwt = require('jsonwebtoken');
require('dotenv').config();

const CustomError = require('../utils/error');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new CustomError('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const error = new CustomError('Your session has expired. Please log in again.');
      error.statusCode = 401;
      return next(error);
    } else {
      const error = new CustomError('Failed to authenticate token.');
      error.statusCode = 500;
      return next(error);
    }
  }

  if (!decodedToken) {
    const error = new CustomError('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  req.vendor = decodedToken;

  if (req.vendor.status == 0 || req.vendor.status == null) {
    throw new CustomError('Your account is not active. Please contact the admin.', 401);
  }

  next();
};
