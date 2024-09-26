const crypto = require('crypto');
const Joi = require('joi');

const User = require('../models/user');
const OTP = require('../models/otp');
const { sendSMS } = require('../config/twilio');
const response = require('../utils/response');
const CustomError = require('../utils/customError');
const Bcrypt = require('../utils/bcrypt');
const jwtUtil = require('../utils/jwtUtil');
const fileHelper = require('../utils/fileUtil');

// Define Joi validation schema
const userRegistrationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  mobile: Joi.string()
    .pattern(/^\+[1-9]{1}[0-9]{3,14}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Mobile number must be in international format starting with + followed by the country code and digits.',
    }),
  password: Joi.string().min(8).required(),
  referralCode: Joi.string().optional(),
  lat: Joi.number().optional(),
  long: Joi.number().optional(),
  address: Joi.string().optional(),
});

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, lat, long, password, referralCode } = req.body;

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP in database
    await OTP.createOrUpdateOTP({
      otp,
      mobile,
      expiresAt,
    });

    // Send OTP to user's mobile
    await sendSMS(mobile, `Your OTP is: ${otp}`);

    res.status(200).json(response(200, true, "OTP sent to user's mobile"));
  } catch (error) {
    next(error);
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const { mobile, otp, name, email, password, referralCode, lat, long } = req.body;

    // Find the OTP in the database
    const otpRecord = await OTP.findByMobile(mobile);

    if (!otpRecord || otpRecord.otp !== otp || new Date() > otpRecord.expiresAt) {
      return next(new CustomError('Invalid or expired OTP', 400));
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

    res.json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
};

exports.registerUserV2 = async (req, res, next) => {
  try {
    // Validate request body using the Joi schema
    const { error } = userRegistrationSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { name, email, mobile, lat, long, password, referralCode, address } = req.body;
    const hashedPassword = await Bcrypt.createPassword(password);

    const user = await User.createUser({
      name,
      email,
      mobile,
      password: hashedPassword,
      referralCode,
      lat,
      long,
      address,
    });

    res.status(201).json(response(201, true, 'User registered successfully', user));
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
      response(200, true, 'Login successful', {
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
      throw new CustomError('User not found', 404);
    }

    const hashedPassword = await Bcrypt.createPassword(password);
    user.password = hashedPassword;

    const updatedUser = await User.updateUser(user.id, user);

    res.status(200).json(response(200, true, 'Password reset successfully', updatedUser));
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    let image = req.file ? req.file.path : user.image;
    if (req.file && req.file.path !== user.image) {
      await fileHelper.deleteFile(user.image);
    }

    const updatedUser = await User.updateUser(id, {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      mobile: req.body.mobile || user.mobile,
      gender: req.body.gender || user.gender,
      lat: req.body.lat || user.lat,
      long: req.body.long || user.long,
      referralCode: req.body.referral || user.referral,
      image: image,
      age: Number(req.body.age || user.age),
    });

    res.status(200).json(response(200, true, 'User profile updated successfully', updatedUser));
  } catch (error) {
    next(error);
  }
};
