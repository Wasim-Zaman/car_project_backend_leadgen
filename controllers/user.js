const User = require("../models/user");
const OTP = require("../models/otp");
const { sendSMS } = require("../config/twilio");
const crypto = require("crypto");
const generateResponse = require("../utils/response");
const CustomError = require("../utils/customError");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, address, password, referralCode } = req.body;

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Save OTP in database
    await OTP.createOTP({
      otp,
      mobile,
      expiresAt,
    });

    // Send OTP to user's mobile
    await sendSMS(mobile, `Your OTP is: ${otp}`);

    res
      .status(200)
      .json(generateResponse(200, true, "OTP sent to user's mobile"));
  } catch (error) {
    next(error);
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const {
      mobile,
      otp,
      name,
      email,
      address,
      password,
      referralCode,
      lat,
      long,
    } = req.body;

    // Find the OTP in the database
    const otpRecord = await OTP.findByMobile(mobile);

    if (
      !otpRecord ||
      otpRecord.otp !== otp ||
      new Date() > otpRecord.expiresAt
    ) {
      return next(new CustomError("Invalid or expired OTP", 400));
    }

    // OTP is valid, create user
    const user = await User.createUser({
      name,
      email,
      mobile,
      address,
      password,
      referralCode,
      lat,
      long,
    });

    // Delete OTP record
    await OTP.deleteByMobile(mobile);

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};
