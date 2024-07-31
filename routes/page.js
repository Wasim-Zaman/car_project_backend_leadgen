const express = require("express");

const pageController = require("../controllers/page");
const isAdmin = require("../middleware/is-admin-auth");

const router = express.Router();

router.get("/v1/pages", isAdmin, pageController.getPages);

router.post("/v1/page", isAdmin, pageController.postPage);

router.delete("/v1/page/:id", isAdmin, pageController.deletePage);

router.patch("/v1/page/:id", isAdmin, pageController.patchPage);

module.exports = router;
