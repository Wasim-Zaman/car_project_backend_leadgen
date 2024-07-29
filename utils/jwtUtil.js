const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class jwtUtil {
  /**
   * Create a JWT token
   * @param {Object} payload - The payload to encode in the token
   * @param {string} secret - The secret key to sign the token
   * @param {Object} options - Additional options for the token
   * @returns {string} - The generated JWT token
   */
  static createToken(
    payload,
    options = {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  ) {
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

  static async comparePassword(inputPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    console.log(
      `Comparing passwords: ${inputPassword} vs ${hashedPassword} -> ${isMatch}`
    );
    return isMatch;
  }

  static async createPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(`Created hashed password: ${hashedPassword}`);
    return hashedPassword;
  }
}

module.exports = jwtUtil;
