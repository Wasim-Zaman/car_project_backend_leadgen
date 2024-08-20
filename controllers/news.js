const News = require("../models/news");
const NewsView = require("../models/newsView");
const CustomError = require("../utils/customError");
const response = require("../utils/response");
const fileHelper = require("../utils/fileUtil");

// Get paginated list of News
exports.getNews = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const query = req.query.query || "";

  try {
    const newsItems = await News.get(page, limit, query);

    if (!newsItems || newsItems.data.length <= 0) {
      throw new CustomError("No news found", 404);
    }

    res
      .status(200)
      .json(response(200, true, "News retrieved successfully", newsItems));
  } catch (error) {
    next(error);
  }
};

// Get a single News item by ID
exports.getNewsById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const newsItem = await News.findById(id);

    if (!newsItem) {
      throw new CustomError("News not found", 404);
    }

    res
      .status(200)
      .json(response(200, true, "News retrieved successfully", newsItem));
  } catch (error) {
    next(error);
  }
};

// Create a new News item
exports.createNews = async (req, res, next) => {
  const { title, description, thumbnail } = req.body;

  try {
    if (!title || !description) {
      throw new CustomError("Title and description are required", 400);
    }

    let media = req.file ? req.file.path : null;

    const newNews = await News.create({
      title: title,
      description: description,
      media: media || null,
      thumbnail: thumbnail || null,
      status: req.body.status ? parseInt(req.body.status, 10) : 1,
    });

    res
      .status(201)
      .json(response(201, true, "News created successfully", newNews));
  } catch (error) {
    next(error);
  }
};

// Update an existing News item
exports.patchNews = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, thumbnail } = req.body;

  try {
    const existingNews = await News.findById(id);
    if (!existingNews) {
      throw new CustomError("News not found", 404);
    }

    const media = req.file ? req.file.path : existingNews.media;
    if (!media && existingNews.media) {
      await fileHelper.deleteFile(existingNews.media);
    }

    const updatedNews = await News.update(id, {
      title: title || existingNews.title,
      description: description || existingNews.description,
      media: media,
      thumbnail: thumbnail || existingNews.thumbnail,
      status: req.body.status
        ? parseInt(req.body.status, 10)
        : existingNews.status,
    });

    res
      .status(200)
      .json(response(200, true, "News updated successfully", updatedNews));
  } catch (error) {
    next(error);
  }
};

// Delete a News item
exports.deleteNews = async (req, res, next) => {
  const id = req.params.id;

  try {
    await News.delete(id);

    res.status(200).json(response(200, true, "News deleted successfully"));
  } catch (error) {
    next(error);
  }
};

// View a News item and track the view
exports.viewNews = async (req, res, next) => {
  const { newsId } = req.params;
  const userId = req.user.id;

  try {
    const newsItem = await News.findById(newsId);

    if (!newsItem) {
      throw new CustomError("News not found", 404);
    }

    // Check if the user has already viewed this news item
    const existingView = await NewsView.findUnique(newsId, userId);

    if (!existingView) {
      // If the user hasn't viewed this news item, add a new view
      await NewsView.create({
        data: {
          newsId,
          userId,
        },
      });
    }

    res
      .status(200)
      .json(response(200, true, "News viewed successfully", newsItem));
  } catch (error) {
    next(error);
  }
};
