const Advertisement = require('../models/ads');
const CustomError = require('../utils/error');
const response = require('../utils/response');
const fileHelper = require('../utils/file');
const moment = require('moment'); // For handling date comparison

// Create an advertisement with image upload
exports.createAdvertisement = async (req, res, next) => {
  try {
    const { campaignName, moduleType, publishDate, unpublishDate, positionId, zoneId } = req.body;

    // Validate required fields
    if (!moduleType || !positionId || !zoneId || !publishDate || !unpublishDate) {
      // If validation fails, delete uploaded image (if exists)
      if (req.file) {
        await fileHelper.deleteFile(req.file.path);
      }
      throw new CustomError('All required fields must be provided', 400);
    }

    // Check if another advertisement exists in the same position and module and hasn't expired
    const existingAd = await Advertisement.findActiveAdByPositionAndModule(positionId, moduleType);
    if (existingAd) {
      // If there's an existing ad, delete uploaded image (if exists)
      if (req.file) {
        await fileHelper.deleteFile(req.file.path);
      }
      throw new CustomError(
        `An active advertisement already exists at position ${existingAd.positionId} in module ${existingAd.moduleType}.`,
        400
      );
    }

    // Handle the image upload
    const image = req.file ? req.file.path : null; // Store the uploaded image path

    // Create the advertisement
    const newAd = await Advertisement.create({
      campaignName,
      moduleType,
      image,
      publishDate: new Date(publishDate),
      unpublishDate: new Date(unpublishDate),
      positionId,
      zoneId,
    });

    res.status(201).json(response(201, true, 'Advertisement created successfully', newAd));
  } catch (error) {
    console.error('Error in createAdvertisement:', error.message);
    // If an error occurs, ensure the uploaded image is deleted
    if (req.file) {
      await fileHelper.deleteFile(req.file.path);
    }
    next(error);
  }
};

// Get a single advertisement by ID
exports.getAdvertisementById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ad = await Advertisement.findById(id);

    if (!ad) {
      throw new CustomError('Advertisement not found', 404);
    }

    res.status(200).json(response(200, true, 'Advertisement retrieved successfully', ad));
  } catch (error) {
    console.error('Error in getAdvertisementById:', error.message);
    next(error);
  }
};

// Get all advertisements with pagination
exports.getAdvertisements = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const ads = await Advertisement.getAll(Number(page), Number(limit));

    res
      .status(200)
      .json(response(200, true, 'Advertisements retrieved successfully', ads.data, { pagination: ads.pagination }));
  } catch (error) {
    console.error('Error in getAdvertisements:', error.message);
    next(error);
  }
};

// Update an advertisement with image upload
exports.updateAdvertisement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { campaignName, moduleType, publishDate, unpublishDate, positionId, zoneId } = req.body;

    // Find the advertisement by ID
    const ad = await Advertisement.findById(id);
    if (!ad) {
      if (req.file) {
        // If advertisement is not found, delete uploaded image (if exists)
        await fileHelper.deleteFile(req.file.path);
      }
      throw new CustomError('Advertisement not found', 404);
    }

    // Check if another advertisement exists in the same position and module (except the current ad)
    const existingAd = await Advertisement.findActiveAdByPositionAndModule(positionId, moduleType);
    if (existingAd && existingAd.id !== id) {
      // If an existing ad is found, delete the newly uploaded image (if exists)
      if (req.file) {
        await fileHelper.deleteFile(req.file.path);
      }
      throw new CustomError(
        `An active advertisement already exists at position ${existingAd.positionId} in module ${existingAd.moduleType}.`,
        400
      );
    }

    // Handle the image upload: if a new image is uploaded, delete the old one
    let image = ad.image;
    if (req.file) {
      if (ad.image) {
        // Delete the previous image file if it exists
        await fileHelper.deleteFile(ad.image);
      }
      image = req.file.path; // Store the new image path
    }

    // Update advertisement details
    const updatedAd = await Advertisement.updateById(id, {
      campaignName,
      moduleType,
      image,
      publishDate: new Date(publishDate),
      unpublishDate: new Date(unpublishDate),
      positionId,
      zoneId,
    });

    res.status(200).json(response(200, true, 'Advertisement updated successfully', updatedAd));
  } catch (error) {
    console.error('Error in updateAdvertisement:', error.message);
    // If an error occurs and an image was uploaded, delete the image
    if (req.file) {
      await fileHelper.deleteFile(req.file.path);
    }
    next(error);
  }
};

// Delete an advertisement by ID
exports.deleteAdvertisement = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the advertisement by ID
    const ad = await Advertisement.findById(id);
    if (!ad) {
      throw new CustomError('Advertisement not found', 404);
    }

    // Delete the image file if it exists
    if (ad.image) {
      await fileHelper.deleteFile(ad.image);
    }

    await Advertisement.deleteById(id);
    res.status(200).json(response(200, true, 'Advertisement deleted successfully'));
  } catch (error) {
    console.error('Error in deleteAdvertisement:', error.message);
    next(error);
  }
};

// Function to automatically delete expired advertisements
exports.deleteExpiredAdvertisements = async () => {
  try {
    const now = moment().toDate(); // Get the current date and time
    const expiredAds = await Advertisement.findExpiredAdvertisements(now);

    for (const ad of expiredAds) {
      // Delete the image if it exists
      if (ad.image) {
        await fileHelper.deleteFile(ad.image);
      }
      // Delete the advertisement from the database
      await Advertisement.deleteById(ad.id);
      console.log(`Deleted expired advertisement: ${ad.id}`);
    }
  } catch (error) {
    console.error('Error deleting expired advertisements:', error.message);
  }
};
