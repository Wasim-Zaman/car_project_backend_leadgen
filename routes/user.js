const express = require("express");
const {
  registerUser,
  verifyOTP,
  registerUserV2: registerUserv2,
} = require("../controllers/user");
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
router.post("/v2/register", registerUserValidator, validate, registerUserv2);

module.exports = router;
