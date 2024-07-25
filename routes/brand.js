const express = require("express");

const { uploadSingle } = require("../config/multerConfig");

const router = express.Router();

const brandController = require("../controllers/brand");

router.get("/v1/brands", brandController.getBrands);

router.post("/v1/brand", uploadSingle, brandController.postBrand);

router.patch("/v1/brand/:id", uploadSingle, brandController.patchBrand);

router.delete("/v1/brand/:id", brandController.deleteBrand);

module.exports = router;
