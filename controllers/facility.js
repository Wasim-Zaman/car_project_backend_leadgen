const Facility = require("../models/facility");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/fileUtil");

exports.getFacilities = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const query = req.query.query || "";

  try {
    const facilities = await Facility.get(page, limit, query);

    if (!facilities || facilities.data.length <= 0) {
      throw new CustomError("No facilities found", 404);
    }

    res
      .status(200)
      .json(generateResponse("Facilities retrieved successfully", facilities));
  } catch (error) {
    next(error);
  }
};

exports.postFacility = async (req, res, next) => {
  try {
    const { name } = req.body;
    let image = req.file ? req.file.path : null;

    if (!name) {
      throw new CustomError("Name is required", 400);
    }

    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    const newFacility = await Facility.create({
      name: name,
      image: image,
      status: req.body.status ? parseInt(req.body.status, 10) : 1,
    });

    res
      .status(201)
      .json(
        generateResponse(
          201,
          true,
          "Facility created successfully",
          newFacility
        )
      );
  } catch (error) {
    next(error);
  }
};

exports.patchFacility = async (req, res, next) => {
  const { id } = req.params;
  const { name, status } = req.body;

  try {
    const facility = await Facility.findById(id);
    if (!facility) {
      throw new CustomError("Facility not found", 404);
    }
    let image = req.file ? req.file.path : null;

    if (image) {
      await fileHelper.deleteFile(car.image);
    }
    const updatedFacility = await Facility.updateById(id, {
      name: name || facility.name,
      image: image || facility.image,
      status: status || facility.status,
    });

    if (!updatedFacility) {
      throw new CustomError("Facility not found", 404);
    }

    res
      .status(200)
      .json(generateResponse("Facility updated successfully", updatedFacility));
  } catch (error) {
    next(error);
  }
};

exports.deleteFacility = async (req, res, next) => {
  const { id } = req.params;

  try {
    const facility = await Facility.findById(id);
    if (!facility) {
      throw new CustomError("Facility not found", 404);
    }

    await fileHelper.deleteFile(facility.image);

    const deletedFacility = await Facility.deleteById(id);

    if (!deletedFacility) {
      throw new CustomError("Facility not found", 404);
    }

    res
      .status(200)
      .json(generateResponse("Facility deleted successfully", deletedFacility));
  } catch (error) {
    next(error);
  }
};
