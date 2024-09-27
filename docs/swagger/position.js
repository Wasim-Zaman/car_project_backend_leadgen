/**
 * @swagger
 * /api/position/v1/positions:
 *   post:
 *     summary: Create a new Position
 *     tags: [Position]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - index
 *               - amount
 *               - tax
 *             properties:
 *               index:
 *                 type: integer
 *                 description: The index number of the position
 *                 example: 1
 *               amount:
 *                 type: number
 *                 description: The amount for the position
 *                 example: 150.50
 *               tax:
 *                 type: number
 *                 description: The tax associated with the amount
 *                 example: 15.5
 *     responses:
 *       201:
 *         description: Position created successfully
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
 *                   example: Position created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     index:
 *                       type: integer
 *                       example: 1
 *                     amount:
 *                       type: number
 *                       example: 150.50
 *                     tax:
 *                       type: number
 *                       example: 15.5
 */

/**
 * @swagger
 * /api/position/v1/positions/{id}:
 *   get:
 *     summary: Get a Position by ID
 *     tags: [Position]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Position ID
 *     responses:
 *       200:
 *         description: Position found successfully
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
 *                   example: Position found successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     index:
 *                       type: integer
 *                       example: 1
 *                     amount:
 *                       type: number
 *                       example: 150.50
 *                     tax:
 *                       type: number
 *                       example: 15.5
 */

/**
 * @swagger
 * /api/position/v1/positions:
 *   get:
 *     summary: Get all Positions with pagination
 *     tags: [Position]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Positions retrieved successfully
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
 *                   example: Positions retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       index:
 *                         type: integer
 *                         example: 1
 *                       amount:
 *                         type: number
 *                         example: 150.50
 *                       tax:
 *                         type: number
 *                         example: 15.5
 */

/**
 * @swagger
 * /api/position/v1/positions/all:
 *   get:
 *     summary: Get all Positions without pagination
 *     tags: [Position]
 *     responses:
 *       200:
 *         description: All Positions retrieved successfully
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
 *                   example: All Positions retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       index:
 *                         type: integer
 *                         example: 1
 *                       amount:
 *                         type: number
 *                         example: 150.50
 *                       tax:
 *                         type: number
 *                         example: 15.5
 */

/**
 * @swagger
 * /api/position/v1/positions/{id}:
 *   put:
 *     summary: Update a Position by ID
 *     tags: [Position]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Position ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               index:
 *                 type: integer
 *                 description: The index of the position
 *                 example: 2
 *               amount:
 *                 type: number
 *                 description: The amount of the position
 *                 example: 200.75
 *               tax:
 *                 type: number
 *                 description: The tax of the position
 *                 example: 20.0
 *     responses:
 *       200:
 *         description: Position updated successfully
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
 *                   example: Position updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     index:
 *                       type: integer
 *                       example: 2
 *                     amount:
 *                       type: number
 *                       example: 200.75
 *                     tax:
 *                       type: number
 *                       example: 20.0
 */

/**
 * @swagger
 * /api/position/v1/positions/{id}:
 *   delete:
 *     summary: Delete a Position by ID
 *     tags: [Position]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Position ID
 *     responses:
 *       200:
 *         description: Position deleted successfully
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
 *                   example: Position deleted successfully
 */
