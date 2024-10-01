/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: |
 *         Enter your **Bearer token** to authorize. Example: `Bearer your_token_here`
 */

/**
 * @swagger
 * /api/carWashService/v1/services:
 *   post:
 *     summary: Create a new service
 *     tags: [Car Wash Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               serviceName:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               serviceDescription:
 *                 type: string
 *               includingServices:
 *                 type: string
 *               excludingServices:
 *                 type: string
 *               termsAndConditions:
 *                 type: string
 *               servicePrice:
 *                 type: number
 *               vendorId:
 *                 type: string
 *               serviceImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Service created successfully
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
 *                   example: Service created successfully
 *                 data:
 *                   type: object
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashService/v1/services:
 *   get:
 *     summary: Get all services with optional search and pagination
 *     tags: [Car Wash Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Services fetched successfully
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
 *                   example: Services fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                     totalServices:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashService/v1/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Car Wash Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service fetched successfully
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
 *                   example: Service fetched successfully
 *                 data:
 *                   type: object
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashService/v1/services/{id}:
 *   put:
 *     summary: Update a service
 *     tags: [Car Wash Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               serviceName:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               serviceDescription:
 *                 type: string
 *               includingServices:
 *                 type: string
 *               excludingServices:
 *                 type: string
 *               termsAndConditions:
 *                 type: string
 *               servicePrice:
 *                 type: number
 *               serviceImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Service updated successfully
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
 *                   example: Service updated successfully
 *                 data:
 *                   type: object
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashService/v1/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Car Wash Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted successfully
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
 *                   example: Service deleted successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashService/v1/services/vendor/{vendorId}:
 *   get:
 *     summary: Get paginated services for a specific vendor
 *     tags: [Car Wash Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Services fetched successfully
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
 *                   example: Services fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                     totalServices:
 *                       type: integer
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashService/v1/services/vendor/{vendorId}/count:
 *   get:
 *     summary: Get services count for a specific vendor
 *     tags: [Car Wash Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service count fetched successfully
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
 *                   example: Service count fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     serviceCount:
 *                       type: integer
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */
