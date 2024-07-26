const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Gallery {
  static async findById(id) {
    try {
      return await prisma.gallery.findUnique({
        where: { id: Number(id) },
        include: { car: true }, // Include related Car data
      });
    } catch (error) {
      console.error("Error finding gallery by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.gallery.create({
        data,
        include: { car: true }, // Include related Car data
      });
    } catch (error) {
      console.error("Error creating gallery:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.gallery.update({
        where: { id: Number(id) },
        data,
        include: { car: true }, // Include related Car data
      });
    } catch (error) {
      console.error("Error updating gallery by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await prisma.gallery.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting gallery by id:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch the paginated galleries
      const galleries = await prisma.gallery.findMany({
        skip,
        take: limit,
        include: { car: true }, // Include related Car data
      });

      // Fetch the total number of galleries
      const totalGalleries = await prisma.gallery.count();

      // Calculate total pages
      const totalPages = Math.ceil(totalGalleries / limit);

      return {
        data: galleries,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalGalleries,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting galleries with pagination:", error);
      throw error;
    }
  }
}

module.exports = Gallery;
