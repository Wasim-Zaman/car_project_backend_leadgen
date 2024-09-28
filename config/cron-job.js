const cron = require('node-cron');
const { deleteExpiredAdvertisements } = require('../controllers/ads');

// Schedule the job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running the job to delete expired advertisements...');
  await deleteExpiredAdvertisements();
});
