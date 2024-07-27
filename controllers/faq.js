const FAQ = require("../models/faq");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");

// Get paginated list of FAQs
exports.getFAQs = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  try {
    const faqs = await FAQ.get(page, limit);

    if (!faqs || faqs.data.length <= 0) {
      throw new CustomError("No FAQs found", 404);
    }

    res
      .status(200)
      .json(generateResponse(200, true, "FAQs retrieved successfully", faqs));
  } catch (error) {
    next(error);
  }
};

// Get a single FAQ by ID
exports.getFAQById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const faq = await FAQ.findById(id);

    if (!faq) {
      throw new CustomError("FAQ not found", 404);
    }

    res
      .status(200)
      .json(generateResponse(200, true, "FAQ retrieved successfully", faq));
  } catch (error) {
    next(error);
  }
};

// Create a new FAQ
exports.createFAQ = async (req, res, next) => {
  const data = req.body;

  try {
    const newFAQ = await FAQ.create(data);

    res
      .status(201)
      .json(generateResponse(201, true, "FAQ created successfully", newFAQ));
  } catch (error) {
    next(error);
  }
};

// Update an existing FAQ
exports.updateFAQ = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const updatedFAQ = await FAQ.update(id, data);

    res
      .status(200)
      .json(
        generateResponse(200, true, "FAQ updated successfully", updatedFAQ)
      );
  } catch (error) {
    next(error);
  }
};

// Delete an FAQ
exports.deleteFAQ = async (req, res, next) => {
  const id = req.params.id;

  try {
    await FAQ.delete(id);

    res
      .status(200)
      .json(generateResponse(200, true, "FAQ deleted successfully"));
  } catch (error) {
    next(error);
  }
};
