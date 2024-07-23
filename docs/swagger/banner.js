/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Banner management
 */

/**
 * @swagger
 * /api/banner/v1/postBanner:
 *   post:
 *     summary: Create a new banner
 *     tags: [Banners]
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
 *                 description: The banner image to upload
 *     responses:
 *       201:
 *         description: Banner created successfully
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
 *                   example: Banner created successfully
 *                 data:
 *                   type: object
 *                   nullable: true
 *       400:
 *         description: Image is required
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
 */
