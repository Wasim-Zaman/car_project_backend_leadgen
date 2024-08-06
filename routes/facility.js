const express = require("express");

const { uploadSingle } = require("../config/multerConfig");

const router = express.Router();

const controller = require("../controllers/facility");
const isAdmin = require("../middleware/is-admin-auth");

router.get("/v1/facilities", controller.getFacilities);

router.post("/v1/facility", isAdmin, uploadSingle, controller.postFacility);

router.patch(
  "/v1/facility/:id",
  isAdmin,
  uploadSingle,
  controller.patchFacility
);

router.delete("/v1/facility/:id", isAdmin, controller.deleteFacility);

module.exports = router;
