/**
 * @swagger
 * /api/vendorCoupon/v1/coupons:
 *   post:
 *     summary: Create a new vendor coupon
 *     tags: [VendorCoupon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - code
 *               - discountType
 *               - discountValue
 *               - startDate
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the coupon
 *                 example: "New Year Sale"
 *               code:
 *                 type: string
 *                 description: The unique coupon code
 *                 example: "NY2024"
 *               type:
 *                 type: string
 *                 description: Type of coupon (optional)
 *                 example: "Seasonal"
 *               limitPerUser:
 *                 type: integer
 *                 description: Maximum times a user can use this coupon (optional)
 *                 example: 5
 *               discountType:
 *                 type: string
 *                 enum: [FLAT, PERCENTAGE]
 *                 description: Type of discount (flat or percentage)
 *                 example: "PERCENTAGE"
 *               discountValue:
 *                 type: number
 *                 description: The discount value
 *                 example: 20
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date of the coupon validity in ISO format
 *                 example: "2024-01-01T00:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: End date of the coupon validity (optional, ISO format)
 *                 example: "2024-01-31T00:00:00.000Z"
 *               maxDiscount:
 *                 type: number
 *                 description: Maximum discount amount (optional)
 *                 example: 100
 *               minOrderAmount:
 *                 type: number
 *                 description: Minimum order amount required to use the coupon (optional)
 *                 example: 50
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "New Year Sale"
 *                     code:
 *                       type: string
 *                       example: "NY2024"
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/coupons/{id}:
 *   put:
 *     summary: Update a vendor coupon by ID
 *     tags: [VendorCoupon]
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
 *                 description: Updated title of the coupon
 *                 example: "Updated New Year Sale"
 *               code:
 *                 type: string
 *                 description: Updated coupon code
 *                 example: "NY2024_UPDATED"
 *               discountType:
 *                 type: string
 *                 enum: [FLAT, PERCENTAGE]
 *                 description: Type of discount (flat or percentage)
 *                 example: "PERCENTAGE"
 *               discountValue:
 *                 type: number
 *                 description: Updated discount value
 *                 example: 25
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Updated start date of the coupon validity in ISO format
 *                 example: "2024-02-01T00:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: Updated end date of the coupon validity (optional, ISO format)
 *                 example: "2024-02-28T00:00:00.000Z"
 *               maxDiscount:
 *                 type: number
 *                 description: Maximum discount amount (optional)
 *                 example: 150
 *               minOrderAmount:
 *                 type: number
 *                 description: Minimum order amount required to use the coupon (optional)
 *                 example: 75
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Updated New Year Sale"
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/coupons:
 *   get:
 *     summary: Get all coupons (with optional search and pagination)
 *     tags: [VendorCoupon]
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
 *         description: Number of coupons per page
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query for coupon title or code
 *         example: "NY2024"
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
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           title:
 *                             type: string
 *                             example: "New Year Sale"
 *                           code:
 *                             type: string
 *                             example: "NY2024"
 *                     totalCoupons:
 *                       type: integer
 *                       example: 50
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/coupons/apply:
 *   post:
 *     summary: Apply a coupon by a user
 *     tags: [VendorCoupon]
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
 *                 example: "NY2024"
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
 */

/**
 * @swagger
 * /api/vendorCoupon/v1/coupons/{id}:
 *   delete:
 *     summary: Delete a vendor coupon by ID
 *     tags: [VendorCoupon]
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
 */
