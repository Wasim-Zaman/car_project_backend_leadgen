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
 *   schemas:
 *     VendorCoupon:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the coupon
 *         title:
 *           type: string
 *           description: The title of the coupon
 *         code:
 *           type: string
 *           description: The unique coupon code
 *         type:
 *           type: string
 *           description: Type of coupon (optional)
 *         limitPerUser:
 *           type: integer
 *           description: Maximum times a user can use this coupon (optional)
 *         discountType:
 *           type: string
 *           enum: [FLAT, PERCENTAGE]
 *           description: Type of discount (flat or percentage)
 *         discountValue:
 *           type: number
 *           description: The discount value
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Start date of the coupon validity in ISO format
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: End date of the coupon validity (optional, ISO format)
 *         maxDiscount:
 *           type: number
 *           description: Maximum discount amount (optional)
 *         minOrderAmount:
 *           type: number
 *           description: Minimum order amount required to use the coupon (optional)
 *       required:
 *         - title
 *         - code
 *         - discountType
 *         - discountValue
 *         - startDate
 *       example:
 *         id: 1
 *         title: "New Year Sale"
 *         code: "NY2024"
 *         discountType: "PERCENTAGE"
 *         discountValue: 20
 *         startDate: "2024-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   - name: VendorCoupon
 *     description: API endpoints for managing vendor coupons
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/coupons:
 *   post:
 *     summary: Create a new vendor coupon
 *     tags: [VendorCoupon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               code:
 *                 type: string
 *               type:
 *                 type: string
 *               limitPerUser:
 *                 type: integer
 *               discountType:
 *                 type: string
 *                 enum: [FLAT, PERCENTAGE]
 *               discountValue:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               maxDiscount:
 *                 type: number
 *               minOrderAmount:
 *                 type: number
 *             required:
 *               - title
 *               - code
 *               - discountType
 *               - discountValue
 *               - startDate
 *     responses:
 *       201:
 *         description: Coupon created successfully
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
 *                   example: Coupon created successfully
 *                 data:
 *                   $ref: '#/components/schemas/VendorCoupon'
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/coupons:
 *   get:
 *     summary: Get all coupons with optional search and pagination
 *     tags: [VendorCoupon]
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
 *         description: Number of coupons per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query for coupon title or code
 *     responses:
 *       200:
 *         description: Coupons retrieved successfully
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
 *                   example: Coupons retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     coupons:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/VendorCoupon'
 *                     totalCoupons:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/vendor/coupons:
 *   get:
 *     summary: Get all coupons for the authenticated vendor
 *     tags: [VendorCoupon]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor-specific coupons retrieved successfully
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
 *                   example: Vendor coupons retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     coupons:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/VendorCoupon'
 *                     totalCoupons:
 *                       type: integer
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/vendor/coupons/{vendorId}:
 *   get:
 *     summary: Get coupons by a specific vendor ID
 *     tags: [VendorCoupon]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor
 *     responses:
 *       200:
 *         description: Coupons retrieved successfully
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
 *                   example: Coupons retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     coupons:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/VendorCoupon'
 *                     totalCoupons:
 *                       type: integer
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/coupons/{id}:
 *   put:
 *     summary: Update a vendor coupon by ID
 *     tags: [VendorCoupon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the coupon to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               code:
 *                 type: string
 *               type:
 *                 type: string
 *               limitPerUser:
 *                 type: integer
 *               discountType:
 *                 type: string
 *                 enum: [FLAT, PERCENTAGE]
 *               discountValue:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               maxDiscount:
 *                 type: number
 *               minOrderAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Coupon updated successfully
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
 *                   example: Coupon updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/VendorCoupon'
 *       400:
 *         description: Invalid input data or ID format
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/coupons/apply:
 *   post:
 *     summary: Apply a coupon by a user
 *     tags: [VendorCoupon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 description: The coupon code to apply
 *     responses:
 *       200:
 *         description: Coupon applied successfully
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
 *                   example: Coupon applied successfully
 *       400:
 *         description: Invalid coupon code or conditions not met
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/coupons/{id}:
 *   delete:
 *     summary: Delete a vendor coupon by ID
 *     tags: [VendorCoupon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the coupon to delete
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
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
 *                   example: Coupon deleted successfully
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Internal server error
 */
