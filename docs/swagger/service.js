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
 *   name: Services
 *   description: Service management
 */

/**
 * @swagger
 * paths:
 *   /api/service/v1/services:
 *     post:
 *       tags: [Services]
 *       summary: Create a new service
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 serviceName:
 *                   type: string
 *                 serviceType:
 *                   type: string
 *                 serviceDescription:
 *                   type: string
 *                 includingServices:
 *                   type: string
 *                 excludingServices:
 *                   type: string
 *                 termsAndConditions:
 *                   type: string
 *                 servicePrice:
 *                   type: number
 *                 vendorId:
 *                   type: string
 *               required:
 *                 - serviceName
 *                 - serviceType
 *                 - servicePrice
 *                 - vendorId
 *       responses:
 *         201:
 *           description: Service created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *         401:
 *           description: Unauthorized - Invalid or missing token
 *         403:
 *           description: Forbidden - Insufficient permissions
 *         404:
 *           description: Vendor not found
 *         500:
 *           description: Internal Server Error
 *
 *     get:
 *       tags: [Services]
 *       summary: Retrieve all services with optional search and pagination
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: page
 *           required: false
 *           schema:
 *             type: integer
 *         - in: query
 *           name: limit
 *           required: false
 *           schema:
 *             type: integer
 *         - in: query
 *           name: search
 *           required: false
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Services fetched successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       services:
 *                         type: array
 *                         items:
 *                           type: object
 *                       totalServices:
 *                         type: integer
 *         401:
 *           description: Unauthorized - Invalid or missing token
 *         403:
 *           description: Forbidden - Insufficient permissions
 *         500:
 *           description: Internal Server Error
 *
 *   /api/service/v1/services/{id}:
 *     get:
 *       tags: [Services]
 *       summary: Retrieve a service by ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Service fetched successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *         401:
 *           description: Unauthorized - Invalid or missing token
 *         403:
 *           description: Forbidden - Insufficient permissions
 *         404:
 *           description: Service not found
 *         500:
 *           description: Internal Server Error
 *
 *     put:
 *       tags: [Services]
 *       summary: Update an existing service
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 serviceName:
 *                   type: string
 *                 serviceType:
 *                   type: string
 *                 serviceDescription:
 *                   type: string
 *                 includingServices:
 *                   type: string
 *                 excludingServices:
 *                   type: string
 *                 termsAndConditions:
 *                   type: string
 *                 servicePrice:
 *                   type: number
 *               required:
 *                 - serviceName
 *                 - servicePrice
 *       responses:
 *         200:
 *           description: Service updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *         401:
 *           description: Unauthorized - Invalid or missing token
 *         403:
 *           description: Forbidden - Insufficient permissions
 *         404:
 *           description: Service not found
 *         500:
 *           description: Internal Server Error
 *
 *     delete:
 *       tags: [Services]
 *       summary: Delete a service by ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Service deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   message:
 *                     type: string
 *         401:
 *           description: Unauthorized - Invalid or missing token
 *         403:
 *           description: Forbidden - Insufficient permissions
 *         404:
 *           description: Service not found
 *         500:
 *           description: Internal Server Error
 */
