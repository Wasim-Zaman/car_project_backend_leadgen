const express = require('express');
const { uploadSingle, uploadMultiple } = require('multermate');

const controller = require('../controllers/vendor');
const isVendor = require('../middleware/isVendor');
const isAdmin = require('../middleware/is-admin-auth');

const router = express.Router();

router.post(
  '/v1/vendors/register',
  uploadMultiple({
    fields: [
      { name: 'storeLogo', maxCount: 1 },
      { name: 'storeCover', maxCount: 1 },
    ],
  }),
  controller.registerVendor
);

router.post('/v1/vendors/login', controller.loginVendor);

router.put(
  '/v1/vendors/:id',
  isVendor,
  uploadMultiple({
    fields: [
      { name: 'logo', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ],
  }),
  controller.updateVendor
);

router.patch('/v1/status/:id', isAdmin, controller.updateStatus);

router.get('/v1/vendors', isAdmin, controller.getVendors);

router.get('/v1/vendors/:id', controller.getVendorById);

router.delete('/v1/vendors/:id', isAdmin, controller.deleteVendor);

module.exports = router;
