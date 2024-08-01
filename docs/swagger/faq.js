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
 *   name: FAQs
 *   description: FAQ management
 */

/**
 * @swagger
 * /api/faq/v1/faqs:
 *   get:
 *     summary: Retrieve a list of FAQs with optional search and pagination
 *     tags: [FAQs]
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
 *         description: The search query to filter FAQs by question or answer.
 *     responses:
 *       200:
 *         description: FAQs retrieved successfully
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
 *                   example: FAQs retrieved successfully
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
 *                     faqs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           question:
 *                             type: string
 *                             example: "What is your return policy?"
 *                           answer:
 *                             type: string
 *                             example: "You can return any item within 30 days of purchase."
 *                           status:
 *                             type: integer
 *                             example: 1
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No FAQs found
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
 *                   example: No FAQs found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/faq/v1/faq/{id}:
 *   get:
 *     summary: Retrieve a single FAQ by ID
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the FAQ to retrieve.
 *     responses:
 *       200:
 *         description: FAQ retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/FAQ'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/faq/v1/faq:
 *   post:
 *     summary: Create a new FAQ
 *     tags: [FAQs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question of the FAQ
 *                 example: "What is the return policy?"
 *               answer:
 *                 type: string
 *                 description: The answer to the FAQ
 *                 example: "You can return items within 30 days of purchase."
 *               status:
 *                 type: integer
 *                 description: The status of the FAQ (1 for active, 0 for inactive)
 *                 example: 1
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/FAQ'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/faq/v1/faq/{id}:
 *   patch:
 *     summary: Update an existing FAQ
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question of the FAQ
 *                 example: "What is the return policy?"
 *               answer:
 *                 type: string
 *                 description: The answer to the FAQ
 *                 example: "You can return items within 30 days of purchase."
 *               status:
 *                 type: integer
 *                 description: The status of the FAQ (1 for active, 0 for inactive)
 *                 example: 1
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/FAQ'
 *       404:
 *         description: FAQ not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "FAQ not found"
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/faq/v1/faq/{id}:
 *   delete:
 *     summary: Delete an FAQ
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the FAQ to delete.
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 */
