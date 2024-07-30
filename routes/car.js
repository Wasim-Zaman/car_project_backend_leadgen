const express = require("express");
const controller = require("../controllers/car");
const { uploadSingle } = require("../config/multerConfig");
const isAdmin = require("../middleware/is-admin-auth");
const { carValidationRules, validate } = require("../validators/car");

const router = express.Router();

// Route to get all cars with pagination
router.get("/v1/cars", isAdmin, controller.getCars);

// Route to create a new car
router.post(
  "/v1/car",
  isAdmin,
  carValidationRules.postCar,
  validate,
  uploadSingle,
  controller.postCar
);

// Route to delete a car by ID
router.delete("/v1/car/:id", isAdmin, controller.deleteCar);

// Route to update a car by ID
router.patch(
  "/v1/car/:id",
  isAdmin,
  carValidationRules.patchCar,
  validate,
  uploadSingle,
  controller.patchCar
);

module.exports = router;
