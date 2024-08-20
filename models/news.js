const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class News {
  static async findById(id) {
    try {
      return await prisma.news.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding News by id:", error);
      throw error;
    }
  }

  static async findAll() {
    try {
      return await prisma.news.findMany();
    } catch (error) {
      console.error("Error finding all News:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      const where = query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      const newsItems = await prisma.news.findMany({
        skip,
        take: limit,
        where,
      });

      const totalNews = await prisma.news.count({ where });

      const totalPages = Math.ceil(totalNews / limit);

      return {
        data: newsItems,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalNews,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting News with pagination and search:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.news.create({
        data,
      });
    } catch (error) {
      console.error("Error creating News:", error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      return await prisma.news.update({
        where: { id: id },
        data,
      });
    } catch (error) {
      console.error("Error updating News:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await prisma.news.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting News:", error);
      throw error;
    }
  }

  static async addNewsView(newsId, userId) {
    try {
      await prisma.newsView.create({
        data: {
          userId: userId,
          newsId: newsId,
        },
      });
    } catch (error) {
      if (error.code === "P2002") {
        // Unique constraint failed, which means the user has already viewed this news item
        console.log("User has already viewed this news item.");
      } else {
        throw error;
      }
    }
  }
}

module.exports = News;
