const CarType = require("../models/car_type");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/fileUtil");

exports.getCarTypes = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const query = req.query.query || "";

  try {
    const cars = await CarType.get(page, limit, query);

    if (!cars || cars.data.length <= 0) {
      throw new CustomError("No car types found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Car Types retrieved successfully", cars)
      );
  } catch (error) {
    next(error);
  }
};

exports.postCarType = async (req, res, next) => {
  try {
    const { title } = req.body;

    let image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    const carType = await CarType.create({
      title: title,
      image: image,
      status: req.body.status ? parseInt(req.body.status, 10) : 1,
    });

    res
      .status(201)
      .json(
        generateResponse(201, true, "Car Type created successfully", carType)
      );
  } catch (error) {
    next(error);
  }
};

exports.deleteCarType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const carType = await CarType.findById(id);
    if (!carType) {
      throw new CustomError("Car Type not found", 404);
    }

    await fileHelper.deleteFile(carType.image);
    await CarType.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Car Type deleted successfully"));
  } catch (error) {
    next(error);
  }
};

exports.patchCarType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const carType = await CarType.findById(id);
    if (!carType) {
      throw new CustomError("Car Type not found", 404);
    }

    let image = req.file ? req.file.path : null;

    if (image) {
      await fileHelper.deleteFile(carType.image);
    }

    const updatedCar = await CarType.updateById(id, {
      title: req.body.title || carType.title,
      image: image || carType.image,
      status: req.body.status ? parseInt(req.body.status, 10) : carType.status,
    });

    res
      .status(200)
      .json(
        generateResponse(200, true, "Car Type updated successfully", updatedCar)
      );
  } catch (error) {
    next(error);
  }
};
