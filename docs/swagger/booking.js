/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management
 */

/**
 * @swagger
 * /api/booking/v1/bookings:
 *   get:
 *     summary: Retrieve bookings
 *     tags: [Bookings]
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
 *         description: Search query for filtering bookings by specific attributes.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter bookings by status.
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
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
 *                   example: "Bookings retrieved successfully"
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
 *                     bookings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           carId:
 *                             type: integer
 *                             example: 101
 *                           customerId:
 *                             type: integer
 *                             example: 501
 *                           pickupDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T10:00:00Z"
 *                           status:
 *                             type: string
 *                             example: "Confirmed"
 *       404:
 *         description: No bookings found
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
 *                   example: "No bookings found"
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/booking/v1/booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - carId
 *               - customerId
 *               - pickupDate
 *             properties:
 *               carId:
 *                 type: integer
 *                 description: The ID of the car booked
 *               customerId:
 *                 type: integer
 *                 description: The ID of the customer making the booking
 *               pickupDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of pickup
 *               status:
 *                 type: string
 *                 description: The status of the booking (e.g., "Confirmed" or "Cancelled")
 *     responses:
 *       201:
 *         description: Booking created successfully
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
 *                   example: "Booking created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     carId:
 *                       type: integer
 *                       example: 101
 *                     customerId:
 *                       type: integer
 *                       example: 501
 *                     pickupDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T10:00:00Z"
 *                     status:
 *                       type: string
 *                       example: "Confirmed"
 *       400:
 *         description: Required fields are missing
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
 *                   example: "Required fields are missing"
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/booking/v1/booking/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the booking to delete
 *     responses:
 *       200:
 *         description: Booking deleted successfully
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
 *                   example: "Booking deleted successfully"
 *       404:
 *         description: Booking not found
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
 *                   example: "Booking not found"
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/booking/v1/booking/{id}:
 *   patch:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the booking to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the booking
 *     responses:
 *       200:
 *         description: Booking updated successfully
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
 *                   example: "Booking updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       example: "Confirmed"
 *       404:
 *         description: Booking not found
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
 *                   example: "Booking not found"
 *     security:
 *       - bearerAuth: []
 */
