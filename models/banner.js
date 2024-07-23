const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Banner {
  static async findById(id) {
    try {
      return await prisma.banner.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("Error finding banner by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.banner.create({
        data,
      });
    } catch (error) {
      console.error("Error creating banner:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.banner.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error("Error updating banner by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await prisma.banner.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting banner by id:", error);
      throw error;
    }
  }

  static async findAll() {
    try {
      return await prisma.banner.findMany();
    } catch (error) {
      console.error("Error finding all banners:", error);
      throw error;
    }
  }
}

module.exports = Banner;
