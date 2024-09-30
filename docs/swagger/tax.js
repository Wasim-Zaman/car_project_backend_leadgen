/**
 * @swagger
 * /api/tax/v1/createTax:
 *   post:
 *     summary: Create a new tax
 *     tags: [Tax]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - tax
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of tax (e.g., VAT, GST)
 *                 example: "VAT"
 *               tax:
 *                 type: number
 *                 description: The tax percentage
 *                 example: 10
 *     responses:
 *       201:
 *         description: Tax created successfully
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
 *                   example: Tax created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     type:
 *                       type: string
 *                       example: "VAT"
 *                     tax:
 *                       type: number
 *                       example: 10
 */

/**
 * @swagger
 * /api/tax/v1/taxes:
 *   get:
 *     summary: Get all taxes
 *     tags: [Tax]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Taxes fetched successfully
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
 *                   example: Taxes fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       type:
 *                         type: string
 *                         example: "VAT"
 *                       tax:
 *                         type: number
 *                         example: 10
 */

/**
 * @swagger
 * /api/tax/v1/taxes/{id}:
 *   get:
 *     summary: Get a tax by ID
 *     tags: [Tax]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The tax ID
 *     responses:
 *       200:
 *         description: Tax fetched successfully
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
 *                   example: Tax fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     type:
 *                       type: string
 *                       example: "VAT"
 *                     tax:
 *                       type: number
 *                       example: 10
 *       404:
 *         description: Tax not found
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
 *                   example: Tax not found
 */

/**
 * @swagger
 * /api/tax/v1/taxes/{id}:
 *   put:
 *     summary: Update a tax by ID
 *     tags: [Tax]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The tax ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The updated tax type
 *                 example: "GST"
 *               tax:
 *                 type: number
 *                 description: The updated tax percentage
 *                 example: 12
 *     responses:
 *       200:
 *         description: Tax updated successfully
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
 *                   example: Tax updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     type:
 *                       type: string
 *                       example: "GST"
 *                     tax:
 *                       type: number
 *                       example: 12
 */

/**
 * @swagger
 * /api/tax/v1/taxes/{id}:
 *   delete:
 *     summary: Delete a tax by ID
 *     tags: [Tax]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The tax ID
 *     responses:
 *       200:
 *         description: Tax deleted successfully
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
 *                   example: Tax deleted successfully
 *       404:
 *         description: Tax not found
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
 *                   example: Tax not found
 */
