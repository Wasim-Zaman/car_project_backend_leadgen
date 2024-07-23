// const Banner = require("../models/Banner");
const CustomError = require("../exceptions/customError");
const generateResponse = require("../utils/response");

exports.postBanner = async (req, res, next) => {
  try {
    let image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    image = image.replace(/\\/g, "/");

    // const banner = Banner.create({ image: image, status: 1 });

    res
      .status(201)
      .json(generateResponse(201, true, "Banner created successfully", image));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// exports.getBannerById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const banner = await Banner.findById(parseInt(id, 10));
//     if (!banner) {
//       throw new CustomError("Banner not found", 404);
//     }

//     res.status(200).json({
//       success: true,
//       data: banner,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.updateBannerById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { image, status } = req.body;

//     const banner = await Banner.updateById(parseInt(id, 10), { image, status });
//     res.status(200).json({
//       success: true,
//       message: "Banner updated successfully",
//       data: banner,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.deleteBannerById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     await Banner.deleteById(parseInt(id, 10));
//     res.status(200).json({
//       success: true,
//       message: "Banner deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getAllBanners = async (req, res, next) => {
//   try {
//     const banners = await Banner.findAll();
//     res.status(200).json({
//       success: true,
//       data: banners,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
