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
 *                 description: Name of the service
 *               serviceType:
 *                 type: string
 *                 description: Type of the service
 *               serviceDescription:
 *                 type: string
 *                 description: Detailed description of the service
 *               includingServices:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of included services
 *               excludingServices:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of excluded services
 *               termsAndConditions:
 *                 type: string
 *                 description: Terms and conditions for the service
 *               servicePrice:
 *                 type: number
 *                 description: Price of the service
 *               vendorId:
 *                 type: string
 *                 description: Vendor ID associated with the service
 *               serviceImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images for the service
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
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of services to retrieve per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for filtering services
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
 *                       example: 100
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
 *         description: ID of the service to retrieve
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
 *         description: ID of the service to update
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
 *                 type: array
 *                 items:
 *                   type: string
 *               excludingServices:
 *                 type: array
 *                 items:
 *                   type: string
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
 *         description: ID of the service to delete
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
 *         description: Vendor ID to fetch services for
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of services to retrieve per page
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
 *                       example: 100
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashService/v1/services/vendor/count:
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
 *         description: Vendor ID to fetch service count for
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
