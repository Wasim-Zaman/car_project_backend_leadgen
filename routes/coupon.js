const express = require("express");

const { uploadSingle } = require("../config/multerConfig");
const controller = require("../controllers/coupon");
const isAdmin = require("../middleware/is-admin-auth");

const router = express.Router();

router.get("/v1/coupons", controller.getCoupons);

router.post("/v1/coupon", isAdmin, uploadSingle, controller.postCoupon);

router.patch("/v1/coupon/:id", isAdmin, uploadSingle, controller.patchCoupon);

router.delete("/v1/coupon/:id", isAdmin, controller.deleteCoupon);

module.exports = router;
