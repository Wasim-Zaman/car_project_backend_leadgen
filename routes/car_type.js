const express = require("express");

const carController = require("../controllers/car_type");
const { uploadSingle } = require("../config/multerConfig");
const isAdmin = require("../middleware/is-admin-auth");

const router = express.Router();

router.get("/v1/carTypes", isAdmin, carController.getCarTypes);

router.post("/v1/carType", isAdmin, uploadSingle, carController.postCarType);

router.delete("/v1/carType/:id", isAdmin, carController.deleteCarType);

router.patch(
  "/v1/carType/:id",
  isAdmin,
  uploadSingle,
  carController.patchCarType
);

module.exports = router;
