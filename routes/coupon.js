const express = require("express");

const { uploadSingle } = require("../config/multerConfig");

const router = express.Router();

const couponController = require("../controllers/coupon");

router.get("/v1/coupons", couponController.getCoupons);

router.post("/v1/coupon", uploadSingle, couponController.postCoupon);

router.patch("/v1/coupon/:id", uploadSingle, couponController.patchCoupon);

router.delete("/v1/coupon/:id", couponController.deleteCoupon);

module.exports = router;
