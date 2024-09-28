const Coupon = require('../models/coupon');
const CustomError = require('../utils/error');
const generateResponse = require('../utils/response');
const fileHelper = require('../utils/file');

exports.getCoupons = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const query = req.query.query || '';

  try {
    const coupons = await Coupon.get(page, limit.query);

    if (!coupons || coupons.data.length <= 0) {
      throw new CustomError('No coupons found', 404);
    }

    res.status(200).json(generateResponse(200, true, 'Coupons retrieved successfully', coupons));
  } catch (error) {
    next(error);
  }
};

exports.postCoupon = async (req, res, next) => {
  try {
    const { expiryDate, code, title, subtitle, minOrderAmount, value, description } = req.body;

    let image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError('Image is required', 400);
    }

    const coupon = await Coupon.create({
      image: image,
      expiryDate: new Date(expiryDate),
      code: code,
      title: title,
      subtitle: subtitle || null,
      status: req.body.status ? parseInt(req.body.status, 10) : 1,
      minOrderAmount: minOrderAmount ? parseFloat(minOrderAmount) : null,
      value: parseFloat(value),
      description: description || null,
    });

    res.status(201).json(generateResponse(201, true, 'Coupon created successfully', coupon));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      throw new CustomError('Coupon not found', 404);
    }

    await fileHelper.deleteFile(coupon.image);

    await Coupon.deleteById(id);

    res.status(200).json(generateResponse(200, true, 'Coupon deleted successfully'));
  } catch (error) {
    next(error);
  }
};

exports.patchCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      throw new CustomError('Coupon not found', 404);
    }

    let image = req.file ? req.file.path : null;

    if (image) {
      await fileHelper.deleteFile(coupon.image);
    }

    const updatedCoupon = await Coupon.updateById(id, {
      image: image || coupon.image,
      expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : coupon.expiryDate,
      code: req.body.code || coupon.code,
      title: req.body.title || coupon.title,
      subtitle: req.body.subtitle || coupon.subtitle,
      status: req.body.status ? parseInt(req.body.status, 10) : coupon.status,
      minOrderAmount: req.body.minOrderAmount ? parseFloat(req.body.minOrderAmount) : coupon.minOrderAmount,
      value: req.body.value ? parseFloat(req.body.value) : coupon.value,
      description: req.body.description || coupon.description,
    });

    res.status(200).json(generateResponse(200, true, 'Coupon updated successfully', updatedCoupon));
  } catch (error) {
    next(error);
  }
};
