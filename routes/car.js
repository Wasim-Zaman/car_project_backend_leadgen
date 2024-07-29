const express = require("express");

const carController = require("../controllers/car");
const { uploadSingle } = require("../config/multerConfig");
const isAdmin = require("../middleware/is-admin-auth");

const router = express.Router();

router.get("/v1/cars", isAdmin, carController.getCars);

router.post("/v1/car", isAdmin, uploadSingle, carController.postCar);

router.delete("/v1/car/:id", isAdmin, carController.deleteCar);

router.patch("/v1/car/:id", isAdmin, uploadSingle, carController.patchCar);

module.exports = router;
