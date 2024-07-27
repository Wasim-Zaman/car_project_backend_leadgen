const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class FAQ {
  static async findById(id) {
    try {
      return await prisma.FAQ.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding FAQ by id:", error);
      throw error;
    }
  }

  static async findAll() {
    try {
      return await prisma.FAQ.findMany();
    } catch (error) {
      console.error("Error finding all FAQs:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch the paginated cities
      const FAQs = await prisma.FAQ.findMany({
        skip,
        take: limit,
      });

      // Fetch the total number of cities
      const totalFAQs = await prisma.FAQ.count();

      // Calculate total pages
      const totalPages = Math.ceil(totalFAQs / limit);

      return {
        data: FAQs,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalFAQs,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting cities with pagination:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.FAQ.create({
        data,
      });
    } catch (error) {
      console.error("Error creating FAQ:", error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      return await prisma.FAQ.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating FAQ:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await prisma.FAQ.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      throw error;
    }
  }
}

module.exports = FAQ;
