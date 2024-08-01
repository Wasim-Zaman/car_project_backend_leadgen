const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class CarType {
  static async findById(id) {
    try {
      return await prisma.CarType.findUnique({
        where: { id: Number(id) },
        include: { brand: true }, // Include related Brand data
      });
    } catch (error) {
      console.error("Error finding car by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.CarType.create({
        data,
      });
    } catch (error) {
      console.error("Error creating car:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.CarType.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating car by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await prisma.CarType.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting car by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.car.findMany({});
    } catch (error) {
      console.error("Error finding all cars:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      // Define where condition if query is provided
      const where = query
        ? {
            OR: [{ title: { contains: query, mode: "insensitive" } }],
          }
        : {};

      // Fetch the paginated car types with or without a search query
      const carTypes = await prisma.carType.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of car types
      const totalCarTypes = await prisma.carType.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalCarTypes / limit);

      return {
        data: carTypes,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCarTypes,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting car types with pagination and search:",
        error
      );
      throw error;
    }
  }
}

module.exports = CarType;
