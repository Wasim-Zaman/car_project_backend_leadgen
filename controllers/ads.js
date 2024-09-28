const moment = require('moment');

const Advertisement = require('../models/ads');
const Position = require('../models/position');
const Zone = require('../models/zone');
const CustomError = require('../utils/error');
const response = require('../utils/response');
const fileHelper = require('../utils/file');

// Get all advertisements
exports.getAllAdvertisements = async (req, res, next) => {
  try {
    // Fetch advertisements with pagination
    const ads = await Advertisement.getAll();

    res.status(200).json(response(200, true, 'Advertisements retrieved successfully', ads));
  } catch (error) {
    console.error('Error in getAdvertisements:', error.message);
    next(error);
  }
};

// Create an advertisement with image upload and relationships with Position and Zone
exports.createAdvertisement = async (req, res, next) => {
  try {
    const { campaignName, moduleType, publishDate, unpublishDate, positionId, zoneId } = req.body;

    // Validate required fields
    if (!moduleType || !positionId || !zoneId || !publishDate || !unpublishDate) {
      if (req.file) await fileHelper.deleteFile(req.file.path);
      throw new CustomError('All required fields must be provided', 400);
    }

    // Ensure position and zone exist
    const position = await Position.findById(positionId);
    if (!position) {
      if (req.file) await fileHelper.deleteFile(req.file.path);
      throw new CustomError('Position not found', 404);
    }

    const zone = await Zone.findById(zoneId);
    if (!zone) {
      if (req.file) await fileHelper.deleteFile(req.file.path);
      throw new CustomError('Zone not found', 404);
    }

    // Check if another active advertisement exists in the same position and module
    const existingAd = await Advertisement.findActiveAdByPositionAndModule(positionId, moduleType);
    if (existingAd) {
      if (req.file) await fileHelper.deleteFile(req.file.path);
      throw new CustomError(
        `An active advertisement already exists at position ${positionId} in module ${moduleType}.`,
        400
      );
    }

    // Handle the image upload
    const image = req.file ? req.file.path : null;

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
    if (req.file) await fileHelper.deleteFile(req.file.path);
    next(error);
  }
};

// Update an advertisement
exports.updateAdvertisement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { campaignName, moduleType, publishDate, unpublishDate, positionId, zoneId } = req.body;

    // Find the advertisement by ID
    const ad = await Advertisement.findById(id);
    if (!ad) {
      if (req.file) await fileHelper.deleteFile(req.file.path);
      throw new CustomError('Advertisement not found', 404);
    }

    // Ensure the position and zone exist
    const position = await Position.findById(positionId);
    if (!position) {
      if (req.file) await fileHelper.deleteFile(req.file.path);
      throw new CustomError('Position not found', 404);
    }

    const zone = await Zone.findById(zoneId);
    if (!zone) {
      if (req.file) await fileHelper.deleteFile(req.file.path);
      throw new CustomError('Zone not found', 404);
    }

    // Check if another active advertisement exists in the same position and module
    const existingAd = await Advertisement.findActiveAdByPositionAndModule(positionId, moduleType);
    if (existingAd && existingAd.id !== id) {
      if (req.file) await fileHelper.deleteFile(req.file.path);
      throw new CustomError(
        `An active advertisement already exists at position ${positionId} in module ${moduleType}.`,
        400
      );
    }

    // Handle the image upload
    let image = ad.image;
    if (req.file) {
      if (ad.image) {
        await fileHelper.deleteFile(ad.image); // Delete the old image
      }
      image = req.file.path;
    }

    // Update the advertisement
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
    if (req.file) await fileHelper.deleteFile(req.file.path);
    next(error);
  }
};

// Automatically delete expired advertisements based on publish and unpublish dates
exports.deleteExpiredAdvertisements = async () => {
  try {
    const now = moment().toDate(); // Get the current date
    const expiredAds = await Advertisement.findExpiredAdvertisements(now);

    for (const ad of expiredAds) {
      if (ad.image) {
        await fileHelper.deleteFile(ad.image); // Delete the image file
      }
      await Advertisement.deleteById(ad.id); // Delete the advertisement from the database
      console.log(`Deleted expired advertisement: ${ad.id}`);
    }
  } catch (error) {
    console.error('Error deleting expired advertisements:', error.message);
  }
};

// Manually delete an advertisement by ID
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
