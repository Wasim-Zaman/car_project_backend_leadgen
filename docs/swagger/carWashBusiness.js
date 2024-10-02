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
 * /api/carWashBusiness/v1/businesses:
 *   post:
 *     summary: Create a new car wash business
 *     tags: [Car Wash Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the car wash business
 *               servicePrice:
 *                 type: number
 *                 description: Price of the service
 *               availableCarCity:
 *                 type: string
 *                 description: City where the car wash is available
 *               currentLocation:
 *                 type: string
 *                 description: Current location of the car wash business
 *               garageLat:
 *                 type: number
 *                 description: Latitude of the garage
 *               garageLong:
 *                 type: number
 *                 description: Longitude of the garage
 *               garageServiceType:
 *                 type: string
 *                 description: Type of services offered
 *               aboutUs:
 *                 type: string
 *                 description: Information about the business
 *               garageAddress:
 *                 type: string
 *                 description: Address of the garage
 *               garageOpeningTime:
 *                 type: string
 *                 format: date-time
 *                 description: Opening time of the garage
 *               garageClosingTime:
 *                 type: string
 *                 format: date-time
 *                 description: Closing time of the garage
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of image files
 *     responses:
 *       201:
 *         description: Car wash business created successfully
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
 *                   example: Car wash business created successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashBusiness/v1/businesses:
 *   get:
 *     summary: Get all car wash businesses with optional search and pagination
 *     tags: [Car Wash Business]
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
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering businesses by name
 *     responses:
 *       200:
 *         description: Car wash businesses fetched successfully
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
 *                   example: Car wash businesses fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     carWashBusinesses:
 *                       type: array
 *                       items:
 *                         type: object
 *                     totalCarWashBusinesses:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashBusiness/v1/businesses/{id}:
 *   get:
 *     summary: Get a car wash business by ID
 *     tags: [Car Wash Business]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the car wash business
 *     responses:
 *       200:
 *         description: Car wash business fetched successfully
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
 *                   example: Car wash business fetched successfully
 *                 data:
 *                   type: object
 *       404:
 *         description: Car wash business not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashBusiness/v1/businesses/vendor:
 *   get:
 *     summary: Get car wash business associated with the authenticated vendor
 *     tags: [Car Wash Business]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Car wash business fetched successfully
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
 *                   example: Car wash business fetched successfully
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       404:
 *         description: Car wash business not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashBusiness/v1/businesses/{id}:
 *   put:
 *     summary: Update a car wash business by ID
 *     tags: [Car Wash Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the car wash business
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               servicePrice:
 *                 type: number
 *               availableCarCity:
 *                 type: string
 *               currentLocation:
 *                 type: string
 *               garageLat:
 *                 type: number
 *               garageLong:
 *                 type: number
 *               garageServiceType:
 *                 type: string
 *               aboutUs:
 *                 type: string
 *               garageAddress:
 *                 type: string
 *               garageOpeningTime:
 *                 type: string
 *                 format: date-time
 *               garageClosingTime:
 *                 type: string
 *                 format: date-time
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Car wash business updated successfully
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
 *                   example: Car wash business updated successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input data or ID format
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       404:
 *         description: Car wash business not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carWashBusiness/v1/businesses/{id}:
 *   delete:
 *     summary: Delete a car wash business by ID
 *     tags: [Car Wash Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the car wash business
 *     responses:
 *       200:
 *         description: Car wash business deleted successfully
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
 *                   example: Car wash business deleted successfully
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       403:
 *         description: Forbidden (not authorized to delete)
 *       404:
 *         description: Car wash business not found
 *       500:
 *         description: Internal server error
 */
