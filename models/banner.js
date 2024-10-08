const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Banner {
  static async findById(id) {
    try {
      return await prisma.banner.findUnique({
        where: { id: Number(id) },
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
        where: { id: Number(id) },
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
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting banner by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.banner.findMany();
    } catch (error) {
      console.error("Error finding all banners:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch the paginated banners
      const banners = await prisma.banner.findMany({
        skip,
        take: limit,
      });

      // Fetch the total number of banners
      const totalBanners = await prisma.banner.count();

      // Calculate total pages
      const totalPages = Math.ceil(totalBanners / limit);

      return {
        data: banners,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalBanners,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting banners with pagination:", error);
      throw error;
    }
  }
}

module.exports = Banner;
