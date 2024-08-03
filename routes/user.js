const express = require("express");
const {
  registerUser,
  verifyOTP,
  registerUserV2,
  login,
} = require("../controllers/user");
const {
  registerUserValidator,
  verifyOTPValidator,
  loginUserValidator,
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
router.post("/v2/register", registerUserValidator, validate, registerUserV2);

router.post("/v1/login", loginUserValidator, login);

module.exports = router;
