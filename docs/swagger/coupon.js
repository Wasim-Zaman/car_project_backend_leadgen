/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Coupon management
 */

/**
 * @swagger
 * /api/coupon/v1/coupons:
 *   get:
 *     summary: Retrieve coupons with optional search and pagination
 *     tags: [Coupons]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to retrieve per page.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search query to filter coupons by title, code, or description.
 *     responses:
 *       200:
 *         description: Coupons retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Coupons retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalItems:
 *                       type: integer
 *                       example: 50
 *                     itemsPerPage:
 *                       type: integer
 *                       example: 10
 *                     coupons:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           image:
 *                             type: string
 *                             example: "https://example.com/coupon1.jpg"
 *                           expiryDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           code:
 *                             type: string
 *                             example: "DISCOUNT2023"
 *                           title:
 *                             type: string
 *                             example: "Summer Sale"
 *                           subtitle:
 *                             type: string
 *                             example: "20% off on all items"
 *                           status:
 *                             type: string
 *                             example: "active"
 *                           minOrderAmount:
 *                             type: number
 *                             example: 50.0
 *                           value:
 *                             type: number
 *                             example: 20.0
 *                           description:
 *                             type: string
 *                             example: "Get 20% off on all items during our summer sale."
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No coupons found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No coupons found
 */

/**
 * @swagger
 * /api/coupon/v1/coupon:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The coupon image to upload
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 description: The expiry date of the coupon
 *               code:
 *                 type: string
 *                 description: The coupon code
 *               title:
 *                 type: string
 *                 description: The title of the coupon
 *               subtitle:
 *                 type: string
 *                 description: The subtitle of the coupon
 *               status:
 *                 type: number
 *                 description: The status of the coupon
 *               minOrderAmount:
 *                 type: number
 *                 description: The minimum order amount for the coupon
 *               value:
 *                 type: number
 *                 description: The value/discount of the coupon
 *               description:
 *                 type: string
 *                 description: The description of the coupon
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
 *                     image:
 *                       type: string
 *                       example: "https://example.com/coupon1.jpg"
 *                     expiryDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     code:
 *                       type: string
 *                       example: "DISCOUNT2023"
 *                     title:
 *                       type: string
 *                       example: "Summer Sale"
 *                     subtitle:
 *                       type: string
 *                       example: "20% off on all items"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     minOrderAmount:
 *                       type: number
 *                       example: 50.0
 *                     value:
 *                       type: number
 *                       example: 20.0
 *                     description:
 *                       type: string
 *                       example: "Get 20% off on all items during our summer sale."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       400:
 *         description: Bad request
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
 *                   example: Image is required
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/coupon/v1/coupon/{id}:
 *   delete:
 *     summary: Delete a coupon
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
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
 *       404:
 *         description: Coupon not found
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
 *                   example: Coupon not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/coupon/v1/coupon/{id}:
 *   patch:
 *     summary: Update a coupon
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the coupon to update
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The coupon image to upload (optional)
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 description: The expiry date of the coupon
 *               code:
 *                 type: string
 *                 description: The coupon code
 *               title:
 *                 type: string
 *                 description: The title of the coupon
 *               subtitle:
 *                 type: string
 *                 description: The subtitle of the coupon
 *               status:
 *                 type: number
 *                 description: The status of the coupon
 *               minOrderAmount:
 *                 type: number
 *                 description: The minimum order amount for the coupon
 *               value:
 *                 type: number
 *                 description: The value/discount of the coupon
 *               description:
 *                 type: string
 *                 description: The description of the coupon
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
 *                     image:
 *                       type: string
 *                       example: "https://example.com/coupon1.jpg"
 *                     expiryDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     code:
 *                       type: string
 *                       example: "DISCOUNT2023"
 *                     title:
 *                       type: string
 *                       example: "Summer Sale"
 *                     subtitle:
 *                       type: string
 *                       example: "20% off on all items"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     minOrderAmount:
 *                       type: number
 *                       example: 50.0
 *                     value:
 *                       type: number
 *                       example: 20.0
 *                     description:
 *                       type: string
 *                       example: "Get 20% off on all items during our summer sale."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Coupon not found
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
 *                   example: Coupon not found
 *     security:
 *       - bearerAuth: []
 */
