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
 *   name: Cars
 *   description: Car management
 */

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
 *                           name:
 *                             type: string
 *                             example: "Tesla Model S"
 *                           number:
 *                             type: string
 *                             example: "ABC1234"
 *                           image:
 *                             type: string
 *                             example: "https://example.com/car1.jpg"
 *                           status:
 *                             type: integer
 *                             example: 1
 *                           rating:
 *                             type: number
 *                             format: float
 *                             example: 4.5
 *                           totalSeat:
 *                             type: integer
 *                             example: 5
 *                           hasAC:
 *                             type: boolean
 *                             example: true
 *                           driverName:
 *                             type: string
 *                             example: "John Doe"
 *                           driverMobile:
 *                             type: string
 *                             example: "1234567890"
 *                           gearSystem:
 *                             type: string
 *                             example: "Automatic"
 *                           rentPriceWithoutDriver:
 *                             type: number
 *                             format: float
 *                             example: 100.00
 *                           rentPriceWithDriver:
 *                             type: number
 *                             format: float
 *                             example: 150.00
 *                           engineHP:
 *                             type: number
 *                             format: float
 *                             example: 670
 *                           priceType:
 *                             type: string
 *                             example: "Hourly"
 *                           fuelType:
 *                             type: string
 *                             example: "Electric"
 *                           description:
 *                             type: string
 *                             example: "A luxurious electric car."
 *                           pickupAddress:
 *                             type: string
 *                             example: "123 Tesla Road, CA"
 *                           latitude:
 *                             type: number
 *                             format: float
 *                             example: 37.7749
 *                           longitude:
 *                             type: number
 *                             format: float
 *                             example: -122.4194
 *                           totalDrivenKM:
 *                             type: number
 *                             format: float
 *                             example: 5000
 *                           minimumHoursRequired:
 *                             type: integer
 *                             example: 2
 *                           carTypeId:
 *                             type: integer
 *                             example: 1
 *                           brandId:
 *                             type: integer
 *                             example: 1
 *                           cityId:
 *                             type: integer
 *                             example: 1
 *                           facilities:
 *                             type: array
 *                             items:
 *                               type: integer
 *                               example: 1
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
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
 *     security:
 *       - bearerAuth: []
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
 *               name:
 *                 type: string
 *                 description: The name of the car model
 *               ownerName:
 *                 type: string
 *                 description: The name of the car model
 *               number:
 *                 type: string
 *                 description: The registration number of the car
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The car image to upload
 *               status:
 *                 type: integer
 *                 description: The status of the car
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: The car's rating
 *               totalSeat:
 *                 type: integer
 *                 description: Total number of seats in the car
 *               hasAC:
 *                 type: boolean
 *                 description: Indicates if the car has air conditioning
 *               driverName:
 *                 type: string
 *                 description: The name of the car's driver
 *               driverMobile:
 *                 type: string
 *                 description: The mobile number of the driver
 *               gearSystem:
 *                 type: string
 *                 description: The type of gear system (e.g., Automatic, Manual)
 *               rentPriceWithoutDriver:
 *                 type: number
 *                 format: float
 *                 description: Rental price without driver
 *               rentPriceWithDriver:
 *                 type: number
 *                 format: float
 *                 description: Rental price with driver
 *               engineHP:
 *                 type: number
 *                 format: float
 *                 description: The engine horsepower
 *               priceType:
 *                 type: string
 *                 description: The type of pricing (e.g., Hourly, Daily)
 *               fuelType:
 *                 type: string
 *                 description: The type of fuel used by the car (e.g., Electric, Petrol)
 *               description:
 *                 type: string
 *                 description: A description of the car
 *               pickupAddress:
 *                 type: string
 *                 description: The address where the car can be picked up
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitude coordinate for the car's location
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitude coordinate for the car's location
 *               totalDrivenKM:
 *                 type: number
 *                 format: float
 *                 description: The total kilometers driven by the car
 *               minimumHoursRequired:
 *                 type: integer
 *                 description: Minimum number of hours required for renting the car
 *               carTypeId:
 *                 type: integer
 *                 description: The ID of the car type
 *               brandId:
 *                 type: integer
 *                 description: The ID of the brand
 *               cityId:
 *                 type: integer
 *                 description: The ID of the city
 *               facilities:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: List of facility IDs associated with the car
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
 *                     name:
 *                       type: string
 *                       example: "Tesla Model S"
 *                     number:
 *                       type: string
 *                       example: "ABC1234"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/car1.jpg"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     rating:
 *                       type: number
 *                       format: float
 *                       example: 4.5
 *                     totalSeat:
 *                       type: integer
 *                       example: 5
 *                     hasAC:
 *                       type: boolean
 *                       example: true
 *                     driverName:
 *                       type: string
 *                       example: "John Doe"
 *                     driverMobile:
 *                       type: string
 *                       example: "1234567890"
 *                     gearSystem:
 *                       type: string
 *                       example: "Automatic"
 *                     rentPriceWithoutDriver:
 *                       type: number
 *                       format: float
 *                       example: 100.00
 *                     rentPriceWithDriver:
 *                       type: number
 *                       format: float
 *                       example: 150.00
 *                     engineHP:
 *                       type: number
 *                       format: float
 *                       example: 670
 *                     priceType:
 *                       type: string
 *                       example: "Hourly"
 *                     fuelType:
 *                       type: string
 *                       example: "Electric"
 *                     description:
 *                       type: string
 *                       example: "A luxurious electric car."
 *                     pickupAddress:
 *                       type: string
 *                       example: "123 Tesla Road, CA"
 *                     latitude:
 *                       type: number
 *                       format: float
 *                       example: 37.7749
 *                     longitude:
 *                       type: number
 *                       format: float
 *                       example: -122.4194
 *                     totalDrivenKM:
 *                       type: number
 *                       format: float
 *                       example: 5000
 *                     minimumHoursRequired:
 *                       type: integer
 *                       example: 2
 *                     carTypeId:
 *                       type: integer
 *                       example: 1
 *                     brandId:
 *                       type: integer
 *                       example: 1
 *                     cityId:
 *                       type: integer
 *                       example: 1
 *                     facilities:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *               name:
 *                 type: string
 *                 description: The name of the car model
 *               number:
 *                 type: string
 *                 description: The registration number of the car
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The new car image to upload
 *               status:
 *                 type: integer
 *                 description: The status of the car
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: The car's rating
 *               totalSeat:
 *                 type: integer
 *                 description: Total number of seats in the car
 *               hasAC:
 *                 type: boolean
 *                 description: Indicates if the car has air conditioning
 *               driverName:
 *                 type: string
 *                 description: The name of the car's driver
 *               driverMobile:
 *                 type: string
 *                 description: The mobile number of the driver
 *               gearSystem:
 *                 type: string
 *                 description: The type of gear system (e.g., Automatic, Manual)
 *               rentPriceWithoutDriver:
 *                 type: number
 *                 format: float
 *                 description: Rental price without driver
 *               rentPriceWithDriver:
 *                 type: number
 *                 format: float
 *                 description: Rental price with driver
 *               engineHP:
 *                 type: number
 *                 format: float
 *                 description: The engine horsepower
 *               priceType:
 *                 type: string
 *                 description: The type of pricing (e.g., Hourly, Daily)
 *               fuelType:
 *                 type: string
 *                 description: The type of fuel used by the car (e.g., Electric, Petrol)
 *               description:
 *                 type: string
 *                 description: A description of the car
 *               pickupAddress:
 *                 type: string
 *                 description: The address where the car can be picked up
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitude coordinate for the car's location
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitude coordinate for the car's location
 *               totalDrivenKM:
 *                 type: number
 *                 format: float
 *                 description: The total kilometers driven by the car
 *               minimumHoursRequired:
 *                 type: integer
 *                 description: Minimum number of hours required for renting the car
 *               carTypeId:
 *                 type: integer
 *                 description: The ID of the car type
 *               brandId:
 *                 type: integer
 *                 description: The ID of the brand
 *               cityId:
 *                 type: integer
 *                 description: The ID of the city
 *               facilities:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: List of facility IDs associated with the car
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
 *                     name:
 *                       type: string
 *                       example: "Tesla Model S"
 *                     number:
 *                       type: string
 *                       example: "ABC1234"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/car1.jpg"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     rating:
 *                       type: number
 *                       format: float
 *                       example: 4.5
 *                     totalSeat:
 *                       type: integer
 *                       example: 5
 *                     hasAC:
 *                       type: boolean
 *                       example: true
 *                     driverName:
 *                       type: string
 *                       example: "John Doe"
 *                     driverMobile:
 *                       type: string
 *                       example: "1234567890"
 *                     gearSystem:
 *                       type: string
 *                       example: "Automatic"
 *                     rentPriceWithoutDriver:
 *                       type: number
 *                       format: float
 *                       example: 100.00
 *                     rentPriceWithDriver:
 *                       type: number
 *                       format: float
 *                       example: 150.00
 *                     engineHP:
 *                       type: number
 *                       format: float
 *                       example: 670
 *                     priceType:
 *                       type: string
 *                       example: "Hourly"
 *                     fuelType:
 *                       type: string
 *                       example: "Electric"
 *                     description:
 *                       type: string
 *                       example: "A luxurious electric car."
 *                     pickupAddress:
 *                       type: string
 *                       example: "123 Tesla Road, CA"
 *                     latitude:
 *                       type: number
 *                       format: float
 *                       example: 37.7749
 *                     longitude:
 *                       type: number
 *                       format: float
 *                       example: -122.4194
 *                     totalDrivenKM:
 *                       type: number
 *                       format: float
 *                       example: 5000
 *                     minimumHoursRequired:
 *                       type: integer
 *                       example: 2
 *                     carTypeId:
 *                       type: integer
 *                       example: 1
 *                     brandId:
 *                       type: integer
 *                       example: 1
 *                     cityId:
 *                       type: integer
 *                       example: 1
 *                     facilities:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
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
 *     security:
 *       - bearerAuth: []
 */
