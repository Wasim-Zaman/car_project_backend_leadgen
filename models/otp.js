const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class OTP {
  static async createOTP(data) {
    try {
      return await prisma.oTP.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findByMobile(mobile) {
    try {
      return await prisma.oTP.findUnique({
        where: { mobile },
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteByMobile(mobile) {
    try {
      return await prisma.oTP.delete({
        where: { mobile },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OTP;
