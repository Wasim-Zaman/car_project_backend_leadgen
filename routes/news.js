const express = require("express");
const { uploadSingle } = require("multermate");

const newsController = require("../controllers/news");
const isAdmin = require("../middleware/is-admin-auth");
const isAuthenticated = require("../middleware/is-auth");

const router = express.Router();

// Get a paginated list of news items
router.get("/v1/news", newsController.getNews);

// Get a single news item by ID
router.get("/v1/news/:id", newsController.getNewsById);

// View a news item and track the view (Authenticated users only)
router.post("/v1/news/:id/view", isAuthenticated, newsController.viewNews);

// Create a new news item (Admin only)
router.post(
  "/v1/news",
  isAdmin,
  uploadSingle({ filename: "media", destination: "images/" }),
  newsController.createNews
);

// Update an existing news item by ID (Admin only)
router.patch(
  "/v1/news/:id",
  isAdmin,
  uploadSingle({ filename: "media", destination: "images/" }),
  newsController.patchNews
);

// Delete a news item by ID (Admin only)
router.delete("/v1/news/:id", isAdmin, newsController.deleteNews);

module.exports = router;
