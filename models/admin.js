const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const CustomError = require("../utils/customError");

const prisma = new PrismaClient();

class Admin {
  static async findByEmail(email) {
    try {
      const admin = await prisma.admin.findUnique({
        where: { email: email },
      });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  static async createAdmin(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 12);
      const admin = await prisma.admin.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  static async comparePassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  static async createPassword(password) {
    return await bcrypt.hash(password, 12);
  }
}

module.exports = Admin;
