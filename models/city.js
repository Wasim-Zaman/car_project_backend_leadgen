const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class City {
  static async findById(id) {
    try {
      return await prisma.city.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding city by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await prisma.city.create({
        data,
      });
    } catch (error) {
      console.error("Error creating city:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.city.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating city by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await prisma.city.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting city by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.city.findMany();
    } catch (error) {
      console.error("Error finding all cities:", error);
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
              { name: { contains: query, mode: "insensitive" } },
              // Add other searchable fields here if needed
            ],
          }
        : {};

      // Fetch the paginated cities with or without a search query
      const cities = await prisma.city.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of cities
      const totalCities = await prisma.city.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalCities / limit);

      return {
        data: cities,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCities,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting cities with pagination and search:", error);
      throw error;
    }
  }
}

module.exports = City;
