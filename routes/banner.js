const express = require("express");

const { uploadSingle } = require("../config/multerConfig");
const { postBanner } = require("../controllers/banner");

const router = express.Router();

router.post("/v1/postBanner", uploadSingle, postBanner);

module.exports = router;
