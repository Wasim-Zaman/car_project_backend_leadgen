const express = require("express");
const controller = require("../controllers/gallery");
const { uploadSingle } = require("../config/multerConfig");
const isAdmin = require("../middleware/is-admin-auth");

const router = express.Router();

// Define routes
router.get("/v1/gallery", isAdmin, controller.getGalleries);

router.post("/v1/gallery", isAdmin, uploadSingle, controller.postGallery);

router.patch("/v1/gallery:id", isAdmin, uploadSingle, controller.patchGallery);

router.delete("/v1/gallery:id", isAdmin, controller.deleteGallery);

module.exports = router;
