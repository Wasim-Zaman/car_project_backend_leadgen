const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class OTP {
  static async createOrUpdateOTP(data) {
    try {
      const existingOTP = await prisma.oTP.findUnique({
        where: { mobile: data.mobile },
      });

      if (existingOTP) {
        return await prisma.oTP.update({
          where: { mobile: data.mobile },
          data: {
            otp: data.otp,
            expiresAt: data.expiresAt,
          },
        });
      } else {
        return await prisma.oTP.create({
          data,
        });
      }
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
