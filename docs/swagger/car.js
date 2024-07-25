/**
 * @swagger
 * /api/car/v1/cars:
 *   get:
 *     summary: Retrieve cars
 *     tags: [Cars]
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
 *     responses:
 *       200:
 *         description: Cars retrieved successfully
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
 *                   example: Cars retrieved successfully
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
 *                     cars:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           title:
 *                             type: string
 *                             example: "Sedan"
 *                           image:
 *                             type: string
 *                             example: "https://example.com/car1.jpg"
 *                           status:
 *                             type: integer
 *                             example: 1
 *                           brandId:
 *                             type: integer
 *                             example: 1
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *                           brand:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               title:
 *                                 type: string
 *                                 example: "Brand A"
 *                               image:
 *                                 type: string
 *                                 example: "https://example.com/brand1.jpg"
 *                               status:
 *                                 type: integer
 *                                 example: 1
 *                               createdAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2023-07-24T12:00:00Z"
 *                               updatedAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No cars found
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
 *                   example: No cars found
 */

/**
 * @swagger
 * /api/car/v1/car:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the car
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The car image to upload
 *               status:
 *                 type: integer
 *                 description: The status of the car
 *               brandId:
 *                 type: integer
 *                 description: The ID of the brand
 *     responses:
 *       201:
 *         description: Car created successfully
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
 *                   example: Car created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Sedan"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/car1.jpg"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     brandId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *                     brand:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         title:
 *                           type: string
 *                           example: "Brand A"
 *                         image:
 *                           type: string
 *                           example: "https://example.com/brand1.jpg"
 *                         status:
 *                           type: integer
 *                           example: 1
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2023-07-24T12:00:00Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2023-07-25T12:00:00Z"
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

/**
 * @swagger
 * /api/car/v1/car/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the car to delete
 *     responses:
 *       200:
 *         description: Car deleted successfully
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
 *                   example: Car deleted successfully
 *       404:
 *         description: Car not found
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
 *                   example: Car not found
 */

/**
 * @swagger
 * /api/car/v1/car/{id}:
 *   patch:
 *     summary: Update a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the car to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the car
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The new car image to upload
 *               status:
 *                 type: integer
 *                 description: The status of the car
 *               brandId:
 *                 type: integer
 *                 description: The ID of the brand
 *     responses:
 *       200:
 *         description: Car updated successfully
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
 *                   example: Car updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Sedan"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/car1.jpg"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     brandId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *                     brand:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         title:
 *                           type: string
 *                           example: "Brand A"
 *                         image:
 *                           type: string
 *                           example: "https://example.com/brand1.jpg"
 *                         status:
 *                           type: integer
 *                           example: 1
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2023-07-24T12:00:00Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Car not found
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
 *                   example: Car not found
 */
