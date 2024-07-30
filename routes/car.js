const express = require("express");
const controller = require("../controllers/car");
const { uploadSingle } = require("../config/multerConfig");
const isAdmin = require("../middleware/is-admin-auth");

const router = express.Router();

// Route to get all cars with pagination
router.get("/v1/cars", isAdmin, controller.getCars);

// Route to create a new car
router.post("/v1/car", isAdmin, uploadSingle, controller.postCar);

// Route to delete a car by ID
router.delete("/v1/car/:id", isAdmin, controller.deleteCar);

// Route to update a car by ID
router.patch("/v1/car/:id", isAdmin, uploadSingle, controller.patchCar);

module.exports = router;
