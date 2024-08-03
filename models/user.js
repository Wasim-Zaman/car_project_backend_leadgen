const { PrismaClient } = require("@prisma/client");

const Bcrypt = require("../utils/bcrypt");
const CustomError = require("../utils/customError");

const prisma = new PrismaClient();

class User {
  /**
   * Finds a user by their email.
   * @param {string} email - The email of the user to find.
   * @returns {Promise<Object|null>} - The found user or null if not found.
   */
  static async findByEmail(email) {
    try {
      return await prisma.user.findUnique({
        where: { email: email.toString() },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Finds a user by their mobile number.
   * @param {string} mobile - The mobile number of the user to find.
   * @returns {Promise<Object|null>} - The found user or null if not found.
   */
  static async findByMobile(mobile) {
    try {
      return await prisma.user.findUnique({
        where: { mobile: mobile.toString() },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new user.
   * @param {Object} data - The data for the new user.
   * @returns {Promise<Object>} - The created user.
   */
  static async createUser(data) {
    try {
      return await prisma.user.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a user by ID.
   * @param {string} id - The ID of the user to update.
   * @param {Object} data - The new data for the user.
   * @returns {Promise<Object>} - The updated user.
   */
  static async updateUser(id, data) {
    try {
      return await prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Authenticates a user using their mobile number and password.
   * @param {string} mobile - The mobile number of the user.
   * @param {string} password - The user's password.
   * @returns {Promise<Object>} - The authenticated user or throws an error.
   */
  static async login(mobile, password) {
    try {
      // Find the user by mobile number
      const user = await this.findByMobile(mobile);
      if (!user) {
        throw new CustomError("User not found");
      }

      // Check if the password is correct
      const isPasswordValid = await Bcrypt.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        throw new CustomError("Invalid credentials", 401);
      }

      // Return the user if authentication is successful
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
