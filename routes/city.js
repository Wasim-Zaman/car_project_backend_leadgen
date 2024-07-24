const express = require("express");

const cityController = require("../controllers/city");

const router = express.Router();

// Route for getting cities with pagination
router.get("/cities", cityController.getCities);

// Route for creating a new city
router.post("/cities", cityController.postCity);

// Route for deleting a city by ID
router.delete("/cities/:id", cityController.deleteCity);

// Route for updating a city by ID
router.patch("/cities/:id", cityController.patchCity);

module.exports = router;
