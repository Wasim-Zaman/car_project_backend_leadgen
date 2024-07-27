const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class FAQ {
  static async findById(id) {
    try {
      return await prisma.fAQ.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding FAQ by id:", error);
      throw error;
    }
  }

  static async findAll() {
    try {
      return await prisma.fAQ.findMany();
    } catch (error) {
      console.error("Error finding all FAQs:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.fAQ.create({
        data,
      });
    } catch (error) {
      console.error("Error creating FAQ:", error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      return await prisma.fAQ.update({
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
      return await prisma.fAQ.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      throw error;
    }
  }
}

module.exports = FAQ;
