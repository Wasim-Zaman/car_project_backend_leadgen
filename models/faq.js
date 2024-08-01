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

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      // Define where condition if query is provided
      const where = query
        ? {
            OR: [
              { question: { contains: query, mode: "insensitive" } },
              { answer: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      // Fetch the paginated FAQs with or without a search query
      const FAQs = await prisma.FAQ.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of FAQs
      const totalFAQs = await prisma.fAQ.count({ where });

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
      console.error("Error getting FAQs with pagination and search:", error);
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
