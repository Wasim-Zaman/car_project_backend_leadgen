/**
 * @swagger
 * tags:
 *   name: Facilities
 *   description: API for managing facilities
 */

/**
 * @swagger
 * /v1/facilities:
 *   get:
 *     summary: Retrieve a list of facilities
 *     tags: [Facilities]
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
 *     responses:
 *       200:
 *         description: A list of facilities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Facility'
 *       404:
 *         description: No facilities found
 */

/**
 * @swagger
 * /v1/facility:
 *   post:
 *     summary: Create a new facility
 *     tags: [Facilities]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               status:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Facility created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Facility'
 *       400:
 *         description: Image is required
 */

/**
 * @swagger
 * /v1/facility/{id}:
 *   patch:
 *     summary: Update an existing facility
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The facility ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               status:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Facility updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Facility'
 *       404:
 *         description: Facility not found
 */

/**
 * @swagger
 * /v1/facility/{id}:
 *   delete:
 *     summary: Delete a facility
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The facility ID
 *     responses:
 *       200:
 *         description: Facility deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Facility'
 *       404:
 *         description: Facility not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Facility:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the facility
 *         name:
 *           type: string
 *           description: The name of the facility
 *         image:
 *           type: string
 *           description: The image URL of the facility
 *         status:
 *           type: integer
 *           description: The status of the facility
 *       example:
 *         id: 1
 *         name: Facility Name
 *         image: /path/to/image.jpg
 *         status: 1
 */
