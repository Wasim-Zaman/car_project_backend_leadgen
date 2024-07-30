const { body, validationResult } = require("express-validator");

const generateResponse = require("../utils/response");
const CustomError = require("../utils/customError");

// Validation rules for creating and updating a car
const carValidationRules = {
  postCar: [
    body("name").notEmpty().withMessage("Car name is required"),
    body("number").notEmpty().withMessage("Car number is required"),
    body("image").notEmpty().withMessage("Car image is required"),
    body("status").optional().isInt().withMessage("Status must be an integer"),
    body("rating").optional().isFloat().withMessage("Rating must be a float"),
    body("totalSeat")
      .optional()
      .isInt()
      .withMessage("Total seats must be an integer"),
    body("hasAC").optional().isBoolean().withMessage("hasAC must be a boolean"),
    body("driverName")
      .optional()
      .isString()
      .withMessage("Driver name must be a string"),
    body("driverMobile")
      .optional()
      .isString()
      .withMessage("Driver mobile must be a string"),
    body("gearSystem")
      .optional()
      .isString()
      .withMessage("Gear system must be a string"),
    body("rentPriceWithoutDriver")
      .optional()
      .isFloat()
      .withMessage("Rent price without driver must be a float"),
    body("rentPriceWithDriver")
      .optional()
      .isFloat()
      .withMessage("Rent price with driver must be a float"),
    body("engineHP")
      .optional()
      .isFloat()
      .withMessage("Engine HP must be a float"),
    body("priceType")
      .optional()
      .isString()
      .withMessage("Price type must be a string"),
    body("fuelType")
      .optional()
      .isString()
      .withMessage("Fuel type must be a string"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
    body("pickupAddress")
      .optional()
      .isString()
      .withMessage("Pickup address must be a string"),
    body("latitude")
      .optional()
      .isFloat()
      .withMessage("Latitude must be a float"),
    body("longitude")
      .optional()
      .isFloat()
      .withMessage("Longitude must be a float"),
    body("totalDrivenKM")
      .optional()
      .isInt()
      .withMessage("Total driven KM must be an integer"),
    body("minimumHoursRequired")
      .optional()
      .isInt()
      .withMessage("Minimum hours required must be an integer"),
    body("carTypeId")
      .notEmpty()
      .isInt()
      .withMessage("Car type ID is required and must be an integer"),
    body("brandId")
      .notEmpty()
      .isInt()
      .withMessage("Brand ID is required and must be an integer"),
    body("cityId")
      .notEmpty()
      .isInt()
      .withMessage("City ID is required and must be an integer"),
    body("facilities")
      .optional()
      .isArray()
      .withMessage("Facilities must be an array of integers")
      .custom((array) => array.every((id) => Number.isInteger(id)))
      .withMessage("Each facility ID must be an integer"),
    body("carOwner")
      .optional()
      .isString()
      .withMessage("Car owner must be a string"),
  ],
  patchCar: [
    body("name").optional().isString().withMessage("Car name must be a string"),
    body("number")
      .optional()
      .isString()
      .withMessage("Car number must be a string"),
    body("image")
      .optional()
      .isString()
      .withMessage("Car image must be a string"),
    body("status").optional().isInt().withMessage("Status must be an integer"),
    body("rating").optional().isFloat().withMessage("Rating must be a float"),
    body("totalSeat")
      .optional()
      .isInt()
      .withMessage("Total seats must be an integer"),
    body("hasAC").optional().isBoolean().withMessage("hasAC must be a boolean"),
    body("driverName")
      .optional()
      .isString()
      .withMessage("Driver name must be a string"),
    body("driverMobile")
      .optional()
      .isString()
      .withMessage("Driver mobile must be a string"),
    body("gearSystem")
      .optional()
      .isString()
      .withMessage("Gear system must be a string"),
    body("rentPriceWithoutDriver")
      .optional()
      .isFloat()
      .withMessage("Rent price without driver must be a float"),
    body("rentPriceWithDriver")
      .optional()
      .isFloat()
      .withMessage("Rent price with driver must be a float"),
    body("engineHP")
      .optional()
      .isFloat()
      .withMessage("Engine HP must be a float"),
    body("priceType")
      .optional()
      .isString()
      .withMessage("Price type must be a string"),
    body("fuelType")
      .optional()
      .isString()
      .withMessage("Fuel type must be a string"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
    body("pickupAddress")
      .optional()
      .isString()
      .withMessage("Pickup address must be a string"),
    body("latitude")
      .optional()
      .isFloat()
      .withMessage("Latitude must be a float"),
    body("longitude")
      .optional()
      .isFloat()
      .withMessage("Longitude must be a float"),
    body("totalDrivenKM")
      .optional()
      .isInt()
      .withMessage("Total driven KM must be an integer"),
    body("minimumHoursRequired")
      .optional()
      .isInt()
      .withMessage("Minimum hours required must be an integer"),
    body("carTypeId")
      .optional()
      .isInt()
      .withMessage("Car type ID must be an integer"),
    body("brandId")
      .optional()
      .isInt()
      .withMessage("Brand ID must be an integer"),
    body("cityId").optional().isInt().withMessage("City ID must be an integer"),
    body("facilities")
      .optional()
      .isArray()
      .withMessage("Facilities must be an array of integers")
      .custom((array) => array.every((id) => Number.isInteger(id)))
      .withMessage("Each facility ID must be an integer"),
    body("carOwner")
      .optional()
      .isString()
      .withMessage("Car owner must be a string"),
  ],
};

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(generateResponse(422, false, "Validation failed", errors.array()));
  }
  next();
};

module.exports = { carValidationRules, validate };
