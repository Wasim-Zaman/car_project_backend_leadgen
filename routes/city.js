const express = require("express");

const cityController = require("../controllers/city");
const isAdmin = require("../middleware/is-admin-auth");

const router = express.Router();

router.get("/v1/cities", isAdmin, cityController.getCities);

router.post("/v1/city", isAdmin, cityController.postCity);

router.delete("/v1/city/:id", isAdmin, cityController.deleteCity);

router.patch("/v1/city/:id", isAdmin, cityController.patchCity);

module.exports = router;
