/**
 * @swagger
 * tags:
 *   name: User
 *   description: User registration and authentication routes
 */

/**
 * @swagger
 * /api/user/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - address
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number
 *               address:
 *                 type: string
 *                 description: The user's address
 *               password:
 *                 type: string
 *                 description: The user's password
 *               referralCode:
 *                 type: string
 *                 description: The referral code (optional)
 *     responses:
 *       200:
 *         description: OTP sent to user's mobile number
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
 *                   example: OTP sent to user's mobile
 *       400:
 *         description: Validation error or user already exists
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
 *                   example: User already exists or validation error
 */

/**
 * @swagger
 * /api/user/v1/verify-otp:
 *   post:
 *     summary: Verify OTP and create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - otp
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number
 *               otp:
 *                 type: string
 *                 description: The OTP sent to the user's mobile number
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               address:
 *                 type: string
 *                 description: The user's address
 *               password:
 *                 type: string
 *                 description: The user's password
 *               referralCode:
 *                 type: string
 *                 description: The referral code (optional)
 *               lat:
 *                 type: number
 *                 format: float
 *                 description: Latitude of the user's location (optional)
 *               long:
 *                 type: number
 *                 format: float
 *                 description: Longitude of the user's location (optional)
 *     responses:
 *       200:
 *         description: User registered successfully
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
 *                   example: User registered successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: cld9i7m2p0001lm35wajkg9rj
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *                         mobile:
 *                           type: string
 *                           example: "+1234567890"
 *       400:
 *         description: Invalid or expired OTP
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
 *                   example: Invalid or expired OTP
 */
