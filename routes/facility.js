const express = require("express");

const { uploadSingle } = require("../config/multerConfig");

const router = express.Router();

const controller = require("../controllers/facility");

router.get("/v1/facilities", controller.getFacilities);

router.post("/v1/facility", uploadSingle, controller.postFacility);

router.patch("/v1/facility/:id", uploadSingle, controller.patchFacility);

router.delete("/v1/facility/:id", controller.deleteFacility);

module.exports = router;
