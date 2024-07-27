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
  const { question, answer } = req.body;

  try {
    if (!question || !answer) {
      throw new CustomError("Question and answer are required", 400);
    }

    const newFAQ = await FAQ.create({
      question: question,
      answer: answer,
      status: req.body.status ? parseInt(req.body.status, 10) : 1,
    });

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
  const { question, answer } = req.body;

  try {
    const existingFAQ = await FAQ.findById(id);
    if (!existingFAQ) {
      throw new CustomError("FAQ not found", 404);
    }

    const updatedFAQ = await FAQ.update(id, {
      question: question || existingFAQ.question,
      answer: answer || existingFAQ.answer,
      status: req.body.status
        ? parseInt(req.body.status, 10)
        : existingFAQ.status,
    });

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
