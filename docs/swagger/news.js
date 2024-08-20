/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management
 */

/**
 * @swagger
 * /api/news/v1/news:
 *   get:
 *     summary: Retrieve news items with optional search and pagination
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to retrieve per page.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search query to filter news by title or description.
 *     responses:
 *       200:
 *         description: News retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: News retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalItems:
 *                       type: integer
 *                       example: 50
 *                     itemsPerPage:
 *                       type: integer
 *                       example: 10
 *                     news:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "cld9i7m2p0001lm35wajkg9rj"
 *                           title:
 *                             type: string
 *                             example: "Breaking News"
 *                           description:
 *                             type: string
 *                             example: "This is a detailed description of the news item."
 *                           media:
 *                             type: string
 *                             example: "https://example.com/media.jpg"
 *                           status:
 *                             type: integer
 *                             example: 1
 *                           thumbnail:
 *                             type: string
 *                             example: "https://example.com/thumbnail.jpg"
 *                           views:
 *                             type: integer
 *                             example: 100
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-08-20T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-08-21T12:00:00Z"
 *       404:
 *         description: No news found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No news found
 */

/**
 * @swagger
 * /api/news/v1/news:
 *   post:
 *     summary: Create a new news item
 *     tags: [News]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the news item
 *               description:
 *                 type: string
 *                 description: The description of the news item
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: The media file associated with the news item
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: The thumbnail image for the news item
 *               status:
 *                 type: integer
 *                 description: The status of the news item
 *               views:
 *                 type: integer
 *                 description: The initial view count of the news item (default 0)
 *     responses:
 *       201:
 *         description: News item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: News item created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cld9i7m2p0001lm35wajkg9rj"
 *                     title:
 *                       type: string
 *                       example: "Breaking News"
 *                     description:
 *                       type: string
 *                       example: "This is a detailed description of the news item."
 *                     media:
 *                       type: string
 *                       example: "https://example.com/media.jpg"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     thumbnail:
 *                       type: string
 *                       example: "https://example.com/thumbnail.jpg"
 *                     views:
 *                       type: integer
 *                       example: 100
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-08-20T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-08-21T12:00:00Z"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Title and Description are required
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/news/v1/news/{id}:
 *   patch:
 *     summary: Update a news item
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news item to update
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the news item
 *               description:
 *                 type: string
 *                 description: The description of the news item
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: The media file associated with the news item (optional)
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: The thumbnail image for the news item (optional)
 *               status:
 *                 type: integer
 *                 description: The status of the news item
 *               views:
 *                 type: integer
 *                 description: The view count of the news item (optional)
 *     responses:
 *       200:
 *         description: News item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: News item updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cld9i7m2p0001lm35wajkg9rj"
 *                     title:
 *                       type: string
 *                       example: "Updated News Title"
 *                     description:
 *                       type: string
 *                       example: "Updated news description."
 *                     media:
 *                       type: string
 *                       example: "https://example.com/newmedia.jpg"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     thumbnail:
 *                       type: string
 *                       example: "https://example.com/newthumbnail.jpg"
 *                     views:
 *                       type: integer
 *                       example: 150
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-08-20T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-08-22T12:00:00Z"
 *       404:
 *         description: News item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: News item not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/news/v1/news/{id}:
 *   delete:
 *     summary: Delete a news item
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news item to delete
 *     responses:
 *       200:
 *         description: News item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: News item deleted successfully
 *       404:
 *         description: News item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: News item not found
 *     security:
 *       - bearerAuth: []
 */
