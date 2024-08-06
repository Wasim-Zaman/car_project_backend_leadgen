const express = require("express");

const { uploadSingle } = require("../config/multerConfig");

const router = express.Router();

const brandController = require("../controllers/brand");
const isAdmin = require("../middleware/is-admin-auth");

router.get("/v1/brands", brandController.getBrands);

router.post("/v1/brand", isAdmin, uploadSingle, brandController.postBrand);

router.patch(
  "/v1/brand/:id",
  isAdmin,
  uploadSingle,
  brandController.patchBrand
);

router.delete("/v1/brand/:id", isAdmin, brandController.deleteBrand);

module.exports = router;
