const Car = require("../models/car");
const Brand = require("../models/brand");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/fileUtil");

exports.getCars = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  try {
    const cars = await Car.get(page, limit);

    if (!cars || cars.data.length <= 0) {
      throw new CustomError("No cars found", 404);
    }

    res
      .status(200)
      .json(generateResponse(200, true, "Cars retrieved successfully", cars));
  } catch (error) {
    next(error);
  }
};

exports.postCar = async (req, res, next) => {
  try {
    const { title, brandId } = req.body;

    const brand = await Brand.findById(brandId);
    if (!brand) {
      throw new CustomError("Brand not found", 404);
    }

    let image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    const car = await Car.create({
      title: title,
      image: image,
      status: req.body.status ? parseInt(req.body.status, 10) : 1,
      brandId: Number(brandId),
    });

    res
      .status(201)
      .json(generateResponse(201, true, "Car created successfully", car));
  } catch (error) {
    next(error);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);
    if (!car) {
      throw new CustomError("Car not found", 404);
    }

    await fileHelper.deleteFile(car.image);
    await Car.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Car deleted successfully"));
  } catch (error) {
    next(error);
  }
};

exports.patchCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);
    if (!car) {
      throw new CustomError("Car not found", 404);
    }

    let image = req.file ? req.file.path : null;

    if (image) {
      await fileHelper.deleteFile(car.image);
    }

    const updatedCar = await Car.updateById(id, {
      title: req.body.title || car.title,
      image: image || car.image,
      status: req.body.status ? parseInt(req.body.status, 10) : car.status,
      brandId: req.body.brandId || car.brandId,
    });

    res
      .status(200)
      .json(
        generateResponse(200, true, "Car updated successfully", updatedCar)
      );
  } catch (error) {
    next(error);
  }
};
