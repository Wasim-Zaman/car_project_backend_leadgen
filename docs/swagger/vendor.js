/**
 * @swagger
 * /api/vendor/v1/vendors/register:
 *   post:
 *     summary: Register a new Vendor
 *     tags: [Vendor]
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
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The last name of the vendor
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 description: The phone number of the vendor
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 description: The email address of the vendor
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the vendor account
 *                 example: "password123"
 *               businessName:
 *                 type: string
 *                 description: The name of the vendor's business
 *                 example: "Doe's Shop"
 *               storeLogo:
 *                 type: string
 *                 format: binary
 *                 description: The logo image file of the store
 *               storeCover:
 *                 type: string
 *                 format: binary
 *                 description: The cover image file of the store
 *               address:
 *                 type: string
 *                 description: The address of the vendor
 *                 example: "123 Main Street"
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
 *                 description: Unit for delivery measurement
 *                 example: "Kg"
 *               businessPlan:
 *                 type: string
 *                 description: Vendor's business plan
 *                 example: "Premium"
 *               moduleType:
 *                 type: string
 *                 description: Type of business module
 *                 example: "Retail"
 *               zoneId:
 *                 type: string
 *                 description: The ID of the zone where the vendor operates
 *                 example: "zone123"
 *     responses:
 *       201:
 *         description: Vendor registered successfully
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
 *                   example: Vendor registered successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "vendor123"
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 */

/**
 * @swagger
 * /api/vendor/v1/vendors/login:
 *   post:
 *     summary: Vendor login
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The phone number of the vendor
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 description: The password of the vendor
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendor:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "vendor123"
 *                         firstName:
 *                           type: string
 *                           example: John
 *                         lastName:
 *                           type: string
 *                           example: Doe
 *                         phone:
 *                           type: string
 *                           example: "+1234567890"
 *                         email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                     token:
 *                       type: string
 *                       description: JWT authentication token
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

/**
 * @swagger
 * /api/vendor/v1/vendors/{id}:
 *   put:
 *     summary: Update vendor details
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Updated first name of the vendor
 *                 example: "Jane"
 *               lastName:
 *                 type: string
 *                 description: Updated last name of the vendor
 *                 example: "Smith"
 *               phone:
 *                 type: string
 *                 description: Updated phone number of the vendor
 *                 example: "+0987654321"
 *               email:
 *                 type: string
 *                 description: Updated email address of the vendor
 *                 example: "jane.smith@example.com"
 *               businessName:
 *                 type: string
 *                 description: Updated business name
 *                 example: "Smith's Emporium"
 *               storeLogo:
 *                 type: string
 *                 format: binary
 *                 description: Updated store logo image file
 *               storeCover:
 *                 type: string
 *                 format: binary
 *                 description: Updated store cover image file
 *               address:
 *                 type: string
 *                 description: Updated address of the vendor
 *                 example: "456 Another St"
 *               vatTax:
 *                 type: string
 *                 description: Updated VAT or tax information
 *                 example: "15%"
 *               minDeliveryTime:
 *                 type: string
 *                 description: Updated minimum delivery time
 *                 example: "20 minutes"
 *               maxDeliveryTime:
 *                 type: string
 *                 description: Updated maximum delivery time
 *                 example: "45 minutes"
 *               deliveryUnit:
 *                 type: string
 *                 description: Updated delivery unit measurement
 *                 example: "Pieces"
 *               businessPlan:
 *                 type: string
 *                 description: Updated business plan
 *                 example: "Enterprise"
 *               moduleType:
 *                 type: string
 *                 description: Updated business module type
 *                 example: "Wholesale"
 *               zoneId:
 *                 type: string
 *                 description: Updated zone ID where the vendor operates
 *                 example: "zone456"
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
 *                       example: "vendor123"
 *                     firstName:
 *                       type: string
 *                       example: Jane
 *                     lastName:
 *                       type: string
 *                       example: Smith
 *                     phone:
 *                       type: string
 *                       example: "+0987654321"
 *                     email:
 *                       type: string
 *                       example: "jane.smith@example.com"
 */

/**
 * @swagger
 * /api/vendor/v1/vendors:
 *   get:
 *     summary: Get all vendors
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of vendors per page
 *         example: 10
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query for vendor's name or phone
 *         example: "John"
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
 *                         example: "vendor123"
 *                       firstName:
 *                         type: string
 *                         example: John
 *                       lastName:
 *                         type: string
 *                         example: Doe
 *                       phone:
 *                         type: string
 *                         example: "+1234567890"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 */

/**
 * @swagger
 * /api/vendor/v1/vendors/{id}:
 *   get:
 *     summary: Get a vendor by ID
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor to retrieve
 *         example: "vendor123"
 *     responses:
 *       200:
 *         description: Vendor retrieved successfully
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
 *                   example: Vendor retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "vendor123"
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
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
 * /api/vendor/v1/vendors/{id}:
 *   delete:
 *     summary: Delete a vendor by ID
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor to delete
 *         example: "vendor123"
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
