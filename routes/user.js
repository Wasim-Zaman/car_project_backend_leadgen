const express = require('express');
const controller = require('../controllers/user');

const { registerUserValidator, verifyOTPValidator, loginUserValidator, validate } = require('../validators/user');

const router = express.Router();

router.post('/v1/register', registerUserValidator, validate, controller.registerUser);

router.post('/v1/verify-otp', registerUserValidator, verifyOTPValidator, validate, controller.verifyOTP);

router.post('/v2/register', controller.registerUserV2);

router.post('/v1/login', loginUserValidator, controller.login);

router.put('/v1/reset-password', controller.resetPassword);

router.put('/v1/profile/:id', controller.updateProfile);

module.exports = router;
