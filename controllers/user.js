const crypto = require("crypto");

const User = require("../models/user");
const OTP = require("../models/otp");
const { sendSMS } = require("../config/twilio");
const generateResponse = require("../utils/response");
const CustomError = require("../utils/customError");
const Bcrypt = require("../utils/bcrypt");
const jwtUtil = require("../utils/jwtUtil");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, lat, long, password, referralCode } = req.body;

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Save OTP in database
    await OTP.createOrUpdateOTP({
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
    const { mobile, otp, name, email, password, referralCode, lat, long } =
      req.body;

    // Find the OTP in the database
    const otpRecord = await OTP.findByMobile(mobile);

    if (
      !otpRecord ||
      otpRecord.otp !== otp ||
      new Date() > otpRecord.expiresAt
    ) {
      return next(new CustomError("Invalid or expired OTP", 400));
    }

    const hashedPassword = await Bcrypt.createPassword(password);

    // OTP is valid, create user
    const user = await User.createUser({
      name,
      email,
      mobile,
      password: hashedPassword,
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

exports.registerUserV2 = async (req, res, next) => {
  try {
    const { name, email, mobile, lat, long, password, referralCode } = req.body;
    const hashedPassword = await Bcrypt.createPassword(password);

    const user = await User.createUser({
      name,
      email,
      mobile,
      password: hashedPassword,
      referralCode,
      lat,
      long,
    });

    res
      .status(201)
      .json(generateResponse(201, true, "User registered successfully", user));
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.login(mobile, password);
    const token = jwtUtil.createToken(user);

    res.status(200).json(
      generateResponse(200, true, "Login successful", {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        },
        token,
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;

    // Find the user by mobile
    const user = await User.findByMobile(mobile);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const hashedPassword = await Bcrypt.createPassword(password);
    user.password = hashedPassword;

    const updatedUser = await User.updateUser(user.id, user);

    res
      .status(200)
      .json(
        generateResponse(200, true, "Password reset successfully", updatedUser)
      );
  } catch (error) {
    next(error);
  }
};
