const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const { uploadSingle } = require("../config/multerConfig");

// Define routes
router.get("/v1/gallery", galleryController.getGalleries);

router.post("/v1/gallery", uploadSingle, galleryController.postGallery);

router.patch("/v1/gallery:id", uploadSingle, galleryController.patchGallery);

router.delete("/v1/gallery:id", galleryController.deleteGallery);

module.exports = router;
