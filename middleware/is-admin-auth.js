const jwt = require("jsonwebtoken");
require("dotenv").config();

const CustomError = require("../utils/customError");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new CustomError("You are not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    err.message = null;
    throw err;
  }

  if (!decodedToken) {
    const error = new CustomError("You are not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  if (decodedToken.email !== process.env.ADMIN_EMAIL) {
    throw new CustomError(
      "You are not authorized to access this resource.",
      403
    );
  }
  req.email = decodedToken.email;

  next();
};
