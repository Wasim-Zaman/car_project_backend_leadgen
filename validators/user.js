const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const CustomError = require("../utils/customError");

// Middleware for validating user registration data
const registerUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .custom(async (email) => {
      const user = await User.findByEmail(email);
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    }),
  body("mobile")
    .isMobilePhone("any")
    .withMessage("Invalid mobile number")
    .bail()
    .custom(async (mobile) => {
      const user = await User.findByMobile(mobile);
      if (user) {
        return Promise.reject("Mobile number already in use");
      }
    }),
  body("lat").notEmpty().isFloat().withMessage("Lat is required"),
  body("long").notEmpty().isFloat().withMessage("Long is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("referralCode").optional(),
];

// Middleware for validating OTP data
const verifyOTPValidator = [
  body("mobile").isMobilePhone("any").withMessage("Invalid mobile number"),
  body("otp").isLength({ min: 4, max: 6 }).withMessage("Invalid OTP format"),
];

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // log the error
    console.error(errors.array());
    return next(new CustomError(errors.array()[0].msg, 422));
  }
  next();
};

module.exports = {
  registerUserValidator,
  verifyOTPValidator,
  validate,
};
