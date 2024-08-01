const Gallery = require("../models/gallery");
const Car = require("../models/car");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/fileUtil");

exports.getGalleries = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const query = req.query.query || "";

  try {
    const galleries = await Gallery.get(page, limit, query);

    if (!galleries || galleries.data.length <= 0) {
      throw new CustomError("No galleries found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Galleries retrieved successfully",
          galleries
        )
      );
  } catch (error) {
    next(error);
  }
};

exports.postGallery = async (req, res, next) => {
  try {
    const { carId } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      throw new CustomError("Car not found", 404);
    }

    let image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    const gallery = await Gallery.create({
      image: image,
      carId: Number(carId),
    });

    res
      .status(201)
      .json(
        generateResponse(201, true, "Gallery created successfully", gallery)
      );
  } catch (error) {
    next(error);
  }
};

exports.deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      throw new CustomError("Gallery not found", 404);
    }

    // If there's an image associated, delete it
    if (gallery.image) {
      await fileHelper.deleteFile(gallery.image);
    }

    await Gallery.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Gallery deleted successfully"));
  } catch (error) {
    next(error);
  }
};

exports.patchGallery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      throw new CustomError("Gallery not found", 404);
    }

    let image = req.file ? req.file.path : null;

    if (image && gallery.image) {
      await fileHelper.deleteFile(gallery.image);
    }

    const updatedGallery = await Gallery.updateById(id, {
      image: image || gallery.image,
      carId:
        req.body.carId !== undefined ? Number(req.body.carId) : gallery.carId,
    });

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Gallery updated successfully",
          updatedGallery
        )
      );
  } catch (error) {
    next(error);
  }
};
