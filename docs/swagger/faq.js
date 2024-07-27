/**
 * @swagger
 * /api/faq/v1/faqs:
 *   get:
 *     summary: Retrieve a list of FAQs
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
 *     responses:
 *       200:
 *         description: FAQs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FAQ'
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
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the FAQ to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQ'
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
 */
