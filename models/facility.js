const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Facility {
  static async create(data) {
    try {
      return await prisma.facility.create({
        data,
      });
    } catch (error) {
      console.error("Error creating Facility:", error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      return await prisma.facility.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding Facility by ID:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.facility.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating Facility by ID:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await prisma.facility.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting Facility by ID:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.facility.findMany();
    } catch (error) {
      console.error("Error finding all facilities:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      // Define where condition if query is provided
      const where = query
        ? {
            OR: [{ name: { contains: query, mode: "insensitive" } }],
          }
        : {};

      // Fetch the paginated facilities with the specified limit and offset
      const facilities = await prisma.facility.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of facilities that match the query
      const totalFacilities = await prisma.facility.count({ where });

      // Calculate total pages based on the number of facilities and the page limit
      const totalPages = Math.ceil(totalFacilities / limit);

      return {
        data: facilities,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalFacilities,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting facilities with pagination and search:",
        error
      );
      throw error;
    }
  }
}

module.exports = Facility;
