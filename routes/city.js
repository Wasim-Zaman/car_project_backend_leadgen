const express = require("express");

const cityController = require("../controllers/city");

const router = express.Router();

router.get("/v1/cities", cityController.getCities);

router.post("/v1/city", cityController.postCity);

router.delete("/v1/city/:id", cityController.deleteCity);

router.patch("/v1/city/:id", cityController.patchCity);

module.exports = router;
