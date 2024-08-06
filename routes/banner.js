const express = require("express");

const { uploadSingle } = require("../config/multerConfig");
const {
  postBanner,
  getBanners,
  deleteBanner,
  patchBanner,
} = require("../controllers/banner");
const isAdmin = require("../middleware/is-admin-auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/v1/banners", isAdmin, getBanners);

router.get("/v1/user/banners", isAdmin, getBanners);

router.post("/v1/banner", isAdmin, uploadSingle, postBanner);

router.delete("/v1/banner/:id", isAdmin, deleteBanner);

router.patch("/v1/banner/:id", isAdmin, uploadSingle, patchBanner);

module.exports = router;
