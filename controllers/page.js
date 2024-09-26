const Page = require('../models/page');
const CustomError = require('../utils/error');
const generateResponse = require('../utils/response');

// Get paginated list of pages, with optional search query
exports.getPages = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const query = req.query.query || '';

  try {
    const pages = await Page.get(page, limit, query);

    if (!pages || pages.data.length <= 0) {
      throw new CustomError('No pages found', 404);
    }

    res.status(200).json(generateResponse(200, true, 'Pages retrieved successfully', pages));
  } catch (error) {
    next(error);
  }
};

// Create a new page
exports.postPage = async (req, res, next) => {
  const { title, description, status } = req.body;

  if (!title) {
    throw new CustomError('Page title is required', 400);
  }

  try {
    const page = await Page.create({
      title,
      description,
      status: status ? status : 1,
    });

    res.status(201).json(generateResponse(201, true, 'Page created successfully', page));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete a page by ID
exports.deletePage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const page = await Page.findById(id);
    if (!page) {
      throw new CustomError('Page not found', 404);
    }

    await Page.deleteById(id);

    res.status(200).json(generateResponse(200, true, 'Page deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// Update a page by ID
exports.patchPage = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const page = await Page.findById(id);
    if (!page) {
      throw new CustomError('Page not found', 404);
    }

    const updatedPage = await Page.updateById(id, {
      title: title || page.title,
      description: description || page.description,
      status: status || page.status,
    });

    res.status(200).json(generateResponse(200, true, 'Page updated successfully', updatedPage));
  } catch (error) {
    next(error);
  }
};
