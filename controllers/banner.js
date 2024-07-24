const Banner = require("../models/Banner");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/fileUtil");

exports.getBanners = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  try {
    const banners = await Banner.get(page, limit);

    if (!banners || banners.data.length <= 0) {
      throw new CustomError("No banners found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Banners retrieved successfully", banners)
      );
  } catch (error) {
    next(error);
  }
};

exports.postBanner = async (req, res, next) => {
  try {
    let image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    image = image.replace(/\\/g, "/");

    const banner = Banner.create({ image: image, status: 1 });

    res
      .status(201)
      .json(generateResponse(201, true, "Banner created successfully", image));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);
    if (!banner) {
      throw new CustomError("Banner not found", 404);
    }

    await fileHelper.deleteFile(banner.image);
    await Banner.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Banner deleted successfully"));
  } catch (error) {
    next(error);
  }
};

exports.patchBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);
    if (!banner) {
      throw new CustomError("Banner not found", 404);
    }

    let image = req.file ? req.file.path : null;

    if (image) {
      image = image.replace(/\\/g, "/");
      await fileHelper.deleteFile(banner.image);
    }

    const updatedBanner = await Banner.updateById(id, {
      image: image || banner.image,
      status: req.body.status || banner.status,
    });

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Banner updated successfully",
          updatedBanner
        )
      );
  } catch (error) {
    next(error);
  }
};
