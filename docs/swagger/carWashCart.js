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
 */

/**
 * @swagger
 * /api/cart/v1/cart:
 *   post:
 *     summary: Add or update an item in the cart
 *     tags: [CarWashCart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - carWashServiceId
 *               - quantity
 *             properties:
 *               carWashServiceId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the car wash service to be added to the cart
 *                 example: "b5f9e6d7-5d38-4f4d-b6bb-85a2e6c1e193"
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the service to add
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to cart successfully
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
 *                   example: Item added to cart successfully
 *                 data:
 *                   type: object
 *                   description: The cart object with updated items
 *       400:
 *         description: Invalid request body or validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/cart/v1/cart/{userId}:
 *   get:
 *     summary: Get all cart items for a user
 *     tags: [CarWashCart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the user to fetch the cart for
 *         example: "e4a4f92b-0334-45f5-8a6e-f8a2be9782b9"
 *     responses:
 *       200:
 *         description: Cart fetched successfully
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
 *                   example: Cart fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c8473cbe-4b93-4f53-9479-058ae9d9a685"
 *                     userId:
 *                       type: string
 *                       example: "e4a4f92b-0334-45f5-8a6e-f8a2be9782b9"
 *                     cartItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "8cf44c3d-1234-4b68-a65f-0c4aab356654"
 *                           carWashServiceId:
 *                             type: string
 *                             example: "b5f9e6d7-5d38-4f4d-b6bb-85a2e6c1e193"
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           carWashService:
 *                             type: object
 *                             description: The car wash service details
 *       404:
 *         description: Cart not found for this user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/cart/v1/cart/item/{cartItemId}:
 *   delete:
 *     summary: Remove an item from the cart by item ID
 *     tags: [CarWashCart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the cart item to remove
 *         example: "8cf44c3d-1234-4b68-a65f-0c4aab356654"
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
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
 *                   example: Item removed from cart successfully
 *                 data:
 *                   type: object
 *                   description: The deleted cart item
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/cart/v1/cart/clear/{userId}:
 *   delete:
 *     summary: Clear all items from a user's cart
 *     tags: [CarWashCart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the user whose cart is to be cleared
 *         example: "e4a4f92b-0334-45f5-8a6e-f8a2be9782b9"
 *     responses:
 *       200:
 *         description: Cart cleared successfully
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
 *                   example: Cart cleared successfully
 *                 data:
 *                   type: object
 *                   description: The result of the deletion operation
 *       404:
 *         description: Cart not found for this user
 *       500:
 *         description: Internal server error
 */
