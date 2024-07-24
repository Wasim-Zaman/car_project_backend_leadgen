const express = require("express");

const carController = require("../controllers/car");
const { uploadSingle } = require("../config/multerConfig");

const router = express.Router();

router.get("/v1/cars", carController.getCars);

router.post("/v1/car", uploadSingle, carController.postCar);

router.delete("/v1/car/:id", carController.deleteCar);

router.patch("/v1/car/:id", uploadSingle, carController.patchCar);

module.exports = router;
