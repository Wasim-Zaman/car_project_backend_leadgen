const express = require("express");

const faqController = require("../controllers/faq");

const router = express.Router();

router.get("/v1/faqs", faqController.getFAQs);

router.get("/v1/faq/:id", faqController.getFAQById);

router.post("/v1/faq", faqController.createFAQ);

router.delete("/v1/faq/:id", faqController.deleteFAQ);

router.patch("/v1/faq/:id", faqController.updateFAQ);

module.exports = router;
