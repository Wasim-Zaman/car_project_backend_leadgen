/**
 * @swagger
 * /api/zone/v1/zone:
 *   post:
 *     summary: Create a new Zone
 *     tags: [Zone]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - latitude
 *               - longitude
 *               - radius
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the zone
 *                 example: "North Zone"
 *               latitude:
 *                 type: number
 *                 description: The latitude of the zone center
 *                 example: 40.7128
 *               longitude:
 *                 type: number
 *                 description: The longitude of the zone center
 *                 example: -74.0060
 *               radius:
 *                 type: number
 *                 description: The radius of the zone in meters
 *                 example: 500
 *     responses:
 *       201:
 *         description: Zone created successfully
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
 *                   example: Zone created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     name:
 *                       type: string
 *                       example: "North Zone"
 *                     latitude:
 *                       type: number
 *                       example: 40.7128
 *                     longitude:
 *                       type: number
 *                       example: -74.0060
 *                     radius:
 *                       type: number
 *                       example: 500
 */

/**
 * @swagger
 * /api/zone/v1/zone/{id}:
 *   get:
 *     summary: Get a Zone by ID
 *     tags: [Zone]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Zone ID
 *     responses:
 *       200:
 *         description: Zone found successfully
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
 *                   example: Zone found successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     name:
 *                       type: string
 *                       example: "North Zone"
 *                     latitude:
 *                       type: number
 *                       example: 40.7128
 *                     longitude:
 *                       type: number
 *                       example: -74.0060
 *                     radius:
 *                       type: number
 *                       example: 500
 */

/**
 * @swagger
 * /api/zone/v1/zone/{id}:
 *   patch:
 *     summary: Update a Zone by ID
 *     tags: [Zone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Zone ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the zone
 *                 example: "Updated North Zone"
 *               latitude:
 *                 type: number
 *                 description: The latitude of the zone center
 *                 example: 40.7128
 *               longitude:
 *                 type: number
 *                 description: The longitude of the zone center
 *                 example: -74.0060
 *               radius:
 *                 type: number
 *                 description: The radius of the zone in meters
 *                 example: 500
 *     responses:
 *       200:
 *         description: Zone updated successfully
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
 *                   example: Zone updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     name:
 *                       type: string
 *                       example: "Updated North Zone"
 *                     latitude:
 *                       type: number
 *                       example: 40.7128
 *                     longitude:
 *                       type: number
 *                       example: -74.0060
 *                     radius:
 *                       type: number
 *                       example: 500
 */

/**
 * @swagger
 * /api/zone/v1/zone/{id}:
 *   delete:
 *     summary: Delete a Zone by ID
 *     tags: [Zone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Zone ID
 *     responses:
 *       200:
 *         description: Zone deleted successfully
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
 *                   example: Zone deleted successfully
 */

/**
 * @swagger
 * /api/zone/v1/zones:
 *   get:
 *     summary: Get all Zones with pagination
 *     tags: [Zone]
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
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query for zone name
 *     responses:
 *       200:
 *         description: Zones retrieved successfully
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
 *                   example: Zones retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       name:
 *                         type: string
 *                         example: "North Zone"
 *                       latitude:
 *                         type: number
 *                         example: 40.7128
 *                       longitude:
 *                         type: number
 *                         example: -74.0060
 *                       radius:
 *                         type: number
 *                         example: 500
 */

/**
 * @swagger
 * /api/zone/v1/zones/all:
 *   get:
 *     summary: Get all Zones
 *     tags: [Zone]
 *     responses:
 *       200:
 *         description: Zones retrieved successfully
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
 *                   example: Zones retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       name:
 *                         type: string
 *                         example: "North Zone"
 *                       latitude:
 *                         type: number
 *                         example: 40.7128
 *                       longitude:
 *                         type: number
 *                         example: -74.0060
 *                       radius:
 *                         type: number
 *                         example: 500
 *       404:
 *         description: No Zones found
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
 *                   example: No Zones found
 */
