const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class NewsView {
  // Find a NewsView by newsId and userId
  static async findUnique({ newsId, userId }) {
    try {
      return await prisma.newsView.findUnique({
        where: {
          newsId_userId: {
            newsId: newsId,
            userId: userId,
          },
        },
      });
    } catch (error) {
      console.error("Error finding NewsView:", error);
      throw error;
    }
  }

  // Create a new NewsView entry
  static async create(data) {
    try {
      return await prisma.newsView.create({
        data,
      });
    } catch (error) {
      console.error("Error creating NewsView:", error);
      throw error;
    }
  }

  // Find all NewsViews for a particular news item
  static async findAllByNewsId(newsId) {
    try {
      return await prisma.newsView.findMany({
        where: { newsId: newsId },
      });
    } catch (error) {
      console.error("Error finding NewsViews by newsId:", error);
      throw error;
    }
  }

  // Delete a NewsView by id
  static async deleteById(id) {
    try {
      return await prisma.newsView.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting NewsView by id:", error);
      throw error;
    }
  }
}

module.exports = NewsView;
