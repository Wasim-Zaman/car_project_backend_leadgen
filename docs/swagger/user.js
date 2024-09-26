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
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number
 *                 example: "+1234567890"
 *               lat:
 *                 type: number
 *                 format: float
 *                 description: Latitude of the user's location (optional)
 *                 example: 37.7749
 *               long:
 *                 type: number
 *                 format: float
 *                 description: Longitude of the user's location (optional)
 *                 example: -122.4194
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: P@ssw0rd
 *               referralCode:
 *                 type: string
 *                 description: The referral code (optional)
 *                 example: REF123
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
 *               - name
 *               - email
 *               - password
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number
 *                 example: "+1234567890"
 *               otp:
 *                 type: string
 *                 description: The OTP sent to the user's mobile number
 *                 example: "123456"
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: "johndoe@example.com"
 *               address:
 *                 type: string
 *                 description: The user's address
 *                 example: "1234 Elm Street"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "P@ssw0rd"
 *               referralCode:
 *                 type: string
 *                 description: The referral code (optional)
 *                 example: "REF123"
 *               lat:
 *                 type: number
 *                 format: float
 *                 description: Latitude of the user's location (optional)
 *                 example: 37.7749
 *               long:
 *                 type: number
 *                 format: float
 *                 description: Longitude of the user's location (optional)
 *                 example: -122.4194
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
 *                           example: "cld9i7m2p0001lm35wajkg9rj"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         email:
 *                           type: string
 *                           example: "johndoe@example.com"
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
 *                   example: "Invalid or expired OTP"
 */

/**
 * @swagger
 * /api/user/v2/register:
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
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number in international format
 *                 example: "+1234567890"
 *               lat:
 *                 type: number
 *                 format: float
 *                 description: Latitude of the user's location (optional)
 *                 example: 37.7749
 *               long:
 *                 type: number
 *                 format: float
 *                 description: Longitude of the user's location (optional)
 *                 example: -122.4194
 *               password:
 *                 type: string
 *                 description: The user's password (minimum 8 characters)
 *                 example: P@ssw0rd
 *               referralCode:
 *                 type: string
 *                 description: The referral code (optional)
 *                 example: REF123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: cld9i7m2p0001lm35wajkg9rj
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     mobile:
 *                       type: string
 *                       example: "+1234567890"
 *                     lat:
 *                       type: number
 *                       example: 37.7749
 *                     long:
 *                       type: number
 *                       example: -122.4194
 *                     address:
 *                       type: string
 *                       example: "123 Main St, City, Country"
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
 *                 error:
 *                   type: string
 *                   example: "Mobile number must be in international format starting with + followed by the country code and digits."
 */

/**
 * @swagger
 * /api/user/v1/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - password
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: P@ssw0rd
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   example: Login successful
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
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials or missing fields
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
 *                   example: Invalid credentials or missing fields
 */

/**
 * @swagger
 * /api/user/v1/reset-password:
 *   put:
 *     summary: Reset user password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - password
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 description: The user's new password
 *                 example: "NewP@ssw0rd"
 *     responses:
 *       200:
 *         description: Password reset successfully
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
 *                   example: Password reset successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cld9i7m2p0001lm35wajkg9rj"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     mobile:
 *                       type: string
 *                       example: "+1234567890"
 *       400:
 *         description: Invalid request
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
 *                   example: Invalid request
 *       404:
 *         description: User not found
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
 *                   example: User not found
 */

/**
 * @swagger
 * /api/user/v1/profile/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number
 *                 example: "+1234567890"
 *               gender:
 *                 type: string
 *                 description: The user's gender
 *                 example: Male
 *               lat:
 *                 type: number
 *                 format: float
 *                 description: Latitude of the user's location (optional)
 *                 example: 37.7749
 *               long:
 *                 type: number
 *                 format: float
 *                 description: Longitude of the user's location (optional)
 *                 example: -122.4194
 *               referralCode:
 *                 type: string
 *                 description: The referral code (optional)
 *                 example: REF123
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The user's profile image
 *               age:
 *                 type: integer
 *                 description: The user's age
 *                 example: 30
 *     responses:
 *       200:
 *         description: User profile updated successfully
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
 *                   example: User profile updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: cld9i7m2p0001lm35wajkg9rj
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     mobile:
 *                       type: string
 *                       example: "+1234567890"
 *                     gender:
 *                       type: string
 *                       example: Male
 *                     lat:
 *                       type: number
 *                       format: float
 *                       example: 37.7749
 *                     long:
 *                       type: number
 *                       format: float
 *                       example: -122.4194
 *                     referralCode:
 *                       type: string
 *                       example: REF123
 *                     image:
 *                       type: string
 *                       example: "/uploads/profile/johndoe.jpg"
 *                     age:
 *                       type: integer
 *                       example: 30
 *       400:
 *         description: Invalid request
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
 *                   example: Invalid request
 *       404:
 *         description: User not found
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
 *                   example: User not found
 */
