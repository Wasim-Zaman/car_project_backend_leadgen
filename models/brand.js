const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Brand {
  static async findById(id) {
    try {
      return await prisma.brand.findUnique({
        where: { id: Number(id) },
        include: { cars: true }, // Include related Car data
      });
    } catch (error) {
      console.error("Error finding brand by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.brand.create({
        data,
      });
    } catch (error) {
      console.error("Error creating brand:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.brand.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating brand by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await prisma.brand.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting brand by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.brand.findMany();
    } catch (error) {
      console.error("Error finding all brands:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch the paginated brands
      const brands = await prisma.brand.findMany({
        skip,
        take: limit,
      });

      // Fetch the total number of brands
      const totalBrands = await prisma.brand.count();

      // Calculate total pages
      const totalPages = Math.ceil(totalBrands / limit);

      return {
        data: brands,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalBrands,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting brands with pagination:", error);
      throw error;
    }
  }
}

module.exports = Brand;
