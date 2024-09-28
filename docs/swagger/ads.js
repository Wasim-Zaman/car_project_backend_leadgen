/**
 * @swagger
 * /api/ads/v1/advertisements:
 *   get:
 *     summary: Get all advertisements
 *     tags: [Advertisement]
 *     responses:
 *       200:
 *         description: Advertisements retrieved successfully
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
 *                   example: Advertisements retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       campaignName:
 *                         type: string
 *                         example: "Summer Sale"
 *                       moduleType:
 *                         type: string
 *                         example: "Home"
 *                       image:
 *                         type: string
 *                         example: "/uploads/ads/summer_sale.png"
 *                       publishDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-25T10:00:00Z"
 *                       unpublishDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-25T10:00:00Z"
 *                       positionId:
 *                         type: string
 *                         example: "98765"
 *                       zoneId:
 *                         type: string
 *                         example: "54321"
 */

/**
 * @swagger
 * /api/ads/v1/advertisements:
 *   post:
 *     summary: Create a new advertisement
 *     tags: [Advertisement]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - moduleType
 *               - positionId
 *               - zoneId
 *               - publishDate
 *               - unpublishDate
 *             properties:
 *               campaignName:
 *                 type: string
 *                 description: The name of the campaign
 *                 example: "Summer Sale"
 *               moduleType:
 *                 type: string
 *                 description: The type of module where the ad will be shown
 *                 example: "Home"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image for the advertisement
 *               publishDate:
 *                 type: string
 *                 format: date-time
 *                 description: The publish date of the advertisement
 *                 example: "2024-09-25T10:00:00Z"
 *               unpublishDate:
 *                 type: string
 *                 format: date-time
 *                 description: The unpublish date of the advertisement
 *                 example: "2024-10-25T10:00:00Z"
 *               positionId:
 *                 type: string
 *                 description: The position ID for the advertisement
 *                 example: "98765"
 *               zoneId:
 *                 type: string
 *                 description: The zone ID for the advertisement
 *                 example: "54321"
 *     responses:
 *       201:
 *         description: Advertisement created successfully
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
 *                   example: Advertisement created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     campaignName:
 *                       type: string
 *                       example: "Summer Sale"
 *                     moduleType:
 *                       type: string
 *                       example: "Home"
 *                     image:
 *                       type: string
 *                       example: "/uploads/ads/summer_sale.png"
 *                     publishDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-25T10:00:00Z"
 *                     unpublishDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-25T10:00:00Z"
 *                     positionId:
 *                       type: string
 *                       example: "98765"
 *                     zoneId:
 *                       type: string
 *                       example: "54321"
 */

/**
 * @swagger
 * /api/ads/v1/advertisements/{id}:
 *   put:
 *     summary: Update an advertisement by ID
 *     tags: [Advertisement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The advertisement ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               campaignName:
 *                 type: string
 *                 description: The updated campaign name
 *                 example: "Updated Summer Sale"
 *               moduleType:
 *                 type: string
 *                 description: The updated module type
 *                 example: "Home"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The updated image for the advertisement
 *               publishDate:
 *                 type: string
 *                 format: date-time
 *                 description: The updated publish date of the advertisement
 *                 example: "2024-09-25T10:00:00Z"
 *               unpublishDate:
 *                 type: string
 *                 format: date-time
 *                 description: The updated unpublish date of the advertisement
 *                 example: "2024-10-25T10:00:00Z"
 *               positionId:
 *                 type: string
 *                 description: The updated position ID
 *                 example: "98765"
 *               zoneId:
 *                 type: string
 *                 description: The updated zone ID
 *                 example: "54321"
 *     responses:
 *       200:
 *         description: Advertisement updated successfully
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
 *                   example: Advertisement updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     campaignName:
 *                       type: string
 *                       example: "Updated Summer Sale"
 *                     moduleType:
 *                       type: string
 *                       example: "Home"
 *                     image:
 *                       type: string
 *                       example: "/uploads/ads/updated_summer_sale.png"
 *                     publishDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-25T10:00:00Z"
 *                     unpublishDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-25T10:00:00Z"
 *                     positionId:
 *                       type: string
 *                       example: "98765"
 *                     zoneId:
 *                       type: string
 *                       example: "54321"
 */

/**
 * @swagger
 * /api/ads/v1/advertisements/{id}:
 *   delete:
 *     summary: Manually delete an advertisement by ID
 *     tags: [Advertisement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The advertisement ID
 *     responses:
 *       200:
 *         description: Advertisement deleted successfully
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
 *                   example: Advertisement deleted successfully
 */

/**
 * @swagger
 * /api/ads/v1/advertisements/expired:
 *   delete:
 *     summary: Automatically delete expired advertisements
 *     tags: [Advertisement]
 *     responses:
 *       200:
 *         description: Expired advertisements deleted successfully
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
 *                   example: Expired advertisements deleted successfully
 */
