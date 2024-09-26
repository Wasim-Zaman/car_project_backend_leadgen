const Brand = require('../models/brand');
const CustomError = require('../utils/error');
const generateResponse = require('../utils/response');
const fileHelper = require('../utils/fileUtil');

exports.getBrands = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const query = req.query.query || '';

  try {
    const brands = await Brand.get(page, limit, query);

    if (!brands || brands.data.length <= 0) {
      throw new CustomError('No brands found', 404);
    }

    res.status(200).json(generateResponse(200, true, 'Brands retrieved successfully', brands));
  } catch (error) {
    next(error);
  }
};

exports.postBrand = async (req, res, next) => {
  try {
    let image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError('Image is required', 400);
    }

    const brand = await Brand.create({
      title: req.body.title,
      image: image,
      status: req.body.status ? parseInt(req.body.status, 10) : 1,
    });

    res.status(201).json(generateResponse(201, true, 'Brand created successfully', brand));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);
    if (!brand) {
      throw new CustomError('Brand not found', 404);
    }

    await fileHelper.deleteFile(brand.image);

    await Brand.deleteById(id);

    res.status(200).json(generateResponse(200, true, 'Brand deleted successfully'));
  } catch (error) {
    next(error);
  }
};

exports.patchBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);
    if (!brand) {
      throw new CustomError('Brand not found', 404);
    }

    let image = req.file ? req.file.path : null;

    if (image) {
      await fileHelper.deleteFile(brand.image);
    }

    const updatedBrand = await Brand.updateById(id, {
      title: req.body.title || brand.title,
      image: image || brand.image,
      status: req.body.status ? parseInt(req.body.status, 10) : brand.status,
    });

    res.status(200).json(generateResponse(200, true, 'Brand updated successfully', updatedBrand));
  } catch (error) {
    next(error);
  }
};
