const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Page {
  static async findById(id) {
    try {
      return await prisma.page.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding page by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.page.create({
        data,
      });
    } catch (error) {
      console.error("Error creating page:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.page.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating page by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await prisma.page.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting page by id:", error);
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
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      // Fetch the paginated pages with or without a search query
      const pages = await prisma.page.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of pages
      const totalPages = await prisma.page.count({ where });

      // Calculate total pages
      const totalPageCount = Math.ceil(totalPages / limit);

      return {
        data: pages,
        pagination: {
          currentPage: page,
          totalPages: totalPageCount,
          totalItems: totalPages,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting pages with pagination and search:", error);
      throw error;
    }
  }
}

module.exports = Page;
