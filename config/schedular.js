const cron = require('node-cron');
const Advertisement = require('../models/ads');
const fileHelper = require('../utils/file');

// Store running cron jobs for each advertisement
const jobs = {};

/**
 * Schedule a job to delete an advertisement automatically when the unpublishDate is reached.
 * @param {Object} ad - The advertisement object containing details.
 */
const scheduleAdDeletion = (ad) => {
  const { id, unpublishDate, image } = ad;

  // Convert the unpublishDate to a cron format (adjust as necessary)
  const unpublishTime = new Date(unpublishDate).getTime();

  // If job for this ad exists, stop it before creating a new one
  if (jobs[id]) {
    jobs[id].stop();
    delete jobs[id];
  }

  const timeNow = new Date().getTime();
  const delay = unpublishTime - timeNow;

  if (delay <= 0) {
    // If unpublishDate is in the past, delete immediately
    deleteAd(id, image);
    return;
  }

  // Schedule the deletion for the future
  jobs[id] = cron.schedule(new Date(unpublishDate), async () => {
    await deleteAd(id, image);
  });

  console.log(`Scheduled deletion for ad ${id} at ${unpublishDate}`);
};

/**
 * Stop a scheduled deletion for a given advertisement.
 * @param {string} id - Advertisement ID.
 */
const stopAdDeletion = (id) => {
  if (jobs[id]) {
    jobs[id].stop();
    delete jobs[id];
    console.log(`Stopped scheduled deletion for ad ${id}`);
  }
};

/**
 * Delete the advertisement and its image file.
 * @param {string} id - Advertisement ID.
 * @param {string} image - Image file path.
 */
const deleteAd = async (id, image) => {
  try {
    const ad = await Advertisement.findById(id);
    if (!ad) return;

    // Delete the ad's image if it exists
    if (image) await fileHelper.deleteFile(image);

    // Remove the ad from the database
    await Advertisement.deleteById(id);
    console.log(`Advertisement ${id} deleted automatically`);
  } catch (error) {
    console.error(`Error deleting ad ${id}:`, error.message);
  }
};

module.exports = {
  scheduleAdDeletion,
  stopAdDeletion,
};
