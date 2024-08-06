const express = require("express");

const faqController = require("../controllers/faq");
const isAdmin = require("../middleware/is-admin-auth");

const router = express.Router();

router.get("/v1/faqs", faqController.getFAQs);

router.get("/v1/faq/:id", faqController.getFAQById);

router.post("/v1/faq", isAdmin, faqController.createFAQ);

router.delete("/v1/faq/:id", isAdmin, faqController.deleteFAQ);

router.patch("/v1/faq/:id", isAdmin, faqController.patchFAQ);

module.exports = router;
