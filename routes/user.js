const express = require("express");
const { registerUser, verifyOTP } = require("../controllers/user");
const {
  registerUserValidator,
  verifyOTPValidator,
  validate,
} = require("../validators/user");

const router = express.Router();

router.post("/v1/register", registerUserValidator, validate, registerUser);
router.post(
  "/v1/verify-otp",
  registerUserValidator,
  verifyOTPValidator,
  validate,
  verifyOTP
);

module.exports = router;
