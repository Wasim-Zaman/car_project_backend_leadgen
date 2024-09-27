/**
 * @swagger
 * /api/vendor/v1/vendor:
 *   post:
 *     summary: Create a new Vendor
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *               - email
 *               - password
 *               - zoneId
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the vendor
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: The last name of the vendor
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 description: The phone number of the vendor
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 description: The email of the vendor
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the vendor account
 *                 example: "password123"
 *               businessName:
 *                 type: string
 *                 description: The name of the business
 *                 example: "Doe's Shop"
 *               storeLogo:
 *                 type: string
 *                 format: binary
 *                 description: The logo image of the store
 *               storeCover:
 *                 type: string
 *                 format: binary
 *                 description: The cover image of the store
 *               address:
 *                 type: string
 *                 description: The address of the vendor
 *                 example: "123 Main Street"
 *               moduleType:
 *                 type: string
 *                 description: The module type for the vendor
 *                 example: "Retail"
 *               vatTax:
 *                 type: string
 *                 description: VAT or tax information
 *                 example: "10%"
 *               minDeliveryTime:
 *                 type: string
 *                 description: Minimum delivery time
 *                 example: "30 minutes"
 *               maxDeliveryTime:
 *                 type: string
 *                 description: Maximum delivery time
 *                 example: "1 hour"
 *               deliveryUnit:
 *                 type: string
 *                 description: Unit for delivery
 *                 example: "Kg"
 *               businessPlan:
 *                 type: string
 *                 description: Vendor's business plan
 *                 example: "Premium"
 *               zoneId:
 *                 type: string
 *                 description: The ID of the zone the vendor is located in
 *                 example: "12345"
 *     responses:
 *       201:
 *         description: Vendor created successfully
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
 *                   example: Vendor created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 */

/**
 * @swagger
 * /api/vendor/v1/vendor/{id}:
 *   get:
 *     summary: Get a Vendor by ID
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Vendor ID
 *     responses:
 *       200:
 *         description: Vendor found successfully
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
 *                   example: Vendor found successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     businessName:
 *                       type: string
 *                       example: "Doe's Shop"
 *                     address:
 *                       type: string
 *                       example: "123 Main Street"
 */

/**
 * @swagger
 * /api/vendor/v1/vendor/{id}:
 *   patch:
 *     summary: Update a Vendor by ID
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Vendor ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the vendor
 *                 example: "Updated John"
 *               lastName:
 *                 type: string
 *                 description: The last name of the vendor
 *                 example: "Updated Doe"
 *               phone:
 *                 type: string
 *                 description: The phone number of the vendor
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 description: The email of the vendor
 *                 example: "updated.email@example.com"
 *               businessName:
 *                 type: string
 *                 description: The name of the business
 *                 example: "Updated Doe's Shop"
 *               storeLogo:
 *                 type: string
 *                 format: binary
 *                 description: The updated logo image of the store
 *               storeCover:
 *                 type: string
 *                 format: binary
 *                 description: The updated cover image of the store
 *               address:
 *                 type: string
 *                 description: The updated address of the vendor
 *                 example: "Updated 123 Main Street"
 *     responses:
 *       200:
 *         description: Vendor updated successfully
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
 *                   example: Vendor updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     firstName:
 *                       type: string
 *                       example: "Updated John"
 *                     lastName:
 *                       type: string
 *                       example: "Updated Doe"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     email:
 *                       type: string
 *                       example: "updated.email@example.com"
 */

/**
 * @swagger
 * /api/vendor/v1/vendor/{id}:
 *   delete:
 *     summary: Delete a Vendor by ID
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Vendor ID
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
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
 *                   example: Vendor deleted successfully
 */

/**
 * @swagger
 * /api/vendor/v1/vendors:
 *   get:
 *     summary: Get all Vendors with pagination
 *     tags: [Vendor]
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
 *         description: Search query for vendor name or phone
 *     responses:
 *       200:
 *         description: Vendors retrieved successfully
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
 *                   example: Vendors retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                       phone:
 *                         type: string
 *                         example: "+1234567890"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       businessName:
 *                         type: string
 *                         example: "Doe's Shop"
 */

/**
 * @swagger
 * /api/vendor/v1/vendors/all:
 *   get:
 *     summary: Get all Vendors without pagination
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: Vendors retrieved successfully
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
 *                   example: Vendors retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                       phone:
 *                         type: string
 *                         example: "+1234567890"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 */
